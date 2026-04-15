import { useEffect, useRef } from 'react';
import mapboxgl, { type DataDrivenPropertyValueSpecification } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sources from './mapSources';
import Legend from './Legend';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import type {
  HealthDataProperties,
  CompareMode,
  HealthSuffix,
  MouseEvent,
  TitleVIProperties,
  IndicatorKeys,
} from '@types';
import { CustomNavigationControl } from './CustomNavigationControl';
import {
  countyBounds,
  countyFipsMap,
  indicatorPropertyLabelMap,
  INITIAL_BOUNDS,
} from '@consts';
import { baseLayers } from './mapLayers';
import { buildFillColor, buildFillOpacity } from './utils';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Search to location',
  bbox: [
    -76.09405517578125, 39.49211914385648, -74.32525634765625,
    40.614734298694216,
  ],
  marker: false,
});

interface Props {
  selectedProperties: HealthDataProperties | TitleVIProperties;
  selectedIndicator: IndicatorKeys;
  compareMode: CompareMode;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<IndicatorKeys>>;
  setSelectedTitleViProperties: React.Dispatch<
    React.SetStateAction<TitleVIProperties>
  >;
  setSelectedHealthProperties: React.Dispatch<
    React.SetStateAction<HealthDataProperties>
  >;
}

export default function MapboxMap({
  selectedIndicator,
  compareMode,
  selectedProperties,
  setSelectedHealthProperties,
  setSelectedTitleViProperties,
}: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const selectIdRef = useRef<string | null>(null);

  const compareModeRef = useRef(compareMode);
  const fipsRef = useRef('');

  const fips = String(selectedProperties.geoid).substring(0, 5);
  const countyName = countyFipsMap[fips as keyof typeof countyFipsMap];

  useEffect(() => {
    compareModeRef.current = compareMode;
  }, [compareMode]);
  useEffect(() => {
    fipsRef.current = fips;
  }, [fips]);

  const setFeatureState = (id: string, state: Record<string, boolean>) => {
    mapRef.current?.setFeatureState(
      {
        source: 'healthIndicators',
        sourceLayer: 'regional_health_indicators',
        id,
      },
      state
    );
  };

  const clearSelection = () => {
    if (!mapRef.current || !selectIdRef.current) return;
    mapRef.current.removeFeatureState({
      source: 'healthIndicators',
      sourceLayer: 'regional_health_indicators',
    });
  };

  const fitInitial = () => mapRef.current?.fitBounds(INITIAL_BOUNDS);

  const fitCounty = (fipsCode = fipsRef.current) => {
    const bounds = countyBounds[fipsCode];
    if (bounds) mapRef.current?.fitBounds(bounds, { padding: 50 });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!e.features || !mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = 'pointer';
    if (hoverIdRef.current)
      setFeatureState(hoverIdRef.current, { hover: false });
    const id = String(e.features[0].id);
    hoverIdRef.current = id;
    setFeatureState(id, { hover: true });
  };

  const handleMouseLeave = () => {
    if (!mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = '';
    if (hoverIdRef.current)
      setFeatureState(hoverIdRef.current, { hover: false });
    hoverIdRef.current = null;
  };

  const handleClick = (e: MouseEvent) => {
    if (!mapRef.current || !e.features) return;
    clearSelection();

    // console.log(e.features[0]);
    const id = String(e.features[0].id);
    selectIdRef.current = id;

    if (e.features.length == 1 && e.features[0].source == 'healthIndicators') {
      setSelectedTitleViProperties({} as TitleVIProperties);
    }

    e.features.forEach((feature) => {
      if (feature.source == 'healthIndicators') {
        setSelectedHealthProperties(feature.properties as HealthDataProperties);
      } else {
        setSelectedTitleViProperties(feature.properties as TitleVIProperties);
      }
    });

    setFeatureState(id, { selected: true });

    if (compareModeRef.current === 'County') {
      fitCounty(String(id).substring(0, 5));
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ckirby98/cmndm12qu000m01qlb48t3970',
      bounds: INITIAL_BOUNDS,
      trackResize: true,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.resize();
      map.addControl(geocoder, 'top-right');
      map.addControl(new CustomNavigationControl({}, INITIAL_BOUNDS));
      Object.entries(sources).forEach(([id, src]) => map.addSource(id, src));
      Object.values(baseLayers).forEach((layer) => map.addLayer(layer));
    });

    map.on('mousemove', ['health-indicators'], handleMouseMove);
    map.on('mouseleave', ['health-indicators'], handleMouseLeave);
    map.on('click', ['health-indicators', 'titlevi-indicators'], handleClick);

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;

    const isTitleVI = selectedIndicator.length <= 2;
    const isCountyMode = compareMode === 'County';

    const healthSuffix: HealthSuffix = isCountyMode ? '_pct_cty' : '_pct_reg';
    const healthOpacity: DataDrivenPropertyValueSpecification<number> =
      !isTitleVI && isCountyMode
        ? [
            'case',
            ['==', ['slice', ['get', 'geoid'], 0, 5], fips],
            buildFillOpacity(selectedIndicator, healthSuffix),
            0,
          ]
        : !isTitleVI
          ? buildFillOpacity(selectedIndicator, healthSuffix)
          : 0;

    map.setPaintProperty(
      'health-indicators',
      'fill-color',
      isTitleVI ? '#fff' : buildFillColor(selectedIndicator, healthSuffix)
    );
    map.setPaintProperty('health-indicators', 'fill-opacity', healthOpacity);

    // TitleVI layer — never shown in County mode
    map.setPaintProperty(
      'titlevi-indicators',
      'fill-color',
      isTitleVI && !isCountyMode
        ? buildFillColor(selectedIndicator, '_pctile')
        : '#fff'
    );
    map.setPaintProperty(
      'titlevi-indicators',
      'fill-opacity',
      isTitleVI && !isCountyMode
        ? buildFillOpacity(selectedIndicator, '_pctile')
        : 0
    );
  }, [selectedIndicator, compareMode, fips]);

  useEffect(() => {
    if (compareMode === 'County') {
      fitCounty();
    } else {
      fitInitial();
    }
  }, [compareMode]);

  const mapContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      <Legend
        indicatorLabel={indicatorPropertyLabelMap[selectedIndicator]}
        compareMode={compareMode}
        county={countyName}
      />
    </div>
  );
}

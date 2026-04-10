import { useEffect, useRef } from 'react';
import mapboxgl, { type DataDrivenPropertyValueSpecification } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sources from './mapSources';
import Legend from './Legend';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import type {
  AllProperties,
  CompareMode,
  HealthPropertyKeys,
  HealthSuffix,
  MouseEvent,
} from '@types';
import { CustomNavigationControl } from './CustomNavigationControl';
import {
  countyBounds,
  countyFipsMap,
  indicatorPropertyLabelMap,
  INITIAL_BOUNDS,
} from '@consts';
import { baseLayers } from './mapLayers';
import { buildFillColor } from './utils';

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
  setSelectedProperties: React.Dispatch<React.SetStateAction<AllProperties>>;
  selectedProperties: AllProperties;
  selectedIndicator: HealthPropertyKeys;
  compareMode: CompareMode;
}
export default function Map(props: Props) {
  const {
    setSelectedProperties,
    selectedIndicator,
    compareMode,
    selectedProperties,
  } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const selectIdRef = useRef<string | null>(null);
  const compareModeRef = useRef<CompareMode>(compareMode);

  const fips = String(selectedProperties.geoid).substring(0, 5);
  const countyName = countyFipsMap[fips as keyof typeof countyFipsMap];

  function setHoverId(val: string | null) {
    hoverIdRef.current = val;
  }

  function setSelectId(val: string | null) {
    selectIdRef.current = val;
  }

  function removeSelection() {
    if (!mapRef.current || !selectIdRef.current) return;
    mapRef.current.removeFeatureState({
      source: 'healthIndicators',
      sourceLayer: 'regional_health_indicators',
    });
  }

  const healthFeatureState = (id: string, state: Record<string, boolean>) => {
    mapRef.current?.setFeatureState(
      {
        source: 'healthIndicators',
        sourceLayer: 'regional_health_indicators',
        id,
      },
      state
    );
  };

  const centerMap = () => {
    const map = mapRef.current;
    if (!map) return;
    map.fitBounds(INITIAL_BOUNDS);
  };

  const centerOnCounty = () => {
    const map = mapRef.current;
    if (!map || !selectIdRef.current) return;

    const fips = selectIdRef.current.substring(0, 5);
    const bounds = countyBounds[fips];
    if (bounds) map.fitBounds(bounds, { padding: 50 });
  };

  const hoverGeoFill = (e: MouseEvent) => {
    if (!e.features || !mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = 'pointer';
    if (hoverIdRef.current)
      healthFeatureState(hoverIdRef.current, { hover: false });
    const id = e.features[0].id + '';
    setHoverId(id);
    healthFeatureState(id, { hover: true });
  };

  const leaveGeoFill = () => {
    if (!mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = '';
    if (hoverIdRef.current)
      healthFeatureState(hoverIdRef.current, { hover: false });
    setHoverId(null);
  };

  const handleClick = (e: MouseEvent) => {
    if (!mapRef.current || !e.features) return;
    if (selectIdRef.current) removeSelection();

    const id = e.features[0].id + '';
    setSelectId(id);
    setSelectedProperties(e.features[0].properties as AllProperties);
    healthFeatureState(id, { selected: true });

    if (compareModeRef.current == 'County') {
      centerOnCounty();
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const initialZoom = 12;

    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ckirby98/cmndm12qu000m01qlb48t3970',

      zoom: initialZoom,
      trackResize: true,
      bounds: INITIAL_BOUNDS,
    }));

    map.on('load', () => {
      const layers = baseLayers;

      map.resize();

      map.addControl(geocoder, 'top-right');
      map.addControl(new CustomNavigationControl({}, INITIAL_BOUNDS));

      for (const source in sources) map.addSource(source, sources[source]);
      for (const layer in layers) {
        map.addLayer(layers[layer]);
      }
    });
    mapRef.current = map;

    map.on('mousemove', ['health-indicators'], hoverGeoFill);
    map.on('mouseleave', ['health-indicators'], leaveGeoFill);
    map.on('click', ['health-indicators'], handleClick);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    mapRef.current.setPaintProperty(
      'health-indicators',
      'fill-color',
      buildFillColor(selectedIndicator, '_pct_reg')
    );
  }, [selectedIndicator]);

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const suffix: HealthSuffix =
      compareMode == 'Region' ? '_pct_reg' : '_pct_cty';

    const opacityProperty: DataDrivenPropertyValueSpecification<number> =
      compareMode === 'County'
        ? ['case', ['==', ['slice', ['get', 'geoid'], 0, 5], fips], 0.75, 0]
        : 0.75;

    mapRef.current.setPaintProperty(
      'health-indicators',
      'fill-color',
      buildFillColor(selectedIndicator, suffix)
    );

    mapRef.current.setPaintProperty(
      'health-indicators',
      'fill-opacity',
      opacityProperty
    );
  }, [compareMode, fips]);

  useEffect(() => {
    compareModeRef.current = compareMode;
    if (compareMode == 'County') {
      centerOnCounty();
    } else {
      centerMap();
    }
  }, [compareMode]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full"></div>

      <Legend
        indicatorLabel={indicatorPropertyLabelMap[selectedIndicator]}
        compareMode={compareMode}
        county={countyName}
      />
    </div>
  );
}

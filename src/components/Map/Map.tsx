import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sources from './mapSources';
import Legend from './Legend';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import type { AllProperties, CompareMode, HealthPropertyKeys, MouseEvent } from '@types';
import { CustomNavigationControl } from './CustomNavigationControl';
import { indicatorPropertyLabelMap, INITIAL_BOUNDS } from '@consts';
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
  selectedIndicator: HealthPropertyKeys;
  compareMode: CompareMode
}
export default function Map(props: Props) {
  const { setSelectedProperties, selectedIndicator, compareMode } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const selectIdRef = useRef<string | null>(null);


  function setHoverId(val: string | null) {
    hoverIdRef.current = val;
  }

  function setSelectId(val: string | null) {
    selectIdRef.current = val;

  }

  function removeSelection() {
    if (!mapRef.current || !selectIdRef.current) return;
    mapRef.current.removeFeatureState({ source: 'healthIndicators', sourceLayer: 'regional_health_indicators' });
  }

  const healthFeatureState = (id: string, state: Record<string, boolean>) => {
    mapRef.current?.setFeatureState(
      { source: 'healthIndicators', sourceLayer: 'regional_health_indicators', id },
      state
    );
  };

  const hoverGeoFill = (e: MouseEvent) => {
    if (!e.features || !mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = 'pointer';
    if (hoverIdRef.current) healthFeatureState(hoverIdRef.current, { hover: false });
    const id = e.features[0].id + '';
    setHoverId(id);
    healthFeatureState(id, { hover: true });
  };

  const leaveGeoFill = () => {
    if (!mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = '';
    if (hoverIdRef.current) healthFeatureState(hoverIdRef.current, { hover: false });
    setHoverId(null);
  };

  const handleClick = (e: MouseEvent) => {
    if (!mapRef.current || !e.features) return;
    if (selectIdRef.current) removeSelection();
    const id = e.features[0].id + '';
    setSelectId(id);
    setSelectedProperties(e.features[0].properties as AllProperties);
    healthFeatureState(id, { selected: true });
  };

  useEffect(() => {
    if (!mapContainer.current) return;


    const initialZoom = 12;
    const initialBounds = new mapboxgl.LngLatBounds(
      [-76.09405517578125, 39.49211914385648],
      [-74.32525634765625, 40.614734298694216]
    );

    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ckirby98/cmndm12qu000m01qlb48t3970',
      center: [
        -(initialBounds.getWest() + initialBounds.getEast()) / 2,
        -(initialBounds.getNorth() + initialBounds.getSouth()) / 2,
      ],
      zoom: initialZoom,
      trackResize: true,
      bounds: initialBounds,
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

    map.on(
      'mousemove',
      ['health-indicators'],
      hoverGeoFill
    );
    map.on(
      'mouseleave',
      ['health-indicators'],
      leaveGeoFill
    );
    map.on(
      'click',
      ['health-indicators'],
      handleClick
    );

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    mapRef.current.setPaintProperty('health-indicators', 'fill-color', buildFillColor(selectedIndicator, '_pct_reg'));
  }, [selectedIndicator]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full"></div>


      <Legend indicatorLabel={indicatorPropertyLabelMap[selectedIndicator]} compareMode={compareMode} />
    </div>
  );
}

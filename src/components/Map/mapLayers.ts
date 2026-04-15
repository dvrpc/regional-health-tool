import type { LayerMap } from '@types';
import { buildFillColor, buildFillOpacity } from './utils';
// import { themeColor } from '@utils';

const baseLayers: LayerMap = {
  countyOutline: {
    id: 'county-outline-base',
    type: 'line',
    source: 'countyboundaries',
    'source-layer': 'countyboundaries',
    paint: {
      'line-width': 2.5,
      'line-color': '#505a5e',
    },
    filter: ['==', 'dvrpc_reg', 'Yes'],
  },
  muniOutline: {
    id: 'muni-outline-base',
    type: 'line',
    source: 'municipalboundaries',
    'source-layer': 'municipalboundaries',
    paint: {
      'line-width': 0.5,
      'line-color': '#505a5e',
    },
    filter: ['==', 'dvrpc_reg', 'Yes'],
    minzoom: 9,
  },
  healthIndicators: {
    id: 'health-indicators',
    type: 'fill',
    source: 'healthIndicators',
    'source-layer': 'regional_health_indicators',
    paint: {
      'fill-color': buildFillColor('access2', '_pct_reg'),
      'fill-opacity': buildFillOpacity('access2', '_pct_reg'),
    },
  },
  titleViIndicators: {
    id: 'titlevi-indicators',
    type: 'fill',
    source: 'titleViIndicators',
    'source-layer': 'title_vi_indicators_latest',
    paint: {
      'fill-color': '#fff',
      'fill-opacity': 0,
    },
  },
  tractOutline: {
    id: 'tract-outline',
    type: 'line',
    source: 'healthIndicators',
    'source-layer': 'regional_health_indicators',
    paint: {
      'line-color': '#ff0000',
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        3,
        ['boolean', ['feature-state', 'selected'], false],
        3,
        0,
      ],
    },
  },
};

export { baseLayers };

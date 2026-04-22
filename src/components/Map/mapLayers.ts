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
  titleViIndicators: {
    id: 'title_vi_indicators_latest',
    type: 'fill',
    source: 'title_vi_indicators_latest',
    'source-layer': 'title_vi_indicators_latest',
    paint: {
      'fill-color': '#fff',
      'fill-opacity': 0,
    },
  },
  healthIndicators: {
    id: 'regional_health_indicators',
    type: 'fill',
    source: 'regional_health_indicators',
    'source-layer': 'regional_health_indicators',
    paint: {
      'fill-color': buildFillColor('access2', '_pct_reg'),
      'fill-opacity': buildFillOpacity('access2', '_pct_reg'),
    },
  },

  circuitTrails: {
    id: 'circuittrails',
    type: 'line',
    source: 'circuittrails',
    'source-layer': 'circuittrails',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        [
          'match',
          ['get', 'circuit'],
          'Existing',
          '#8EC73D',
          'In Progress',
          '#FDAE61',
          'Pipeline',
          '#B144A5',
          'Planned',
          '#2E9BA8',
          '#0078AE',
        ],
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },

  passengerRail: {
    id: 'passengerrail',
    type: 'line',
    source: 'passengerrail',
    'source-layer': 'passengerrail',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#C61EF7',
      ],
      // 'line-color':
      //   [
      //     "match",
      //     [
      //       "get",
      //       "type"
      //     ],
      //     "Subway",
      //     ["match", ["get", "line_name"], "Broad Street Line", "#FC671A", '#4D738A'],
      //     "Regional Rail",
      //     "#4D738A",
      //     "PATCO",
      //     "#C41F3E",
      //     "NJ Transit",
      //     "#FDC524",
      //     'Rapid Transit',
      //     '#613393',
      //     'Surface Trolley',
      //     '#E5417A',
      //     "AMTRAK",
      //     '#003C5A',
      //     '#000000'
      //   ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
      'line-blur': 0,
    },
    layout: {
      visibility: 'none',
    },
  },
  passengerRailStations: {
    id: 'passengerrailstations',
    type: 'circle',
    source: 'passengerrailstations',
    'source-layer': 'passengerrailstations',
    paint: {
      'circle-color': '#FF73DF',
      'circle-stroke-color': '#C557E6',
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        2,
        ['boolean', ['feature-state', 'selected'], false],
        2,
        0.5,
      ],
      'circle-radius': [
        'step',
        ['zoom'],
        [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          5,
          ['boolean', ['feature-state', 'selected'], false],
          5,
          3,
        ],
        10,
        [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          7,
          ['boolean', ['feature-state', 'selected'], false],
          7,
          4,
        ],
        13,
        [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          9,
          ['boolean', ['feature-state', 'selected'], false],
          9,
          5,
        ],
      ],
    },
    layout: {
      visibility: 'none',
    },
  },
  septaBusRoutes: {
    id: 'septa_transitroutes',
    type: 'line',
    source: 'septa_transitroutes',
    'source-layer': 'septa_transitroutes',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#FC9530',
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },
  njtBusRoutes: {
    id: 'njtransit_transitroutes',
    type: 'line',
    source: 'njtransit_transitroutes',
    'source-layer': 'njtransit_transitroutes',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#ECEE81',
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },
  paRHIN: {
    id: 'crash_pa_rhin',
    type: 'line',
    source: 'crash_pa_rhin',
    'source-layer': 'crash_pa_rhin',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#E94F3D',
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },
  njRHIN: {
    id: 'crash_nj_rhin',
    type: 'line',
    source: 'crash_nj_rhin',
    'source-layer': 'crash_nj_rhin',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#E94F3D',
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },
  phillyRHIN: {
    id: 'philly_highinjurynetwork',
    type: 'line',
    source: 'philly_highinjurynetwork',
    'source-layer': 'philly_highinjurynetwork',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff0000',
        ['boolean', ['feature-state', 'selected'], false],
        '#ff0000',
        '#E94F3D',
      ],
      'line-width': ['step', ['zoom'], 2, 10, 3, 13, 4],
    },
    layout: {
      visibility: 'none',
    },
  },
  tractOutline: {
    id: 'tract-outline',
    type: 'line',
    source: 'regional_health_indicators',
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

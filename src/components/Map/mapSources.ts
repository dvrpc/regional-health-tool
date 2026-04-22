import type { SourceMap } from '@types';

const sources: SourceMap = {
  countyboundaries: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/boundaries/countyboundaries',
  },
  municipalboundaries: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/boundaries/municipalboundaries',
  },
  regional_health_indicators: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/demographics/regional_health_indicators',
    promoteId: 'geoid',
  },
  title_vi_indicators_latest: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/demographics/title_vi_indicators_latest',
    promoteId: 'geoid',
  },
  circuittrails: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/circuittrails',
  },
  passengerrail: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/passengerrail',
  },
  passengerrailstations: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/passengerrailstations',
  },
  septa_transitroutes: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/septa_transitroutes',
  },
  njtransit_transitroutes: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/njtransit_transitroutes',
  },
  crash_pa_rhin: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/crash_pa_rhin',
  },
  crash_nj_rhin: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/crash_nj_rhin',
  },
  philly_highinjurynetwork: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/transportation/philly_highinjurynetwork',
  },
};

export default sources;

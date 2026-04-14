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
  healthIndicators: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/demographics/regional_health_indicators',
    promoteId: 'geoid',
  },
  titleViIndicators: {
    type: 'vector',
    url: 'https://tiles.dvrpc.org/data/demographics/title_vi_indicators_latest',
    promoteId: 'geoid',
  },
};

export default sources;

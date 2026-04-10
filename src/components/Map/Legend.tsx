import type { CompareMode } from '@types';

const legendIconSize = 22;

interface Props {
  indicatorLabel: string;
  compareMode: CompareMode;
  county: string;
}
export default function Legend(props: Props) {
  const { indicatorLabel, compareMode, county } = props;
  return (
    <div className="mt-2 absolute right-2 bottom-6 p-4 z-10 bg-white shadow rounded-md text-[1rem] flex flex-col gap-2">
      <div>
        <h2 className="font-bold text-lg p-0">{indicatorLabel}</h2>
        <span>{`Compared to ${compareMode == 'Region' ? 'DVRPC Region' : `${county} County`}`}</span>
      </div>

      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <rect
            x={0}
            y={0}
            width={legendIconSize}
            height={legendIconSize}
            fill="var(--color-well-below-average)"
          />
        </svg>
        <span>Well Below Average</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <rect
            x={0}
            y={0}
            width={legendIconSize}
            height={legendIconSize}
            fill="var(--color-below-average)"
          />
        </svg>
        <span>Below Average</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <rect
            x={0}
            y={0}
            width={legendIconSize}
            height={legendIconSize}
            fill="var(--color-average)"
          />
        </svg>
        <span>Average</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <rect
            x={0}
            y={0}
            width={legendIconSize}
            height={legendIconSize}
            fill="var(--color-above-average)"
          />
        </svg>
        <span>Above Average</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <rect
            x={0}
            y={0}
            width={legendIconSize}
            height={legendIconSize}
            fill="var(--color-well-above-average)"
          />
        </svg>
        <span>Well Above Average</span>
      </div>
    </div>
  );
}

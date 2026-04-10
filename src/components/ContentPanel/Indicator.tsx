import { themeColor } from '@utils';
import type { HealthPropertyKeys } from '@types';
import { indicatorPropertyLabelMap } from '@consts';

interface Props {
  indicator: HealthPropertyKeys;
  value: number;
}

const height = 45;
const width = 300;
const barY = 20;
const barH = 20;
const minTextX = 20;
const maxTextX = width - minTextX;

export default function Indicator(props: Props) {
  const { indicator, value } = props;
  const percentile = Math.min(Math.max(value, 0), 100);
  const palette = [
    themeColor('--color-well-below-average'),
    themeColor('--color-below-average'),
    themeColor('--color-average'),
    themeColor('--color-above-average'),
    themeColor('--color-well-above-average'),
  ];

  const lineX = percentile * width;
  let textX = lineX;
  if (lineX < minTextX) textX = minTextX;
  if (lineX > maxTextX) textX = maxTextX;

  const normalized = percentile * 100;
  return (
    <div className="pl-2 gap-2 flex items-center">
      <svg
        width={width}
        height={height}
        aria-label={`Percentile ${percentile}%`}
      >
        <style>
          {`
                    .indicator-marker {
                        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }`}
        </style>
        {palette.map((color, index) => (
          <rect
            key={index}
            x={index * (width / 5)}
            y={barY}
            width={width / 5}
            height={barH}
            stroke="#b3b3b3"
            strokeWidth={0.5}
            fill={color}
          />
        ))}

        <g
          className="indicator-marker"
          style={{ transform: `translateX(${lineX}px)` }}
        >
          <line
            x1={0}
            y1={15}
            x2={0}
            y2={height}
            stroke="#3a3a3a"
            strokeWidth={2}
          />
          <text
            x={textX - lineX} // offset back so text clamps correctly
            y={12}
            textAnchor="middle"
            fontSize="12"
            fill="#3a3a3a"
          >
            {`${normalized.toFixed(2)}%`}
          </text>
        </g>
      </svg>
      <span className="text-lg mt-4">
        {indicatorPropertyLabelMap[indicator]}
      </span>
    </div>
  );
}

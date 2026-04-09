import { themeColor } from "@utils";
import type { HealthPropertyKeys } from "@types";
import { indicatorPropertyLabelMap } from "@consts";

interface Props {
    indicator: HealthPropertyKeys;
    value: number;
}

const height = 45;
const width = 300;
const barY = 20, barH = 20;
const minTextX = 20;
const maxTextX = width - minTextX


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
    let textX = lineX
    if (lineX < minTextX) textX = minTextX
    if (lineX > maxTextX) textX = maxTextX

    const normalized = percentile * 100
    return (
        <div className="pl-2 gap-2 flex items-center">
            <svg
                width={width}
                height={height}
                aria-label={`Percentile ${percentile}%`}
            >
                {palette.map((color, index) => (
                    <rect
                        key={index}
                        x={index * (width / 5)}
                        y={barY}
                        width={width / 5}
                        height={barH}
                        stroke="#b3b3b3"
                        strokeWidth={.5}
                        fill={color}
                    />
                ))}

                {/* Use a nested <g> with a correcting transform to undo the stretch for text/line */}
                <line
                    x1={lineX} y1={15}
                    x2={lineX} y2={height}
                    stroke="#3a3a3a"
                    strokeWidth={2}
                />
                <text
                    x={textX}
                    y={12}
                    textAnchor="middle"
                    fontSize="12"        // readable in a 100-wide viewBox
                    fill="#3a3a3a"
                >
                    {`${normalized.toFixed(2)}%`}
                </text>
            </svg>
            <span className="text-lg mt-4">{indicatorPropertyLabelMap[indicator]}</span>

        </div>
    );
}
import { dataTextMap, descriptionMap } from '@consts';
import Indicator from './Indicator';
import type { CompareMode, HealthPropertyKeys } from '@types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  indicator: HealthPropertyKeys;
  regionPercentile: number;
  countyPercentile: number;
  compareMode: CompareMode;
  value: number;
  tractId: string;
  county: string;
  onSelect: (indicator: HealthPropertyKeys) => void;
  isSelected: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </span>
  );
}

export default function IndicatorCard(props: Props) {
  const {
    indicator,
    regionPercentile,
    countyPercentile,
    value,
    tractId,
    county,
    compareMode,
    onSelect,
    isSelected,
    collapsed,
    setCollapsed,
  } = props;

  const descriptionParagraphs = descriptionMap[indicator];
  const valuePctText = (value * 100).toFixed(2) + '%';
  const regionPctText = (regionPercentile * 100).toFixed(2);
  const countyPctText = (countyPercentile * 100).toFixed(2);
  const valueParagraph =
    dataTextMap[indicator]?.[0]
      .replace('%s', valuePctText)
      .replace('%s', 'Census Tract: ' + tractId) || '';
  const regionPctParagraph =
    dataTextMap[indicator]?.[1]
      .replace('%s', regionPctText)
      .replace('%s', 'Census Tract: ' + tractId)
      .replace('%s', regionPctText) || '';
  const countyPctParagraph = `Census Tract: ${tractId} falls within the **${countyPctText} percentile of ${county} County**.`;

  const handleClick = () => {
    setCollapsed(!collapsed);
    onSelect(indicator);
  };
  return (
    <div
      className={`p-2 shadow-md  border-t border-t-dvrpc-gray-7 ${isSelected && 'border-l-4 border-l-dvrpc-blue-3'}  rounded hover:bg-gray-100 hover:cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Indicator
            indicator={indicator}
            value={
              compareMode == 'Region' ? regionPercentile : countyPercentile
            }
          />
        </div>
        {collapsed ? <ChevronDown /> : <ChevronUp />}
      </div>
      {!collapsed && (
        <div className="flex flex-col gap-2 mt-2 p-2">
          <p>
            <BoldText text={valueParagraph} />
          </p>
          <p>
            <BoldText text={regionPctParagraph} />
          </p>
          <p>
            <BoldText text={countyPctParagraph} />
          </p>
          <p className="font-bold mt-4">Why does it matter for planners?</p>
          {descriptionParagraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}

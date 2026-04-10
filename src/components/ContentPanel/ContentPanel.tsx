import { activeKeys, countyFipsMap, indicatorPropertyLabelMap } from '@consts';
import type { AllProperties, CompareMode, HealthPropertyKeys } from '@types';
import IndicatorCard from './IndicatorCard';
import { useState } from 'react';
import { formatCensusTractId, getIndicatorProps } from '@utils';

interface Props {
  selectedProperties: AllProperties;
  selectedIndicator: HealthPropertyKeys;
  compareMode: CompareMode;
  setCompareMode: (compareMode: CompareMode) => void;
  setSelectedIndicator: React.Dispatch<
    React.SetStateAction<HealthPropertyKeys>
  >;
}

const compareOptions: CompareMode[] = ['Region', 'County'];

export default function ContentPanel(props: Props) {
  const {
    selectedProperties,
    selectedIndicator,
    compareMode,
    setCompareMode,
    setSelectedIndicator,
  } = props;

  const [collapsedIndicators, setCollapsedIndicators] = useState<
    Partial<Record<HealthPropertyKeys, boolean>>
  >(() => {
    const initial: Partial<Record<HealthPropertyKeys, boolean>> = {};
    Object.keys(indicatorPropertyLabelMap).forEach((key) => {
      initial[key as HealthPropertyKeys] = true;
    });
    return initial;
  });

  const handleSelect = (indicator: HealthPropertyKeys) => {
    setSelectedIndicator(indicator);
    setCollapsedIndicators((prev) => {
      const newCollapsed = { ...prev };
      Object.keys(indicatorPropertyLabelMap).forEach((key) => {
        if (key !== indicator) {
          newCollapsed[key as HealthPropertyKeys] = true;
        }
      });
      return newCollapsed;
    });
  };

  const geoid = String(selectedProperties.geoid);
  const fips = geoid.slice(0, 5);
  const countyName = countyFipsMap[fips as keyof typeof countyFipsMap];
  const tractId = formatCensusTractId(geoid.slice(5));

  return (
    <div>
      <div className="p-4 border-b border-dvrpc-gray-7">
        <h2 className="text-2xl font-bold ">Census Tract: {tractId}</h2>
        <span className="text-lg">{countyName} County</span>
      </div>
      <div className="p-4 border-b border-dvrpc-gray-7">
        <span className="text-sm text-gray-500 block mb-2">Compare To</span>
        <div className="flex gap-2">
          {compareOptions.map((option) => (
            <button
              key={option}
              onClick={() => setCompareMode(option)}
              className={`
          px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
          ${
            compareMode === option
              ? 'bg-dvrpc-blue-3 text-white border-dvrpc-blue-3'
              : 'bg-white  border-dvrpc-gray-6 hover:border-dvrpc-blue-3 hover:text-dvrpc-blue-3'
          }
        `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-100px)]">
        {activeKeys.map((key) => {
          const healthKey = key as HealthPropertyKeys;
          const { regionPercentile, countyPercentile, value } =
            getIndicatorProps(selectedProperties, healthKey);

          return (
            <IndicatorCard
              key={healthKey}
              indicator={healthKey}
              regionPercentile={regionPercentile}
              countyPercentile={countyPercentile}
              compareMode={compareMode}
              value={value}
              tractId={tractId}
              county={countyName}
              onSelect={handleSelect}
              isSelected={selectedIndicator === healthKey}
              collapsed={collapsedIndicators[healthKey] ?? true}
              setCollapsed={(collapsed) =>
                setCollapsedIndicators((prev) => ({
                  ...prev,
                  [healthKey]: collapsed,
                }))
              }
            />
          );
        })}
      </div>
    </div>
  );
}

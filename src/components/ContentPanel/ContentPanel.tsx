import {
  activeHealthPropertyKeys,
  countyFipsMap,
  indicatorPropertyLabelMap,
  titleViKeys,
} from '@consts';
import type {
  HealthDataProperties,
  CompareMode,
  HealthPropertyKeys,
  IndicatorKeys,
  TitleVIProperties,
} from '@types';
import IndicatorCard from './IndicatorCard';
import { useMemo, useState } from 'react';
import {
  formatCensusTractId,
  getIndicatorProps,
  getTitleViIndicatorProps,
} from '@utils';
import TitleViIndicatorCard from './TitleVIIndicatorCard';

interface Props {
  selectedHealthProperties: HealthDataProperties;
  selectedTitleViProperties: TitleVIProperties;
  selectedIndicator: IndicatorKeys;
  compareMode: CompareMode;
  setCompareMode: (compareMode: CompareMode) => void;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<IndicatorKeys>>;
}

const compareOptions: CompareMode[] = ['Region', 'County'];

export default function ContentPanel(props: Props) {
  const {
    selectedHealthProperties,
    selectedTitleViProperties,
    selectedIndicator,
    compareMode,
    setCompareMode,
    setSelectedIndicator,
  } = props;

  const [collapsedIndicators, setCollapsedIndicators] = useState<
    Partial<Record<IndicatorKeys, boolean>>
  >(() => {
    const initial: Partial<Record<IndicatorKeys, boolean>> = {};
    Object.keys(indicatorPropertyLabelMap).forEach((key) => {
      initial[key as IndicatorKeys] = true;
    });
    return initial;
  });

  const handleSelect = (indicator: IndicatorKeys) => {
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

  const geoid = String(selectedHealthProperties.geoid);
  const fips = geoid.slice(0, 5);
  const countyName = countyFipsMap[fips as keyof typeof countyFipsMap];
  const tractId = formatCensusTractId(geoid.slice(5));

  const aboveAverageCount = useMemo(() => {
    let count = 0;

    const suffix = compareMode == 'Region' ? '_pct_reg' : '_pct_cty';
    activeHealthPropertyKeys.forEach((k) => {
      if (selectedHealthProperties[`${k}${suffix}`] > 0.6) count++;
    });

    if (compareMode == 'Region') {
      titleViKeys.forEach((k) => {
        if (selectedTitleViProperties[`${k}_pctile`] > 0.6) count++;
      });
    }
    return count;
  }, [selectedHealthProperties, selectedTitleViProperties, compareMode]);

  return (
    <div>
      <div className="p-4 border-b border-dvrpc-gray-7">
        <h2 className="text-2xl font-bold ">Census Tract: {tractId}</h2>
        <span className="text-lg">{countyName} County</span>
        <br />
        <p className="mt-2">
          This tract has <b>{aboveAverageCount}</b> above or well above average
          health indicators
        </p>
      </div>
      <div className="p-4 border-b border-dvrpc-gray-7">
        <span className="text-sm text-gray-500 block mb-2">Compare To</span>
        <div className="flex gap-2">
          {compareOptions.map((option) => {
            if (selectedIndicator.length <= 2 && option == 'County') return;
            return (
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
            );
          })}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-200px)]">
        {activeHealthPropertyKeys.map((key) => {
          const { regionPercentile, countyPercentile, value } =
            getIndicatorProps(selectedHealthProperties, key);

          if (!value) return;

          return (
            <IndicatorCard
              key={key}
              indicator={key}
              regionPercentile={regionPercentile}
              countyPercentile={countyPercentile}
              compareMode={compareMode}
              value={value}
              tractId={tractId}
              county={countyName}
              onSelect={handleSelect}
              isSelected={selectedIndicator === key}
              collapsed={collapsedIndicators[key] ?? true}
              setCollapsed={(collapsed) =>
                setCollapsedIndicators((prev) => ({
                  ...prev,
                  [key]: collapsed,
                }))
              }
            />
          );
        })}
        {compareMode == 'Region' &&
          Object.keys(selectedTitleViProperties).length > 0 &&
          titleViKeys.map((key) => {
            const { regionPercentile, value } = getTitleViIndicatorProps(
              selectedTitleViProperties,
              key
            );

            if (!value) return;

            return (
              <TitleViIndicatorCard
                key={key}
                indicator={key}
                regionPercentile={regionPercentile}
                value={value}
                tractId={tractId}
                onSelect={handleSelect}
                isSelected={selectedIndicator === key}
                collapsed={collapsedIndicators[key] ?? true}
                setCollapsed={(collapsed) =>
                  setCollapsedIndicators((prev) => ({
                    ...prev,
                    [key]: collapsed,
                  }))
                }
              />
            );
          })}
      </div>
    </div>
  );
}

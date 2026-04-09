import { activeKeys, countyFipsMap, indicatorPropertyLabelMap } from '@consts';
import type { AllProperties, CompareMode, HealthPropertyKeys } from '@types';
import IndicatorCard from './IndicatorCard';
import { useState } from 'react';
import { formatCensusTractId } from '@utils';

interface Props {
    selectedProperties: AllProperties;
    selectedIndicator: HealthPropertyKeys;
    compareMode: CompareMode;
    setSelectedIndicator: React.Dispatch<
        React.SetStateAction<HealthPropertyKeys>
    >;
}
export default function ContentPanel(props: Props) {
    const { selectedProperties, selectedIndicator, setSelectedIndicator } = props;

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
    const countyName = countyFipsMap[fips];
    const tractId = formatCensusTractId(geoid.slice(5));
    return (
        <div>
            <div className="p-4 border-b border-dvrpc-gray-7">
                <h2 className="text-2xl font-bold ">Census Tract: {tractId}</h2>
                <span className="text-lg">{countyName} County</span>
            </div>
            <div className="p-2 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-100px)]">
                {activeKeys.map((key) => {
                    const healthKey = key as HealthPropertyKeys;
                    return (
                        <IndicatorCard
                            key={healthKey}
                            indicator={healthKey}
                            regionPercentile={selectedProperties[healthKey + '_pct_reg']}
                            countyPercentile={selectedProperties[healthKey + '_pct_cty']}
                            value={selectedProperties[healthKey + '_prv']}
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

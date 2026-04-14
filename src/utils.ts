import type { HealthDataProperties, HealthPropertyKeys, TitleVIProperties, TitleViPropertyKeys } from '@types';

export function themeColor(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function formatCensusTractId(tractId: string) {
  const tract = tractId.substring(0, 4).replace(/^0+/, '');
  const subTract = tractId.substring(4);
  if (subTract === '00') {
    return tract;
  }
  return `${tract}.${subTract}`;
}

export function getIndicatorProps(
  properties: HealthDataProperties,
  key: HealthPropertyKeys
) {
  return {
    regionPercentile: properties[`${key}_pct_reg`],
    countyPercentile: properties[`${key}_pct_cty`],
    value: properties[`${key}_prv`],
  };
}

export function getTitleViIndicatorProps(
  properties: TitleVIProperties,
  key: TitleViPropertyKeys
) {
  return {
    regionPercentile: properties[`${key}_pctile`],
    value: properties[`${key}_pct`],
  };
}
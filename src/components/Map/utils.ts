import type { IndicatorKeys } from '@types';
import { themeColor } from '@utils';
import mapboxgl, { type DataDrivenPropertyValueSpecification } from 'mapbox-gl';

const BASE62_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toBase62(num: number, length: number = 4): string {
  let result = '';
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result.padStart(length, '0');
}

function fromBase62(str: string): number {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = result * 62 + BASE62_CHARS.indexOf(str[i]);
  }
  return result;
}

export function encodeBoundsBase62(bounds: mapboxgl.LngLatBounds): string {
  const values = [
    bounds.getNorth(),
    bounds.getEast(),
    bounds.getSouth(),
    bounds.getWest(),
  ];

  return values
    .map((v) => Math.round(v * 1000) + 90000)
    .map((v) => toBase62(v, 4))
    .join('');
}

export function decodeBoundsBase62(
  encoded: string
): mapboxgl.LngLatBounds | null {
  try {
    if (encoded.length !== 16) return null;

    const parts = [
      encoded.slice(0, 4),
      encoded.slice(4, 8),
      encoded.slice(8, 12),
      encoded.slice(12, 16),
    ];

    const values = parts.map((p) => (fromBase62(p) - 90000) / 1000);
    const [north, east, south, west] = values;

    return new mapboxgl.LngLatBounds([west, south], [east, north]);
  } catch {
    return null;
  }
}

export function decodeBoundsToString(encoded: string): string | null {
  try {
    if (encoded.length !== 16) return null;
    const parts = [
      encoded.slice(0, 4),
      encoded.slice(4, 8),
      encoded.slice(8, 12),
      encoded.slice(12, 16),
    ];
    const [north, east, south, west] = parts.map(
      (p) => (fromBase62(p) - 90000) / 1000
    );
    return `${west},${south},${east},${north}`;
  } catch {
    return null;
  }
}

export const buildFillColor = (
  indicator: IndicatorKeys,
  suffix: string
): DataDrivenPropertyValueSpecification<string> => [
  'step',
  ['get', `${indicator}${suffix}`],
  themeColor('--color-well-below-average'),
  0.2,
  themeColor('--color-below-average'),
  0.4,
  themeColor('--color-average'),
  0.6,
  themeColor('--color-above-average'),
  0.8,
  themeColor('--color-well-above-average'),
];

export const buildFillOpacity = (
  indicator: IndicatorKeys,
  suffix: string
): DataDrivenPropertyValueSpecification<number> => [
  'case',
  ['!=', ['get', `${indicator}${suffix}`], null],
  0.75,
  0,
];

export function zoomToFeatureExtent(
  map: mapboxgl.Map,
  geometry: GeoJSON.Geometry
): void {
  if (!geometry) return;

  if (geometry.type === 'Point') {
    map.flyTo({
      center: geometry.coordinates as [number, number],
      zoom: 14,
    });
  } else if (geometry.type === 'LineString') {
    const coordinates = geometry.coordinates as [number, number][];
    let minLng = coordinates[0][0];
    let maxLng = coordinates[0][0];
    let minLat = coordinates[0][1];
    let maxLat = coordinates[0][1];

    coordinates.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    });

    const bounds: [[number, number], [number, number]] = [
      [minLng, minLat],
      [maxLng, maxLat],
    ];

    map.fitBounds(bounds, {
      padding: 200,
      maxZoom: 16,
    });
  }
  // else if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
  //   const coords =
  //     geometry.type === 'Polygon'
  //       ? geometry.coordinates[0]
  //       : geometry.coordinates[0][0];

  //   let minLng = coords[0][0];
  //   let maxLng = coords[0][0];
  //   let minLat = coords[0][1];
  //   let maxLat = coords[0][1];

  //   coords.forEach(([lng, lat]: [number, number]) => {
  //     minLng = Math.min(minLng, lng);
  //     maxLng = Math.max(maxLng, lng);
  //     minLat = Math.min(minLat, lat);
  //     maxLat = Math.max(maxLat, lat);
  //   });

  //   const bounds: [[number, number], [number, number]] = [
  //     [minLng, minLat],
  //     [maxLng, maxLat],
  //   ];

  //   map.fitBounds(bounds, {
  //     padding: 50,
  //     maxZoom: 16,
  //   });
  // }
}

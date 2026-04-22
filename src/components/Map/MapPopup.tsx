// MapPopup.tsx
import { createRoot } from 'react-dom/client';
import { X, MapPin } from 'lucide-react';

interface Props {
  properties: Record<string, any>;
  onClose: () => void;
  onZoom: () => void;
}

export function MapPopup({ properties, onClose, onZoom }: Props) {
  return (
    <div className="w-[300px] text-xs">
      <div className="flex items-center justify-between px-3 py-2 border-b border-b-dvrpc-gray-6">
        <button
          onClick={onZoom}
          className="p-1 rounded-md hover:bg-dvrpc-gray-6 transition"
          title="Zoom to feature"
        >
          <MapPin className="w-4 h-4 text-dvrpc-gray-1" />
        </button>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-dvrpc-gray-6 transition"
        >
          <X className="w-4 h-4 text-dvrpc-gray-1" />
        </button>
      </div>

      <div className="max-h-[220px] overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {Object.entries(properties).map(([key, value]) => (
              <tr
                key={key}
                className="border-b border-b-dvrpc-gray-7 even:bg-gray-100 last:border-none"
              >
                <td className="px-3 py-2 font-medium text-dvrpc-gray-3 whitespace-nowrap">
                  {key}
                </td>
                <td className="px-3 py-2 text-dvrpc-gray-1">{value ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

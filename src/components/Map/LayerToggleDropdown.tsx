import { Layers } from "lucide-react"
import { useState } from "react"

export type LayerKey = 'circuittrails' | 'passengerrail' | 'septa_transitroutes' | 'njtransit_transitroutes' | 'crash_pa_rhin' | 'crash_nj_rhin' | 'philly_highinjurynetwork' | 'passengerrailstations'

interface LayerToggleDropdownProps {
    onToggle: (ids: LayerKey[], visible: boolean) => void
}

const LAYERS: { label: string; ids: LayerKey[]; color: string }[] = [
    { label: 'Circuit Trails', ids: ['circuittrails'], color: '#8EC73D' },
    { label: 'Passenger Rail', ids: ['passengerrail', 'passengerrailstations'], color: '#C61EF7' },
    { label: 'Bus Routes', ids: ['septa_transitroutes', 'njtransit_transitroutes'], color: '#FC9530' },
    { label: 'High Injury Network', ids: ['crash_pa_rhin', 'crash_nj_rhin', 'philly_highinjurynetwork'], color: '#E94F3D' },
]

export default function LayerToggleDropdown({ onToggle }: LayerToggleDropdownProps) {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState<Record<string, boolean>>({
        'Circuit Trails': false,
        'Passenger Rail': false,
        'Bus Routes': false,
        'High Injury Network': false,
    })

    const handleToggle = (label: string, ids: LayerKey[]) => {
        const next = !active[label]
        setActive(prev => ({ ...prev, [label]: next }))
        onToggle(ids, next)
    }

    return (
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1">
            <button
                onClick={() => setOpen(o => !o)}
                title="Toggle layers"
                className="flex items-center justify-center p-1.5 rounded bg-white border border-gray-300 text-gray-600 shadow-md hover:bg-gray-50 transition-colors"
            >
                <Layers size={18} />
            </button>

            {open && (
                <div className="bg-white border border-gray-300 rounded shadow-xl min-w-44 py-2">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-3 pb-1.5">
                        Layers
                    </p>
                    {LAYERS.map(({ label, ids, color }) => {
                        const isOn = active[label]
                        return (
                            <label
                                key={label}
                                className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                            >
                                <span
                                    className="w-3 h-0.5 rounded-sm flex-shrink-0 transition-colors"
                                    style={{ background: isOn ? color : '#d1d5db' }}
                                />
                                <span className={`flex-1 text-[13px] transition-colors ${isOn ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {label}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={isOn}
                                    onChange={() => handleToggle(label, ids)}
                                    className="sr-only"
                                />
                                <div className={`relative w-7 h-4 rounded-full border transition-colors flex-shrink-0 ${isOn ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'}`}>
                                    <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${isOn ? 'left-3.5 bg-white' : 'left-0.5 bg-gray-400'}`} />
                                </div>
                            </label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
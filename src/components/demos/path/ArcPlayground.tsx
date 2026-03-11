'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ArcPlayground() {
  const [start, setStart] = useState({ x: 30, y: 50 });
  const [end, setEnd] = useState({ x: 70, y: 50 });
  const [rx, setRx] = useState(30);
  const [ry, setRy] = useState(20);
  const [rotation, setRotation] = useState(0);
  const [largeArc, setLargeArc] = useState(0); // 0 or 1
  const [sweep, setSweep] = useState(0); // 0 or 1

  const d = `M ${start.x} ${start.y} A ${rx} ${ry} ${rotation} ${largeArc} ${sweep} ${end.x} ${end.y}`;

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Elliptical Arc Playground (A)</h3>
        <p className="text-sm text-muted-foreground">
          The arc command is complex. It defines an ellipse that passes through two points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Arc Parameters</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <Control label="rx (Radius X)" value={rx} onChange={setRx} max={80} />
              <Control label="ry (Radius Y)" value={ry} onChange={setRy} max={80} />
              <Control label="Rotation (deg)" value={rotation} onChange={setRotation} min={-180} max={180} />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={largeArc === 1}
                  onChange={(e) => setLargeArc(e.target.checked ? 1 : 0)}
                  className="rounded border-primary"
                />
                large-arc-flag (0 = short way, 1 = long way)
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={sweep === 1}
                  onChange={(e) => setSweep(e.target.checked ? 1 : 0)}
                  className="rounded border-primary"
                />
                sweep-flag (0 = CCW, 1 = CW)
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Path Data</h4>
            <div className="rounded bg-zinc-950 p-4 text-sm text-zinc-50 font-mono break-all">
              {`<path d="${d}" ... />`}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full block"
            >
              {/* Grid */}
              <defs>
                <pattern id="grid-arc" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-arc)" pointerEvents="none" />
              
              {/* The 4 possible arcs (faint) */}
              {/* This helps visualize what the flags are choosing from */}
              <path d={`M ${start.x} ${start.y} A ${rx} ${ry} ${rotation} 0 0 ${end.x} ${end.y}`} stroke="gray" strokeOpacity="0.3" fill="none" strokeDasharray="2" />
              <path d={`M ${start.x} ${start.y} A ${rx} ${ry} ${rotation} 0 1 ${end.x} ${end.y}`} stroke="gray" strokeOpacity="0.3" fill="none" strokeDasharray="2" />
              <path d={`M ${start.x} ${start.y} A ${rx} ${ry} ${rotation} 1 0 ${end.x} ${end.y}`} stroke="gray" strokeOpacity="0.3" fill="none" strokeDasharray="2" />
              <path d={`M ${start.x} ${start.y} A ${rx} ${ry} ${rotation} 1 1 ${end.x} ${end.y}`} stroke="gray" strokeOpacity="0.3" fill="none" strokeDasharray="2" />

              {/* The Active Arc */}
              <path
                d={d}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Points */}
              <circle cx={start.x} cy={start.y} r="2" fill="black" />
              <text x={start.x} y={start.y - 4} fontSize="4" textAnchor="middle">Start</text>

              <circle cx={end.x} cy={end.y} r="2" fill="black" />
              <text x={end.x} y={end.y - 4} fontSize="4" textAnchor="middle">End</text>

            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Control({ label, value, onChange, min = 0, max = 100, step = 1 }: { label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-xs font-medium">{label}</label>
        <span className="text-xs text-muted-foreground font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

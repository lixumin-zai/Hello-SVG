'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function StrokePlayground() {
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [strokeLinecap, setStrokeLinecap] = useState<'butt' | 'round' | 'square'>('butt');
  const [strokeLinejoin, setStrokeLinejoin] = useState<'miter' | 'round' | 'bevel'>('miter');
  const [dashArray, setDashArray] = useState(0);
  const [dashGap, setDashGap] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);

  const dashString = dashArray > 0 || dashGap > 0 ? `${dashArray} ${dashGap}` : 'none';

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Stroke Style Laboratory</h3>
        <p className="text-sm text-muted-foreground">
          Explore how stroke attributes change the appearance of lines and corners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Basic Properties</h4>
            <Control label="Stroke Width" value={strokeWidth} onChange={setStrokeWidth} min={1} max={30} />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">stroke-linecap</label>
                <select 
                  value={strokeLinecap}
                  onChange={(e) => setStrokeLinecap(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="butt">butt (Default)</option>
                  <option value="round">round</option>
                  <option value="square">square</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">stroke-linejoin</label>
                <select 
                  value={strokeLinejoin}
                  onChange={(e) => setStrokeLinejoin(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="miter">miter (Default)</option>
                  <option value="round">round</option>
                  <option value="bevel">bevel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Dashed Lines</h4>
            <Control label="Dash Length" value={dashArray} onChange={setDashArray} max={50} />
            <Control label="Gap Length" value={dashGap} onChange={setDashGap} max={50} />
            <Control label="Dash Offset" value={dashOffset} onChange={setDashOffset} min={-100} max={100} />
            <p className="text-[10px] text-muted-foreground pt-1">
              Tip: Animate "Dash Offset" to create a "drawing" effect!
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">CSS Code</h4>
            <div className="rounded bg-zinc-950 p-4 text-sm text-zinc-50 font-mono break-all">
              <pre>{`.line {
  stroke-width: ${strokeWidth};
  stroke-linecap: ${strokeLinecap};
  stroke-linejoin: ${strokeLinejoin};
  stroke-dasharray: ${dashString};
  stroke-dashoffset: ${dashOffset};
}`}</pre>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full block"
            >
              {/* Grid */}
              <defs>
                <pattern id="grid-stroke" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid-stroke)" pointerEvents="none" />
              
              {/* Skeleton (thin line showing the path center) */}
              <path 
                d="M 40 40 L 160 40 L 40 160 L 160 160" 
                fill="none" 
                stroke="red" 
                strokeWidth="1" 
                strokeOpacity="0.3"
                strokeDasharray="4 2"
              />

              {/* The Styled Path */}
              <path
                d="M 40 40 L 160 40 L 40 160 L 160 160"
                fill="none"
                stroke="#3b82f6"
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
                strokeDasharray={dashString}
                strokeDashoffset={dashOffset}
                className="transition-all duration-300"
              />

              {/* Points */}
              <circle cx="40" cy="40" r="3" fill="red" />
              <circle cx="160" cy="40" r="3" fill="red" />
              <circle cx="40" cy="160" r="3" fill="red" />
              <circle cx="160" cy="160" r="3" fill="red" />
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

'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function MarkerLab() {
  const [orient, setOrient] = useState<'auto' | 'auto-start-reverse' | '0'>('auto');
  const [refX, setRefX] = useState(5);
  const [refY, setRefY] = useState(5);
  const [markerWidth, setMarkerWidth] = useState(6);
  const [markerHeight, setMarkerHeight] = useState(6);
  
  const [showStart, setShowStart] = useState(true);
  const [showMid, setShowMid] = useState(true);
  const [showEnd, setShowEnd] = useState(true);

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Marker Laboratory</h3>
        <p className="text-sm text-muted-foreground">
          Markers are shapes attached to line ends. Adjust the reference point (pivot) and orientation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Marker Definition</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <Control label="refX (Pivot X)" value={refX} onChange={setRefX} max={10} />
              <Control label="refY (Pivot Y)" value={refY} onChange={setRefY} max={10} />
              <Control label="Width" value={markerWidth} onChange={setMarkerWidth} max={20} />
              <Control label="Height" value={markerHeight} onChange={setMarkerHeight} max={20} />
            </div>

            <div className="mt-4 space-y-1">
              <label className="text-xs font-medium">orient (Rotation)</label>
              <select 
                value={orient}
                onChange={(e) => setOrient(e.target.value as any)}
                className="w-full rounded border bg-background px-2 py-1 text-xs"
              >
                <option value="auto">auto (Follow Path)</option>
                <option value="auto-start-reverse">auto-start-reverse (Mirror at Start)</option>
                <option value="0">0 (Fixed / No Rotation)</option>
                <option value="45">45 (Fixed Angle)</option>
                <option value="90">90 (Fixed Angle)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Apply To</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={showStart} onChange={e => setShowStart(e.target.checked)} />
                Start
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={showMid} onChange={e => setShowMid(e.target.checked)} />
                Mid
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={showEnd} onChange={e => setShowEnd(e.target.checked)} />
                End
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Code Preview</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
{`<marker id="arrow" 
  markerWidth="${markerWidth}" markerHeight="${markerHeight}" 
  refX="${refX}" refY="${refY}" 
  orient="${orient}">
  <path d="M0,0 L0,10 L10,5 z" fill="red" />
</marker>

<path 
  d="..." 
  ${showStart ? 'marker-start="url(#arrow)"' : ''}
  ${showMid ? 'marker-mid="url(#arrow)"' : ''}
  ${showEnd ? 'marker-end="url(#arrow)"' : ''}
/>`}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full block"
            >
              <defs>
                <marker 
                  id="demo-arrow" 
                  markerWidth={markerWidth} 
                  markerHeight={markerHeight} 
                  refX={refX} 
                  refY={refY} 
                  orient={orient}
                  markerUnits="strokeWidth"
                >
                  {/* A simple triangle arrow. Size is 10x10 in user units */}
                  <path d="M0,0 L0,10 L10,5 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* Grid */}
              <defs>
                <pattern id="grid-marker" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid-marker)" pointerEvents="none" />

              {/* The Path */}
              <path
                d="M 40 160 Q 40 40 160 40"
                fill="none"
                stroke="black"
                strokeWidth="2"
                markerStart={showStart ? "url(#demo-arrow)" : undefined}
                markerMid={showMid ? "url(#demo-arrow)" : undefined}
                markerEnd={showEnd ? "url(#demo-arrow)" : undefined}
              />

              {/* Points Visualizer */}
              <circle cx="40" cy="160" r="3" fill="blue" />
              <text x="40" y="180" fontSize="10" textAnchor="middle" fill="blue">Start</text>
              
              <circle cx="160" cy="40" r="3" fill="blue" />
              <text x="160" y="30" fontSize="10" textAnchor="middle" fill="blue">End</text>

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

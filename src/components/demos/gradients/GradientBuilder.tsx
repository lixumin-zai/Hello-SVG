'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface GradientStop {
  offset: number;
  color: string;
  opacity: number;
}

export function GradientBuilder() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [stops, setStops] = useState<GradientStop[]>([
    { offset: 0, color: '#3b82f6', opacity: 1 },
    { offset: 100, color: '#ef4444', opacity: 1 }
  ]);
  
  // Linear specific
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(100);
  const [y2, setY2] = useState(0);

  // Radial specific
  const [cx, setCx] = useState(50);
  const [cy, setCy] = useState(50);
  const [r, setR] = useState(50);
  const [fx, setFx] = useState(50);
  const [fy, setFy] = useState(50);

  const [spreadMethod, setSpreadMethod] = useState<'pad' | 'reflect' | 'repeat'>('pad');

  const updateStop = (index: number, key: keyof GradientStop, value: any) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], [key]: value };
    // Sort stops by offset to keep UI consistent, though SVG doesn't strictly require it (but rendering does)
    newStops.sort((a, b) => a.offset - b.offset);
    setStops(newStops);
  };

  const addStop = () => {
    setStops([...stops, { offset: 50, color: '#22c55e', opacity: 1 }].sort((a, b) => a.offset - b.offset));
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const renderGradientCode = () => {
    const stopNodes = stops.map(s => `    <stop offset="${s.offset}%" stop-color="${s.color}" stop-opacity="${s.opacity}" />`).join('\n');
    
    if (type === 'linear') {
      return `<linearGradient id="grad1" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" spreadMethod="${spreadMethod}">
${stopNodes}
  </linearGradient>`;
    } else {
      return `<radialGradient id="grad1" cx="${cx}%" cy="${cy}%" r="${r}%" fx="${fx}%" fy="${fy}%" spreadMethod="${spreadMethod}">
${stopNodes}
  </radialGradient>`;
    }
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Gradient Builder</h3>
        <p className="text-sm text-muted-foreground">
          Design linear and radial gradients visually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="flex bg-muted rounded p-1">
            <button
              onClick={() => setType('linear')}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
                type === 'linear' ? "bg-white shadow text-primary" : "text-muted-foreground"
              )}
            >
              Linear
            </button>
            <button
              onClick={() => setType('radial')}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors",
                type === 'radial' ? "bg-white shadow text-primary" : "text-muted-foreground"
              )}
            >
              Radial
            </button>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Vector Coordinates (%)</h4>
            {type === 'linear' ? (
              <div className="grid grid-cols-2 gap-4">
                <Control label="x1" value={x1} onChange={setX1} />
                <Control label="y1" value={y1} onChange={setY1} />
                <Control label="x2" value={x2} onChange={setX2} />
                <Control label="y2" value={y2} onChange={setY2} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Control label="cx (Center X)" value={cx} onChange={setCx} />
                <Control label="cy (Center Y)" value={cy} onChange={setCy} />
                <Control label="r (Radius)" value={r} onChange={setR} />
                <div className="hidden md:block"></div>
                <Control label="fx (Focal X)" value={fx} onChange={setFx} />
                <Control label="fy (Focal Y)" value={fy} onChange={setFy} />
              </div>
            )}
             <div className="mt-4">
                <label className="text-xs font-medium block mb-1">spreadMethod</label>
                <select 
                  value={spreadMethod}
                  onChange={(e) => setSpreadMethod(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="pad">pad (Default)</option>
                  <option value="reflect">reflect</option>
                  <option value="repeat">repeat</option>
                </select>
             </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-medium text-sm">Color Stops</h4>
              <button 
                onClick={addStop}
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
              >
                + Add Stop
              </button>
            </div>
            
            <div className="space-y-3">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={stop.offset} 
                    onChange={(e) => updateStop(i, 'offset', Number(e.target.value))}
                    className="w-16 accent-primary"
                  />
                  <span className="w-8 text-right font-mono">{stop.offset}%</span>
                  
                  <input 
                    type="color" 
                    value={stop.color}
                    onChange={(e) => updateStop(i, 'color', e.target.value)}
                    className="h-6 w-8 p-0 rounded border cursor-pointer"
                  />
                  
                  <input 
                    type="range" 
                    min="0" max="1" step="0.1"
                    value={stop.opacity} 
                    onChange={(e) => updateStop(i, 'opacity', Number(e.target.value))}
                    className="w-12 accent-primary"
                  />
                  <span className="w-8 text-right font-mono">Op:{stop.opacity}</span>

                  <button 
                    onClick={() => removeStop(i)}
                    className="text-muted-foreground hover:text-red-500 disabled:opacity-30"
                    disabled={stops.length <= 2}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">SVG Code</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
              {renderGradientCode()}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
             {/* Checkerboard for transparency */}
             <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                  linear-gradient(-45deg, #000 25%, transparent 25%), 
                                  linear-gradient(45deg, transparent 75%, #000 75%), 
                                  linear-gradient(-45deg, transparent 75%, #000 75%)`,
                backgroundSize: `20px 20px`,
                backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
              }}
            />

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full block"
            >
              <defs>
                {type === 'linear' ? (
                  <linearGradient 
                    id="preview-grad" 
                    x1={`${x1}%`} y1={`${y1}%`} 
                    x2={`${x2}%`} y2={`${y2}%`} 
                    spreadMethod={spreadMethod}
                  >
                    {stops.map((s, i) => (
                      <stop key={i} offset={`${s.offset}%`} stopColor={s.color} stopOpacity={s.opacity} />
                    ))}
                  </linearGradient>
                ) : (
                  <radialGradient 
                    id="preview-grad" 
                    cx={`${cx}%`} cy={`${cy}%`} 
                    r={`${r}%`} 
                    fx={`${fx}%`} fy={`${fy}%`} 
                    spreadMethod={spreadMethod}
                  >
                    {stops.map((s, i) => (
                      <stop key={i} offset={`${s.offset}%`} stopColor={s.color} stopOpacity={s.opacity} />
                    ))}
                  </radialGradient>
                )}
              </defs>

              <rect width="100" height="100" fill="url(#preview-grad)" />

              {/* Visual Helpers (Handles) */}
              <g pointerEvents="none">
                {type === 'linear' ? (
                  <>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx={x1} cy={y1} r="2" fill="white" stroke="black" strokeWidth="1" />
                    <circle cx={x2} cy={y2} r="2" fill="black" stroke="white" strokeWidth="1" />
                  </>
                ) : (
                  <>
                     <circle cx={cx} cy={cy} r={r} fill="none" stroke="black" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2" />
                     <circle cx={cx} cy={cy} r="2" fill="white" stroke="black" strokeWidth="1" />
                     <circle cx={fx} cy={fy} r="1.5" fill="red" stroke="white" strokeWidth="0.5" />
                     <line x1={cx} y1={cy} x2={fx} y2={fy} stroke="red" strokeWidth="0.5" strokeOpacity="0.5" />
                  </>
                )}
              </g>
            </svg>
            
            <div className="absolute top-2 left-2 text-[10px] text-muted-foreground bg-white/80 px-2 py-1 rounded pointer-events-none">
              {type === 'linear' ? 'White Dot: Start (x1,y1) | Black Dot: End (x2,y2)' : 'White Dot: Center (cx,cy) | Red Dot: Focus (fx,fy)'}
            </div>
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
        <span className="text-xs text-muted-foreground font-mono">{value}%</span>
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

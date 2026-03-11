'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function PatternPlayground() {
  const [patternUnits, setPatternUnits] = useState<'userSpaceOnUse' | 'objectBoundingBox'>('userSpaceOnUse');
  const [patternContentUnits, setPatternContentUnits] = useState<'userSpaceOnUse' | 'objectBoundingBox'>('userSpaceOnUse');
  
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  // For objectBoundingBox, values should be 0-1
  const effectiveWidth = patternUnits === 'objectBoundingBox' ? width / 100 : width;
  const effectiveHeight = patternUnits === 'objectBoundingBox' ? height / 100 : height;

  const getTransform = () => {
    let t = '';
    if (rotate !== 0) t += `rotate(${rotate}) `;
    if (scale !== 1) t += `scale(${scale})`;
    return t.trim();
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Pattern Playground</h3>
        <p className="text-sm text-muted-foreground">
          Patterns repeat a small SVG fragment to fill an area. The coordinate systems can be tricky!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Coordinate Systems</h4>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">patternUnits (Grid Size)</label>
                <select 
                  value={patternUnits}
                  onChange={(e) => setPatternUnits(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="userSpaceOnUse">userSpaceOnUse (Pixels)</option>
                  <option value="objectBoundingBox">objectBoundingBox (Percentage 0-1)</option>
                </select>
                <p className="text-[10px] text-muted-foreground">
                  {patternUnits === 'userSpaceOnUse' 
                    ? 'Grid defined in absolute pixels (e.g., 20px).' 
                    : 'Grid defined relative to the object (e.g., 0.2 = 20%).'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">patternContentUnits (Shape Content)</label>
                <select 
                  value={patternContentUnits}
                  onChange={(e) => setPatternContentUnits(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="userSpaceOnUse">userSpaceOnUse (Pixels)</option>
                  <option value="objectBoundingBox">objectBoundingBox (Percentage 0-1)</option>
                </select>
                <p className="text-[10px] text-muted-foreground">
                  {patternContentUnits === 'userSpaceOnUse' 
                    ? 'Shapes inside pattern drawn in pixels.' 
                    : 'Shapes inside pattern drawn relative to object size.'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Pattern Dimensions & Transform</h4>
            <div className="grid grid-cols-2 gap-4">
              <Control 
                label={`Width (${patternUnits === 'objectBoundingBox' ? '%' : 'px'})`} 
                value={width} 
                onChange={setWidth} 
                min={5} max={100} 
              />
              <Control 
                label={`Height (${patternUnits === 'objectBoundingBox' ? '%' : 'px'})`} 
                value={height} 
                onChange={setHeight} 
                min={5} max={100} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Control label="Rotate" value={rotate} onChange={setRotate} min={-45} max={45} />
              <Control label="Scale" value={scale} onChange={setScale} min={0.5} max={2} step={0.1} />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">SVG Code</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
              {`<pattern 
  id="p1" 
  width="${effectiveWidth}" height="${effectiveHeight}"
  patternUnits="${patternUnits}"
  patternContentUnits="${patternContentUnits}"
  patternTransform="${getTransform()}"
>
  <circle r="5" fill="red" />
</pattern>`}
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
                <pattern 
                  id="demo-pattern" 
                  width={effectiveWidth} 
                  height={effectiveHeight} 
                  patternUnits={patternUnits}
                  patternContentUnits={patternContentUnits}
                  patternTransform={getTransform()}
                >
                  {/* The content of the pattern */}
                  {patternContentUnits === 'userSpaceOnUse' ? (
                    // Content in pixels
                    <g>
                      <rect width="200" height="200" fill="#f0f9ff" />
                      <circle cx="10" cy="10" r="5" fill="#3b82f6" fillOpacity="0.5" />
                      <circle cx="0" cy="0" r="2" fill="#ef4444" />
                      <circle cx="20" cy="20" r="2" fill="#ef4444" />
                    </g>
                  ) : (
                    // Content in percentage (0-1)
                    // Note: circles will be distorted if aspect ratio is not 1:1 unless we handle it
                    <g>
                      <rect width="1" height="1" fill="#f0f9ff" />
                      <circle cx="0.5" cy="0.5" r="0.25" fill="#3b82f6" fillOpacity="0.5" />
                    </g>
                  )}
                </pattern>
              </defs>

              {/* Grid Background */}
              <defs>
                <pattern id="grid-bg" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid-bg)" pointerEvents="none" />

              {/* The Object Filled with Pattern */}
              <rect x="20" y="20" width="160" height="160" stroke="black" strokeWidth="2" fill="url(#demo-pattern)" />
              
              <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#666">
                160x160 Rectangle
              </text>
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

'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function TextLab() {
  const [text, setText] = useState('Hello SVG!');
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [textAnchor, setTextAnchor] = useState<'start' | 'middle' | 'end'>('middle');
  const [dominantBaseline, setDominantBaseline] = useState<'auto' | 'hanging' | 'middle' | 'alphabetic'>('middle');
  const [rotate, setRotate] = useState(0);

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">SVG Text Playground</h3>
        <p className="text-sm text-muted-foreground">
          SVG text is not like HTML text. It's positioned precisely in the coordinate system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Text Content & Size</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Text content</label>
                <input 
                  type="text" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded border bg-background px-3 py-1.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Control label="Font Size" value={fontSize} onChange={setFontSize} min={5} max={40} />
                <Control label="Rotate" value={rotate} onChange={setRotate} min={-180} max={180} />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Position & Alignment</h4>
            <div className="grid grid-cols-2 gap-4">
              <Control label="x" value={x} onChange={setX} max={100} />
              <Control label="y" value={y} onChange={setY} max={100} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">text-anchor (Horizontal)</label>
                <select 
                  value={textAnchor}
                  onChange={(e) => setTextAnchor(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="start">start (Left)</option>
                  <option value="middle">middle (Center)</option>
                  <option value="end">end (Right)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">dominant-baseline (Vertical)</label>
                <select 
                  value={dominantBaseline}
                  onChange={(e) => setDominantBaseline(e.target.value as any)}
                  className="w-full rounded border bg-background px-2 py-1 text-xs"
                >
                  <option value="auto">auto</option>
                  <option value="hanging">hanging (Top)</option>
                  <option value="middle">middle (Center)</option>
                  <option value="alphabetic">alphabetic (Bottom)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full block"
            >
              {/* Grid */}
              <defs>
                <pattern id="grid-text" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-text)" />
              
              {/* Target lines to show alignment */}
              <line x1={x} y1="0" x2={x} y2="100" stroke="red" strokeWidth="0.2" strokeDasharray="2" />
              <line x1="0" y1={y} x2="100" y2={y} stroke="red" strokeWidth="0.2" strokeDasharray="2" />

              <text
                x={x}
                y={y}
                fontSize={fontSize}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                transform={`rotate(${rotate}, ${x}, ${y})`}
                fill="#3b82f6"
                className="font-sans font-bold transition-all duration-300"
              >
                {text}
              </text>

              {/* Position dot */}
              <circle cx={x} cy={y} r="1" fill="red" />
            </svg>
          </div>
          
          <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 overflow-x-auto font-mono">
            <pre>{`<text
  x="${x}" y="${y}"
  font-size="${fontSize}"
  text-anchor="${textAnchor}"
  dominant-baseline="${dominantBaseline}"
  transform="rotate(${rotate}, ${x}, ${y})"
  fill="#3b82f6"
>
  ${text}
</text>`}</pre>
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

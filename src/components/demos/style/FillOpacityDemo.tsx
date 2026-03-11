'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function FillOpacityDemo() {
  const [fillColor, setFillColor] = useState('#3b82f6');
  const [strokeColor, setStrokeColor] = useState('#ef4444');
  const [opacity, setOpacity] = useState(1);
  const [fillOpacity, setFillOpacity] = useState(1);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [mixBlendMode, setMixBlendMode] = useState<any>('normal');

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Opacity vs. Fill/Stroke Opacity</h3>
        <p className="text-sm text-muted-foreground">
          Understanding the difference between global opacity and property-specific opacity is crucial for blending.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Global Opacity</h4>
            <Control label="opacity (Entire Element)" value={opacity} onChange={setOpacity} min={0} max={1} step={0.1} />
            <p className="text-[10px] text-muted-foreground">Affects both fill and stroke together.</p>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Specific Opacity</h4>
            <Control label="fill-opacity" value={fillOpacity} onChange={setFillOpacity} min={0} max={1} step={0.1} />
            <Control label="stroke-opacity" value={strokeOpacity} onChange={setStrokeOpacity} min={0} max={1} step={0.1} />
            <p className="text-[10px] text-muted-foreground">Allows independent transparency control.</p>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Blend Mode</h4>
            <select 
              value={mixBlendMode}
              onChange={(e) => setMixBlendMode(e.target.value)}
              className="w-full rounded border bg-background px-2 py-1 text-xs"
            >
              <option value="normal">normal</option>
              <option value="multiply">multiply</option>
              <option value="screen">screen</option>
              <option value="overlay">overlay</option>
              <option value="darken">darken</option>
              <option value="lighten">lighten</option>
            </select>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            {/* Checkerboard Background to show transparency */}
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
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full block"
            >
              {/* Background Shape to blend with */}
              <circle cx="80" cy="80" r="50" fill="gold" />
              <text x="80" y="80" fontSize="10" textAnchor="middle" dy="4">Background</text>

              {/* The Active Shape */}
              <rect
                x="80" y="80" width="100" height="80" rx="10"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="10"
                opacity={opacity}
                fillOpacity={fillOpacity}
                strokeOpacity={strokeOpacity}
                style={{ mixBlendMode }}
              />
              
              <text x="130" y="120" fontSize="10" fill="white" textAnchor="middle" pointerEvents="none">Foreground</text>
            </svg>
          </div>

          <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono break-all">
            <pre>{`<rect
  fill="${fillColor}"
  stroke="${strokeColor}"
  opacity="${opacity}"
  fill-opacity="${fillOpacity}"
  stroke-opacity="${strokeOpacity}"
  style="mix-blend-mode: ${mixBlendMode}"
/>`}</pre>
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

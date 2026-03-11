'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

type FilterType = 'blur' | 'dropShadow' | 'grayscale' | 'turbulence' | 'morphology';

export function FilterLab() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('blur');
  
  // Params
  const [blurStdDev, setBlurStdDev] = useState(2);
  const [shadowDx, setShadowDx] = useState(2);
  const [shadowDy, setShadowDy] = useState(2);
  const [shadowBlur, setShadowBlur] = useState(2);
  const [grayscaleAmount, setGrayscaleAmount] = useState(1);
  const [turbulenceFreq, setTurbulenceFreq] = useState(0.05);
  const [morphOperator, setMorphOperator] = useState<'erode' | 'dilate'>('erode');
  const [morphRadius, setMorphRadius] = useState(2);

  const getFilterCode = () => {
    switch (activeFilter) {
      case 'blur':
        return `<filter id="blur">
  <feGaussianBlur stdDeviation="${blurStdDev}" />
</filter>`;
      case 'dropShadow':
        return `<filter id="shadow">
  <feDropShadow dx="${shadowDx}" dy="${shadowDy}" stdDeviation="${shadowBlur}" flood-color="black" flood-opacity="0.5" />
</filter>`;
      case 'grayscale':
        return `<filter id="grayscale">
  <feColorMatrix type="saturate" values="${1 - grayscaleAmount}" />
</filter>`;
      case 'turbulence':
        return `<filter id="turbulence">
  <feTurbulence type="turbulence" baseFrequency="${turbulenceFreq}" numOctaves="2" result="noise" />
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
</filter>`;
      case 'morphology':
        return `<filter id="morph">
  <feMorphology operator="${morphOperator}" radius="${morphRadius}" />
</filter>`;
      default:
        return '';
    }
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Filter Laboratory</h3>
        <p className="text-sm text-muted-foreground">
          SVG filters can create Photoshop-like effects directly in the browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {(['blur', 'dropShadow', 'grayscale', 'turbulence', 'morphology'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-full border transition-colors capitalize",
                  activeFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Filter Parameters</h4>
            
            {activeFilter === 'blur' && (
              <Control label="stdDeviation (Blur Amount)" value={blurStdDev} onChange={setBlurStdDev} max={10} step={0.5} />
            )}

            {activeFilter === 'dropShadow' && (
              <div className="space-y-4">
                <Control label="dx (Offset X)" value={shadowDx} onChange={setShadowDx} min={-10} max={10} />
                <Control label="dy (Offset Y)" value={shadowDy} onChange={setShadowDy} min={-10} max={10} />
                <Control label="stdDeviation (Blur)" value={shadowBlur} onChange={setShadowBlur} max={10} />
              </div>
            )}

            {activeFilter === 'grayscale' && (
              <Control label="Amount (1=Gray, 0=Color)" value={grayscaleAmount} onChange={setGrayscaleAmount} min={0} max={1} step={0.1} />
            )}

            {activeFilter === 'turbulence' && (
              <Control label="Base Frequency (Roughness)" value={turbulenceFreq} onChange={setTurbulenceFreq} min={0.01} max={0.2} step={0.01} />
            )}

            {activeFilter === 'morphology' && (
              <div className="space-y-4">
                 <div className="space-y-1">
                  <label className="text-xs font-medium">Operator</label>
                  <select 
                    value={morphOperator}
                    onChange={(e) => setMorphOperator(e.target.value as any)}
                    className="w-full rounded border bg-background px-2 py-1 text-xs"
                  >
                    <option value="erode">erode (Thinning)</option>
                    <option value="dilate">dilate (Thickening)</option>
                  </select>
                </div>
                <Control label="Radius (Strength)" value={morphRadius} onChange={setMorphRadius} min={1} max={10} />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">SVG Code</h4>
            <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 font-mono overflow-x-auto whitespace-pre">
              {getFilterCode()}
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
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full block"
            >
              <defs>
                <filter id="demo-blur">
                  <feGaussianBlur stdDeviation={blurStdDev} />
                </filter>
                <filter id="demo-shadow">
                  <feDropShadow dx={shadowDx} dy={shadowDy} stdDeviation={shadowBlur} floodColor="black" floodOpacity="0.5" />
                </filter>
                <filter id="demo-grayscale">
                  <feColorMatrix type="saturate" values={(1 - grayscaleAmount).toString()} />
                </filter>
                <filter id="demo-turbulence">
                  <feTurbulence type="turbulence" baseFrequency={turbulenceFreq} numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
                <filter id="demo-morph">
                  <feMorphology operator={morphOperator} radius={morphRadius} />
                </filter>
              </defs>

              <g filter={`url(#demo-${activeFilter})`}>
                {/* A complex group to show filter effects well */}
                <circle cx="100" cy="100" r="60" fill="#3b82f6" />
                <text x="100" y="110" textAnchor="middle" fontSize="30" fontWeight="bold" fill="white">SVG</text>
                <rect x="40" y="40" width="40" height="40" fill="#ef4444" rx="5" />
                <rect x="120" y="120" width="40" height="40" fill="#22c55e" rx="5" />
              </g>
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

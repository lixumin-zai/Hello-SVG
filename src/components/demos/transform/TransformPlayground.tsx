'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function TransformPlayground() {
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  
  // Order of operations
  const [order, setOrder] = useState<'TRS' | 'SRT'>('TRS'); // Translate-Rotate-Scale vs Scale-Rotate-Translate

  const getTransformString = () => {
    // Note: SVG transforms are applied right-to-left in matrix math, 
    // but in string format they are applied left-to-right to the coordinate system.
    // However, intuitively for users:
    // TRS: Translate first (move origin), then Rotate (spin axes), then Scale (stretch axes).
    // Usually people want: Move object, then rotate it in place, then scale it in place.
    // BUT SVG transform origin defaults to (0,0).
    // So "Rotate" rotates around (0,0).
    
    if (order === 'TRS') {
      return `translate(${tx}, ${ty}) rotate(${rotate}) scale(${scaleX}, ${scaleY}) skewX(${skewX}) skewY(${skewY})`;
    } else {
      return `scale(${scaleX}, ${scaleY}) rotate(${rotate}) translate(${tx}, ${ty}) skewX(${skewX}) skewY(${skewY})`;
    }
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Transform Playground</h3>
        <p className="text-sm text-muted-foreground">
          Manipulate the coordinate system of the object. Note how the grid moves with it!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Translate (Move)</h4>
            <div className="grid grid-cols-2 gap-4">
              <Control label="X" value={tx} onChange={setTx} min={-100} max={100} />
              <Control label="Y" value={ty} onChange={setTy} min={-100} max={100} />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Rotate (Deg)</h4>
            <Control label="Angle" value={rotate} onChange={setRotate} min={-180} max={180} />
            <p className="text-[10px] text-muted-foreground">
              Rotates around (0,0) unless origin is changed.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Scale (Size)</h4>
            <div className="grid grid-cols-2 gap-4">
              <Control label="SX" value={scaleX} onChange={setScaleX} min={0.1} max={3} step={0.1} />
              <Control label="SY" value={scaleY} onChange={setScaleY} min={0.1} max={3} step={0.1} />
            </div>
          </div>
          
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Skew (Tilt)</h4>
            <div className="grid grid-cols-2 gap-4">
              <Control label="Skew X" value={skewX} onChange={setSkewX} min={-60} max={60} />
              <Control label="Skew Y" value={skewY} onChange={setSkewY} min={-60} max={60} />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Transform String</h4>
            <div className="rounded bg-zinc-950 p-4 text-sm text-zinc-50 font-mono break-all">
              {`transform="${getTransformString()}"`}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded border bg-white shadow-inner">
            <svg
              viewBox="-100 -100 200 200"
              className="h-full w-full block"
            >
              {/* Static Background Grid (World Coordinates) */}
              <defs>
                <pattern id="grid-world" width="20" height="20" patternUnits="userSpaceOnUse" x="-100" y="-100">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect x="-100" y="-100" width="200" height="200" fill="url(#grid-world)" />
              
              {/* World Origin */}
              <line x1="-100" y1="0" x2="100" y2="0" stroke="gray" strokeOpacity="0.5" />
              <line x1="0" y1="-100" x2="0" y2="100" stroke="gray" strokeOpacity="0.5" />
              <circle cx="0" cy="0" r="2" fill="gray" />

              {/* Transformed Group */}
              <g transform={getTransformString()}>
                {/* Local Coordinate System Grid (moves with object) */}
                <line x1="0" y1="0" x2="50" y2="0" stroke="red" strokeWidth="2" markerEnd="url(#arrow-r)" />
                <line x1="0" y1="0" x2="0" y2="50" stroke="green" strokeWidth="2" markerEnd="url(#arrow-g)" />
                
                {/* The Object (A Robot Face) */}
                <rect x="-20" y="-20" width="40" height="40" rx="5" fill="#3b82f6" stroke="black" strokeWidth="2" fillOpacity="0.8" />
                <circle cx="-10" cy="-10" r="4" fill="white" />
                <circle cx="10" cy="-10" r="4" fill="white" />
                <path d="M -10 10 Q 0 20 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                
                {/* Local Origin Marker */}
                <circle cx="0" cy="0" r="3" fill="black" />
              </g>

              {/* Markers definition */}
              <defs>
                <marker id="arrow-r" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="red" />
                </marker>
                <marker id="arrow-g" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="green" />
                </marker>
              </defs>
            </svg>
            
            <div className="absolute top-2 left-2 text-[10px] text-muted-foreground bg-white/80 px-2 py-1 rounded pointer-events-none">
              Gray Grid = World (Static)
              <br/>
              Red/Green Axis = Local (Transformed)
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
        <span className="text-xs text-muted-foreground font-mono">{value.toFixed(1)}</span>
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

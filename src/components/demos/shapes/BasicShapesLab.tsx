'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

type ShapeType = 'rect' | 'circle' | 'ellipse' | 'line' | 'polyline' | 'polygon';

export function BasicShapesLab() {
  const [activeShape, setActiveShape] = useState<ShapeType>('rect');
  
  // Shape-specific parameters
  const [params, setParams] = useState({
    // rect
    x: 10, y: 10, width: 80, height: 60, rx: 0, ry: 0,
    // circle
    cx: 50, cy: 50, r: 40,
    // ellipse
    ex: 50, ey: 50, erx: 40, ery: 25,
    // line
    x1: 10, y1: 10, x2: 90, y2: 90,
    // polyline/polygon points
    points: "10,10 90,30 50,90"
  });

  // Common styles
  const [style, setStyle] = useState({
    fill: '#3b82f6',
    stroke: '#000000',
    strokeWidth: 2,
    fillOpacity: 1,
    strokeOpacity: 1
  });

  const updateParam = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const updateStyle = (key: string, value: any) => {
    setStyle(prev => ({ ...prev, [key]: value }));
  };

  const renderShape = () => {
    switch (activeShape) {
      case 'rect':
        return (
          <rect
            x={params.x}
            y={params.y}
            width={params.width}
            height={params.height}
            rx={params.rx}
            ry={params.ry}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fillOpacity={style.fillOpacity}
            strokeOpacity={style.strokeOpacity}
          />
        );
      case 'circle':
        return (
          <circle
            cx={params.cx}
            cy={params.cy}
            r={params.r}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fillOpacity={style.fillOpacity}
            strokeOpacity={style.strokeOpacity}
          />
        );
      case 'ellipse':
        return (
          <ellipse
            cx={params.ex}
            cy={params.ey}
            rx={params.erx}
            ry={params.ery}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fillOpacity={style.fillOpacity}
            strokeOpacity={style.strokeOpacity}
          />
        );
      case 'line':
        return (
          <line
            x1={params.x1}
            y1={params.y1}
            x2={params.x2}
            y2={params.y2}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeOpacity={style.strokeOpacity}
            strokeLinecap="round"
          />
        );
      case 'polyline':
        return (
          <polyline
            points={params.points}
            fill="none" // Usually polylines are not filled, but can be
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeOpacity={style.strokeOpacity}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
      case 'polygon':
        return (
          <polygon
            points={params.points}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fillOpacity={style.fillOpacity}
            strokeOpacity={style.strokeOpacity}
            strokeLinejoin="round"
          />
        );
    }
  };

  const renderCode = () => {
    let code = '';
    const commonAttrs = `
  fill="${style.fill}"
  stroke="${style.stroke}"
  stroke-width="${style.strokeWidth}"`;
    
    switch (activeShape) {
      case 'rect':
        code = `<rect 
  x="${params.x}" y="${params.y}" 
  width="${params.width}" height="${params.height}" 
  rx="${params.rx}" ry="${params.ry}"${commonAttrs}
/>`;
        break;
      case 'circle':
        code = `<circle 
  cx="${params.cx}" cy="${params.cy}" 
  r="${params.r}"${commonAttrs}
/>`;
        break;
      case 'ellipse':
        code = `<ellipse 
  cx="${params.ex}" cy="${params.ey}" 
  rx="${params.erx}" ry="${params.ery}"${commonAttrs}
/>`;
        break;
      case 'line':
        code = `<line 
  x1="${params.x1}" y1="${params.y1}" 
  x2="${params.x2}" y2="${params.y2}"
  stroke="${style.stroke}"
  stroke-width="${style.strokeWidth}"
/>`;
        break;
      case 'polyline':
        code = `<polyline 
  points="${params.points}"
  fill="none"
  stroke="${style.stroke}"
  stroke-width="${style.strokeWidth}"
/>`;
        break;
      case 'polygon':
        code = `<polygon 
  points="${params.points}"${commonAttrs}
/>`;
        break;
    }
    return code;
  };

  return (
    <div className="my-8 flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Basic Shapes Laboratory</h3>
        <p className="text-sm text-muted-foreground">
          Select a shape and tweak its parameters to see how the attributes work.
        </p>
      </div>

      {/* Shape Selector */}
      <div className="flex flex-wrap gap-2">
        {(['rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'] as ShapeType[]).map((s) => (
          <button
            key={s}
            onClick={() => setActiveShape(s)}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-full border transition-colors",
              activeShape === s 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-background hover:bg-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Geometry Attributes</h4>
            
            {activeShape === 'rect' && (
              <div className="grid grid-cols-2 gap-4">
                <Control label="x" value={params.x} onChange={v => updateParam('x', v)} max={100} />
                <Control label="y" value={params.y} onChange={v => updateParam('y', v)} max={100} />
                <Control label="width" value={params.width} onChange={v => updateParam('width', v)} max={100} />
                <Control label="height" value={params.height} onChange={v => updateParam('height', v)} max={100} />
                <Control label="rx (Round X)" value={params.rx} onChange={v => updateParam('rx', v)} max={50} />
                <Control label="ry (Round Y)" value={params.ry} onChange={v => updateParam('ry', v)} max={50} />
              </div>
            )}

            {activeShape === 'circle' && (
              <div className="grid grid-cols-2 gap-4">
                <Control label="cx (Center X)" value={params.cx} onChange={v => updateParam('cx', v)} max={100} />
                <Control label="cy (Center Y)" value={params.cy} onChange={v => updateParam('cy', v)} max={100} />
                <Control label="r (Radius)" value={params.r} onChange={v => updateParam('r', v)} max={50} />
              </div>
            )}

            {activeShape === 'ellipse' && (
              <div className="grid grid-cols-2 gap-4">
                <Control label="cx" value={params.ex} onChange={v => updateParam('ex', v)} max={100} />
                <Control label="cy" value={params.ey} onChange={v => updateParam('ey', v)} max={100} />
                <Control label="rx (Radius X)" value={params.erx} onChange={v => updateParam('erx', v)} max={50} />
                <Control label="ry (Radius Y)" value={params.ery} onChange={v => updateParam('ery', v)} max={50} />
              </div>
            )}

            {activeShape === 'line' && (
              <div className="grid grid-cols-2 gap-4">
                <Control label="x1 (Start X)" value={params.x1} onChange={v => updateParam('x1', v)} max={100} />
                <Control label="y1 (Start Y)" value={params.y1} onChange={v => updateParam('y1', v)} max={100} />
                <Control label="x2 (End X)" value={params.x2} onChange={v => updateParam('x2', v)} max={100} />
                <Control label="y2 (End Y)" value={params.y2} onChange={v => updateParam('y2', v)} max={100} />
              </div>
            )}

            {(activeShape === 'polyline' || activeShape === 'polygon') && (
              <div className="space-y-2">
                <label className="text-xs font-medium">Points (x,y pairs)</label>
                <input 
                  type="text" 
                  value={params.points}
                  onChange={(e) => updateParam('points', e.target.value)}
                  className="w-full rounded border bg-background px-2 py-1 text-sm font-mono"
                />
                <p className="text-[10px] text-muted-foreground">Try: 10,10 50,90 90,10</p>
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium text-sm border-b pb-2 mb-2">Appearance Attributes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">Fill Color</label>
                <input 
                  type="color" 
                  value={style.fill}
                  onChange={(e) => updateStyle('fill', e.target.value)}
                  className="h-8 w-full cursor-pointer rounded border p-0.5"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Stroke Color</label>
                <input 
                  type="color" 
                  value={style.stroke}
                  onChange={(e) => updateStyle('stroke', e.target.value)}
                  className="h-8 w-full cursor-pointer rounded border p-0.5"
                />
              </div>
              <Control label="Stroke Width" value={style.strokeWidth} onChange={v => updateStyle('strokeWidth', v)} max={20} step={0.5} />
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
                <pattern id="grid-shapes" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-shapes)" />
              
              {renderShape()}
            </svg>
          </div>
          
          <div className="rounded bg-zinc-950 p-4 text-xs text-zinc-50 overflow-x-auto font-mono">
            <pre>{renderCode()}</pre>
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

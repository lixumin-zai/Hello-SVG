'use client';

import { useState } from 'react';

export function RectCornerVisualizer() {
  const [rx, setRx] = useState(20);
  const [ry, setRy] = useState(20);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <p className="text-sm text-muted-foreground mb-4">▶ 拖动滑块观察 `rx` 和 `ry` 如何影响矩形的圆角，以及它们不相等时产生的椭圆效果。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="w-8 font-mono text-sm text-blue-500 font-bold">rx</label>
              <input type="range" min="0" max="100" value={rx} onChange={e => setRx(Number(e.target.value))} className="flex-1 accent-blue-500" />
              <span className="w-8 text-right text-sm font-mono">{rx}</span>
            </div>
            <p className="text-xs text-muted-foreground ml-11">控制圆角的水平半径</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="w-8 font-mono text-sm text-green-500 font-bold">ry</label>
              <input type="range" min="0" max="100" value={ry} onChange={e => setRy(Number(e.target.value))} className="flex-1 accent-green-500" />
              <span className="w-8 text-right text-sm font-mono">{ry}</span>
            </div>
            <p className="text-xs text-muted-foreground ml-11">控制圆角的垂直半径</p>
          </div>

          <div className="p-4 bg-muted rounded-lg border font-mono text-sm">
            <span className="text-pink-500">&lt;rect</span>
            <br />
            &nbsp;&nbsp;x="10" y="10" width="200" height="150"
            <br />
            &nbsp;&nbsp;<span className="text-blue-500 transition-colors">rx="{rx}"</span>
            <br />
            &nbsp;&nbsp;<span className="text-green-500 transition-colors">ry="{ry}"</span>
            <br />
            <span className="text-pink-500">/&gt;</span>
          </div>
        </div>

        <div className="relative bg-grid-slate-100 dark:bg-grid-slate-900 rounded-lg border flex items-center justify-center p-8 overflow-hidden min-h-[250px]">
          <svg viewBox="0 0 220 170" className="w-full max-w-[220px] overflow-visible drop-shadow-xl">
            {/* Draw grid lines for context */}
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/50" />
              </pattern>
            </defs>
            <rect width="220" height="170" fill="url(#smallGrid)" />
            
            {/* Main Rect */}
            <rect 
              x="10" 
              y="10" 
              width="200" 
              height="150" 
              rx={rx} 
              ry={ry} 
              fill="currentColor" 
              className="text-primary/20 stroke-primary transition-all duration-300 ease-out"
              strokeWidth="2"
            />

            {/* Corner Visualizer Tooltip for top-left */}
            {(rx > 0 || ry > 0) && (
              <g className="transition-all duration-300 ease-out">
                {/* Center of the ellipse for the corner */}
                <circle cx={10 + rx} cy={10 + ry} r="3" fill="currentColor" className="text-red-500 animate-pulse" />
                {/* rx line */}
                <line x1={10 + rx} y1={10 + ry} x2={10} y2={10 + ry} stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeDasharray="4" />
                {/* ry line */}
                <line x1={10 + rx} y1={10 + ry} x2={10 + rx} y2={10} stroke="currentColor" className="text-green-500" strokeWidth="2" strokeDasharray="4" />
                
                {/* Ellipse outline to show the actual geometry */}
                <ellipse cx={10 + rx} cy={10 + ry} rx={rx} ry={ry} fill="none" stroke="currentColor" className="text-red-500/30" strokeWidth="1" strokeDasharray="2" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

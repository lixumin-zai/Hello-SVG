'use client';

import { useState } from 'react';

export function ArcPlayground() {
  const [rx, setRx] = useState(80);
  const [ry, setRy] = useState(50);
  const [xAxisRotation, setXAxisRotation] = useState(0);
  const [largeArcFlag, setLargeArcFlag] = useState<0 | 1>(0);
  const [sweepFlag, setSweepFlag] = useState<0 | 1>(1);
  const [endX, setEndX] = useState(200);
  const [endY, setEndY] = useState(150);

  // Fixed start point
  const startX = 100;
  const startY = 150;

  const arcCommand = `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
  const fullPath = `M ${startX} ${startY} ${arcCommand}`;

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 调节参数，理解 SVG 中最复杂的 A (Arc) 命令的 7 个参数
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
            <h4 className="text-sm font-bold">1 & 2. 椭圆半径 (rx, ry)</h4>
            <div className="flex items-center gap-3">
              <label className="w-6 text-sm text-primary">rx</label>
              <input type="range" min="10" max="150" value={rx} onChange={e => setRx(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="w-8 text-right text-sm">{rx}</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-6 text-sm text-primary">ry</label>
              <input type="range" min="10" max="150" value={ry} onChange={e => setRy(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="w-8 text-right text-sm">{ry}</span>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
            <h4 className="text-sm font-bold">3. X 轴旋转角度 (x-axis-rotation)</h4>
            <div className="flex items-center gap-3">
              <input type="range" min="-90" max="90" value={xAxisRotation} onChange={e => setXAxisRotation(Number(e.target.value))} className="flex-1 accent-orange-500" />
              <span className="w-12 text-right text-sm">{xAxisRotation}°</span>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <h4 className="text-sm font-bold text-orange-600">4 & 5. 决定哪条弧线 (核心难点)</h4>
            <p className="text-xs text-muted-foreground">给定两点和半径，理论上可以画出 4 条不同的弧线。用这两个 Flag 来唯一确定：</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">大弧标志 (large-arc-flag)</span>
              <div className="flex gap-2 bg-background p-1 rounded-md border">
                <button onClick={() => setLargeArcFlag(0)} className={`px-3 py-1 text-xs rounded ${largeArcFlag === 0 ? 'bg-primary text-primary-foreground' : ''}`}>0 (小弧)</button>
                <button onClick={() => setLargeArcFlag(1)} className={`px-3 py-1 text-xs rounded ${largeArcFlag === 1 ? 'bg-primary text-primary-foreground' : ''}`}>1 (大弧)</button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">顺逆时针 (sweep-flag)</span>
              <div className="flex gap-2 bg-background p-1 rounded-md border">
                <button onClick={() => setSweepFlag(0)} className={`px-3 py-1 text-xs rounded ${sweepFlag === 0 ? 'bg-primary text-primary-foreground' : ''}`}>0 (逆时针)</button>
                <button onClick={() => setSweepFlag(1)} className={`px-3 py-1 text-xs rounded ${sweepFlag === 1 ? 'bg-primary text-primary-foreground' : ''}`}>1 (顺时针)</button>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
            <h4 className="text-sm font-bold">6 & 7. 终点坐标 (x, y)</h4>
            <div className="flex items-center gap-3">
              <label className="w-6 text-sm">x</label>
              <input type="range" min="50" max="250" value={endX} onChange={e => setEndX(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right text-sm">{endX}</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-6 text-sm">y</label>
              <input type="range" min="50" max="250" value={endY} onChange={e => setEndY(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right text-sm">{endY}</span>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-4 bg-muted rounded-lg border font-mono text-sm text-primary break-all">
            &lt;path d="M {startX} {startY} <strong>{arcCommand}</strong>" fill="none" stroke="blue" /&gt;
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] overflow-hidden bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0">
              {/* Show the other 3 possible arcs faintly */}
              <path d={`M ${startX} ${startY} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag === 1 ? 0 : 1} ${sweepFlag} ${endX} ${endY}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
              <path d={`M ${startX} ${startY} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag === 1 ? 0 : 1} ${endX} ${endY}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
              <path d={`M ${startX} ${startY} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag === 1 ? 0 : 1} ${sweepFlag === 1 ? 0 : 1} ${endX} ${endY}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />

              {/* The actual selected Arc */}
              <path 
                d={fullPath} 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="4" 
                strokeLinecap="round"
              />

              {/* Points */}
              <circle cx={startX} cy={startY} r="5" fill="#ef4444" />
              <text x={startX - 15} y={startY - 10} fontSize="12" fill="#ef4444" fontWeight="bold">起点</text>

              <circle cx={endX} cy={endY} r="5" fill="#10b981" />
              <text x={endX + 10} y={endY + 15} fontSize="12" fill="#10b981" fontWeight="bold">终点</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
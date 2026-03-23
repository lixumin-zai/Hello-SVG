'use client';

import React, { useState } from 'react';

export function MarkerLab() {
  const [refX, setRefX] = useState(10);
  const [refY, setRefY] = useState(5);
  const [markerWidth, setMarkerWidth] = useState(10);
  const [markerHeight, setMarkerHeight] = useState(10);
  const [markerUnits, setMarkerUnits] = useState<'strokeWidth' | 'userSpaceOnUse'>('strokeWidth');
  const [orient, setOrient] = useState('auto');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 拖动滑块或切换选项，观察箭头标记（Marker）如何响应不同的属性设置。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：预览区 */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
            {/* 网格背景 */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              <defs>
                <marker
                  id="arrow-marker"
                  viewBox="0 0 10 10"
                  refX={refX}
                  refY={refY}
                  markerWidth={markerWidth}
                  markerHeight={markerHeight}
                  markerUnits={markerUnits}
                  orient={orient}
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
                  {/* 显示锚点位置 (红色小圆点) */}
                  <circle cx={refX} cy={refY} r="0.5" fill="red" />
                </marker>
              </defs>

              {/* 辅助线 - 显示实际路径端点 */}
              <circle cx="50" cy="100" r="2" fill="red" opacity="0.5" />
              <circle cx="150" cy="50" r="2" fill="red" opacity="0.5" />

              {/* 主路径 */}
              <path
                d="M 50 100 Q 100 150 150 50"
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                markerEnd="url(#arrow-marker)"
                className="text-foreground"
              />
            </svg>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            注：红点表示路径的实际终点及 Marker 的 refX/refY 锚点。
          </div>
        </div>

        {/* 右侧：控制区 */}
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">位置对齐 (Alignment)</h3>
            <div className="grid grid-cols-[100px_1fr_40px] items-center gap-2 text-sm">
              <label>refX</label>
              <input type="range" min="0" max="10" step="0.5" value={refX} onChange={e => setRefX(Number(e.target.value))} className="accent-primary" />
              <span className="text-right font-mono">{refX}</span>
              
              <label>refY</label>
              <input type="range" min="0" max="10" step="0.5" value={refY} onChange={e => setRefY(Number(e.target.value))} className="accent-primary" />
              <span className="text-right font-mono">{refY}</span>
            </div>
          </div>

          <div className="h-px bg-border my-2" />

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">缩放与尺寸 (Scaling)</h3>
            
            <div className="flex flex-col gap-2 text-sm">
              <label className="font-medium">markerUnits (缩放基准)</label>
              <div className="flex bg-muted rounded-md p-1">
                <button 
                  className={`flex-1 py-1 px-2 rounded-sm transition-colors ${markerUnits === 'strokeWidth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setMarkerUnits('strokeWidth')}
                >
                  strokeWidth
                </button>
                <button 
                  className={`flex-1 py-1 px-2 rounded-sm transition-colors ${markerUnits === 'userSpaceOnUse' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setMarkerUnits('userSpaceOnUse')}
                >
                  userSpaceOnUse
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr_40px] items-center gap-2 text-sm">
              <label>路径线宽</label>
              <input type="range" min="1" max="10" step="1" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="accent-primary" />
              <span className="text-right font-mono">{strokeWidth}</span>
            </div>
          </div>

          <div className="h-px bg-border my-2" />

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">方向与旋转 (Orientation)</h3>
            <div className="flex flex-col gap-2 text-sm">
              <label className="font-medium">orient (朝向)</label>
              <select 
                value={orient} 
                onChange={e => setOrient(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="auto">auto (跟随路径切线)</option>
                <option value="auto-start-reverse">auto-start-reverse</option>
                <option value="0">0 (固定水平)</option>
                <option value="90">90 (固定垂直向右转)</option>
                <option value="180">180 (反向)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

export function GradientStopVisualizer() {
  const [stops, setStops] = useState([
    { id: 's1', offset: 0, color: '#3b82f6', opacity: 1, label: '起点', colorCls: 'blue' },
    { id: 's2', offset: 50, color: '#10b981', opacity: 0.5, label: '中间点', colorCls: 'emerald' },
    { id: 's3', offset: 100, color: '#ef4444', opacity: 1, label: '终点', colorCls: 'rose' },
  ]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const updateStop = (id: string, key: string, value: number | string) => {
    setStops(stops.map(s => s.id === id ? { ...s, [key]: value } : s));
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500',
    emerald: 'bg-emerald-500/20 border-emerald-500',
    rose: 'bg-rose-500/20 border-rose-500',
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-6">
        🎛️ 拖动滑块调整 <code>offset</code> 和 <code>opacity</code>，或者将鼠标悬停在代码行上观察对应节点
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 左侧：可视化与控制面板 */}
        <div className="space-y-6">
          {/* 渐变预览 */}
          <div className="rounded-lg border overflow-hidden relative h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlIi8+PHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==')]">
            <svg width="100%" height="100%">
              <defs>
                <linearGradient id="visualizerGrad">
                  {stops.sort((a, b) => a.offset - b.offset).map(s => (
                    <stop key={s.id} offset={`${s.offset}%`} stopColor={s.color} stopOpacity={s.opacity} />
                  ))}
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#visualizerGrad)" />
            </svg>
            
            {/* 指示器 */}
            {stops.map(s => (
              <div
                key={`indicator-${s.id}`}
                className={`absolute top-0 bottom-0 w-0.5 transition-all duration-200 z-10 ${hoveredId === s.id ? 'bg-foreground' : 'bg-transparent'}`}
                style={{ left: `${s.offset}%` }}
              >
                <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white transition-transform duration-200 ${hoveredId === s.id ? 'scale-150' : 'scale-100'}`} style={{ backgroundColor: s.color, opacity: Math.max(0.2, s.opacity) }} />
              </div>
            ))}
          </div>

          {/* 控制器 */}
          <div className="space-y-4">
            {stops.map(s => (
              <div 
                key={s.id} 
                className={`p-3 rounded-lg border transition-all duration-200 ${hoveredId === s.id ? colorMap[s.colorCls] : 'bg-muted/30 border-transparent'}`}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></span>
                    <span className="text-sm font-semibold">{s.label}</span>
                  </div>
                  <input type="color" value={s.color} onChange={e => updateStop(s.id, 'color', e.target.value)} className="w-6 h-6 p-0 border-0 rounded cursor-pointer" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs w-16 text-muted-foreground">offset</label>
                    <input type="range" min="0" max="100" value={s.offset} onChange={e => updateStop(s.id, 'offset', Number(e.target.value))} className="flex-1 accent-primary" />
                    <span className="text-xs font-mono w-10 text-right">{s.offset}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs w-16 text-muted-foreground">opacity</label>
                    <input type="range" min="0" max="1" step="0.05" value={s.opacity} onChange={e => updateStop(s.id, 'opacity', Number(e.target.value))} className="flex-1 accent-primary" />
                    <span className="text-xs font-mono w-10 text-right">{s.opacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：代码联动 */}
        <div className="flex flex-col">
          <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto flex-1 border border-border">
            <div className="text-muted-foreground mb-2">&lt;linearGradient id="myGrad"&gt;</div>
            {stops.sort((a, b) => a.offset - b.offset).map(s => (
              <div 
                key={`code-${s.id}`}
                className={`pl-4 py-1 -mx-2 px-2 rounded transition-all duration-200 cursor-default border-l-2 ${hoveredId === s.id ? colorMap[s.colorCls] : 'border-transparent hover:bg-muted-foreground/10'}`}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                &lt;stop <br className="sm:hidden" />
                <span className="text-blue-500 dark:text-blue-400">offset</span>="{s.offset}%" <br className="sm:hidden" />
                <span className="text-emerald-500 dark:text-emerald-400">stop-color</span>="{s.color}" <br className="sm:hidden" />
                {s.opacity < 1 && <><span className="text-amber-500 dark:text-amber-400">stop-opacity</span>="{s.opacity}"</>}
                /&gt;
              </div>
            ))}
            <div className="text-muted-foreground mt-2">&lt;/linearGradient&gt;</div>
          </pre>
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span>💡</span> stop 节点属性解析
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="text-xs text-foreground bg-muted px-1 py-0.5 rounded">offset</code>: 颜色出现的位置，支持百分比或 0-1 小数。</li>
              <li><code className="text-xs text-foreground bg-muted px-1 py-0.5 rounded">stop-color</code>: 节点的颜色值。</li>
              <li><code className="text-xs text-foreground bg-muted px-1 py-0.5 rounded">stop-opacity</code>: 节点颜色的透明度，常用于制作渐隐效果。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

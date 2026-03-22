'use client';

import { useState } from 'react';

export function MarkerLab() {
  const [activeTab, setActiveTab] = useState<'arrow' | 'chart' | 'orient'>('arrow');

  // Arrow States
  const [markerWidth, setMarkerWidth] = useState(10);
  const [markerHeight, setMarkerHeight] = useState(10);
  const [refX, setRefX] = useState(9);
  const [refY, setRefY] = useState(5);
  const [pathStrokeWidth, setPathStrokeWidth] = useState(2);
  const [markerUnits, setMarkerUnits] = useState<'strokeWidth' | 'userSpaceOnUse'>('strokeWidth');

  // Orient States
  const [orient, setOrient] = useState<'auto' | 'auto-start-reverse' | '0' | '90'>('auto');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('arrow')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'arrow' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          🏹 制作箭头 (refX/Y 陷阱)
        </button>
        <button 
          onClick={() => setActiveTab('orient')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'orient' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          🔄 方向控制 (orient)
        </button>
        <button 
          onClick={() => setActiveTab('chart')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'chart' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          📈 折线图实战
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'arrow' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
                <h4 className="text-sm font-bold text-orange-600 mb-2">对齐锚点 (refX, refY)</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  决定了 Marker 内部坐标系的哪个点要与目标路径的端点重合。如果箭头偏离了线条，一定是这里没设对！
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-orange-600 font-bold">refX: {refX}</label>
                    <input type="range" min="0" max={markerWidth} value={refX} onChange={e => setRefX(Number(e.target.value))} className="accent-orange-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-orange-600 font-bold">refY: {refY}</label>
                    <input type="range" min="0" max={markerHeight} value={refY} onChange={e => setRefY(Number(e.target.value))} className="accent-orange-500" />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/30">
                <h4 className="text-sm font-bold text-blue-600 mb-2">相对尺寸 (markerUnits)</h4>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setMarkerUnits('strokeWidth')} className={`flex-1 py-1 text-[10px] rounded border ${markerUnits === 'strokeWidth' ? 'bg-blue-500 text-white' : 'bg-background'}`}>strokeWidth</button>
                  <button onClick={() => setMarkerUnits('userSpaceOnUse')} className={`flex-1 py-1 text-[10px] rounded border ${markerUnits === 'userSpaceOnUse' ? 'bg-blue-500 text-white' : 'bg-background'}`}>userSpaceOnUse</button>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-xs w-24">改变线条粗细:</label>
                  <input type="range" min="1" max="10" value={pathStrokeWidth} onChange={e => setPathStrokeWidth(Number(e.target.value))} className="flex-1 accent-blue-500" />
                  <span className="text-xs font-mono">{pathStrokeWidth}px</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {markerUnits === 'strokeWidth' 
                    ? "当前：箭头大小会随着线条变粗而自动等比放大（推荐！）" 
                    : "当前：箭头大小是绝对的，不管线条多粗，箭头永远一样大。"}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'orient' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/30">
                <h4 className="text-sm font-bold mb-3">朝向 (orient)</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={orient === 'auto'} onChange={() => setOrient('auto')} className="accent-primary" />
                    <span><strong>auto</strong> (自动跟随曲线切线方向)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={orient === 'auto-start-reverse'} onChange={() => setOrient('auto-start-reverse')} className="accent-primary" />
                    <span><strong>auto-start-reverse</strong> (起点反向，常用于双向箭头)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={orient === '0'} onChange={() => setOrient('0')} className="accent-primary" />
                    <span><strong>0</strong> (写死角度：永远朝右)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={orient === '90'} onChange={() => setOrient('90')} className="accent-primary" />
                    <span><strong>90</strong> (写死角度：永远朝下)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-green-500/10 border-green-500/30">
                <h4 className="text-sm font-bold text-green-600 mb-2">marker-mid 实战</h4>
                <p className="text-xs text-muted-foreground">
                  除了起点 (<code>marker-start</code>) 和终点 (<code>marker-end</code>)，SVG 还能自动在路径的每一个内部转折点上打标记 (<code>marker-mid</code>)。
                  这在画折线图数据点时简直是神器，完全不需要手动去算每个圆圈的 cx/cy！
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[10px] text-primary whitespace-pre overflow-x-auto h-32">
{activeTab === 'arrow' ? `<defs>
  <marker id="arrow" 
    markerWidth="${markerWidth}" markerHeight="${markerHeight}" 
    refX="${refX}" refY="${refY}" 
    orient="auto" markerUnits="${markerUnits}"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
  </marker>
</defs>

<line x1="50" y1="150" x2="250" y2="150" 
  stroke-width="${pathStrokeWidth}" marker-end="url(#arrow)" />` : ''}

{activeTab === 'orient' ? `<marker id="arrow" orient="${orient}" ...>
  <path d="M 0 0 L 10 5 L 0 10 z" />
</marker>

<path d="M 50 200 C 100 50, 200 50, 250 200" 
  marker-start="url(#arrow)" 
  marker-end="url(#arrow)" />` : ''}

{activeTab === 'chart' ? `<marker id="dot" refX="5" refY="5" ...>
  <circle cx="5" cy="5" r="5" fill="green" />
</marker>

<!-- 只需要一条 polyline，数据点自动加上！ -->
<polyline points="20,200 80,100 150,150 220,50 280,120"
  fill="none" stroke="green"
  marker-start="url(#dot)"
  marker-mid="url(#dot)"
  marker-end="url(#dot)" />` : ''}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <defs>
                {/* Arrow Marker for Tab 1 */}
                <marker id="demoArrow" viewBox={`0 0 ${markerWidth} ${markerHeight}`} markerWidth={markerWidth} markerHeight={markerHeight} refX={refX} refY={refY} orient="auto" markerUnits={markerUnits}>
                  {/* The actual triangle shape */}
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                  
                  {/* Visualization of the ref point inside the marker */}
                  {activeTab === 'arrow' && (
                    <>
                      <line x1={refX} y1="0" x2={refX} y2="10" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1" />
                      <line x1="0" y1={refY} x2="10" y2={refY} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1" />
                      <circle cx={refX} cy={refY} r="1" fill="#3b82f6" />
                    </>
                  )}
                </marker>

                {/* Arrow Marker for Tab 2 */}
                <marker id="orientArrow" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient={orient}>
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                </marker>

                {/* Dot Marker for Tab 3 */}
                <marker id="chartDot" viewBox="0 0 10 10" markerWidth="6" markerHeight="6" refX="5" refY="5">
                  <circle cx="5" cy="5" r="4" fill="white" stroke="#22c55e" strokeWidth="2" />
                </marker>
              </defs>

              {activeTab === 'arrow' && (
                <g>
                  {/* The Line */}
                  <line 
                    x1="50" y1="150" x2="200" y2="150" 
                    stroke="currentColor" 
                    strokeWidth={pathStrokeWidth} 
                    markerEnd="url(#demoArrow)" 
                  />
                  
                  {/* Visualize the actual end point of the line */}
                  <circle cx="200" cy="150" r="3" fill="#3b82f6" />
                  <text x="200" y="130" fontSize="10" fill="#3b82f6" textAnchor="middle">线条终点</text>
                  <path d="M 200 135 L 200 145" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#demoArrow)" opacity="0.5" />
                </g>
              )}

              {activeTab === 'orient' && (
                <g>
                  <path 
                    d="M 50 200 C 100 50, 200 50, 250 200" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    markerStart="url(#orientArrow)"
                    markerEnd="url(#orientArrow)"
                  />
                  <text x="150" y="250" fontSize="12" fill="currentColor" textAnchor="middle" opacity="0.5">
                    观察起点和终点的箭头朝向
                  </text>
                </g>
              )}

              {activeTab === 'chart' && (
                <g transform="translate(0, 50)">
                  <polyline 
                    points="30,150 90,50 150,100 210,20 270,120" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="3"
                    strokeLinejoin="round"
                    markerStart="url(#chartDot)"
                    markerMid="url(#chartDot)"
                    markerEnd="url(#chartDot)"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

export function GradientPlayground() {
  const [activeTab, setActiveTab] = useState<'linear' | 'radial'>('linear');

  // Linear Gradient States
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(100);
  const [y2, setY2] = useState(0);

  // Radial Gradient States
  const [cx, setCx] = useState(50);
  const [cy, setCy] = useState(50);
  const [r, setR] = useState(50);
  const [fx, setFx] = useState(50);
  const [fy, setFy] = useState(50);

  // Shared States
  const [spreadMethod, setSpreadMethod] = useState<'pad' | 'reflect' | 'repeat'>('pad');
  
  // Stops
  const [stops, setStops] = useState([
    { id: 1, offset: 0, color: '#3b82f6', opacity: 1 },
    { id: 2, offset: 100, color: '#ef4444', opacity: 1 },
  ]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('linear')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'linear' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;linearGradient&gt; 线性渐变
        </button>
        <button 
          onClick={() => setActiveTab('radial')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'radial' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;radialGradient&gt; 径向渐变
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'linear' ? (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
              <h4 className="text-sm font-bold">方向向量 (x1,y1 → x2,y2)</h4>
              <p className="text-xs text-muted-foreground mb-2">默认使用百分比 (0~100%)，代表相对于图形包围盒的坐标。</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs w-4">x1</label>
                  <input type="range" min="0" max="100" value={x1} onChange={e => setX1(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-6">{x1}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-4">y1</label>
                  <input type="range" min="0" max="100" value={y1} onChange={e => setY1(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-6">{y1}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-4">x2</label>
                  <input type="range" min="0" max="100" value={x2} onChange={e => setX2(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-6">{x2}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-4">y2</label>
                  <input type="range" min="0" max="100" value={y2} onChange={e => setY2(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-6">{y2}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
              <h4 className="text-sm font-bold">中心点与焦点</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20">半径 (r)</label>
                  <input type="range" min="10" max="100" value={r} onChange={e => setR(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-8">{r}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20">中心点 (cx,cy)</label>
                  <input type="range" min="0" max="100" value={cx} onChange={e => setCx(Number(e.target.value))} className="w-1/3 accent-primary" />
                  <input type="range" min="0" max="100" value={cy} onChange={e => setCy(Number(e.target.value))} className="w-1/3 accent-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20 text-orange-500 font-bold">焦点 (fx,fy)</label>
                  <input type="range" min="0" max="100" value={fx} onChange={e => setFx(Number(e.target.value))} className="w-1/3 accent-orange-500" />
                  <input type="range" min="0" max="100" value={fy} onChange={e => setFy(Number(e.target.value))} className="w-1/3 accent-orange-500" />
                </div>
                <p className="text-[10px] text-orange-600 leading-tight">
                  * 焦点 (fx,fy) 是渐变最内部颜色（0%）开始的地方。如果焦点偏离中心点，可以做出逼真的**球体立体高光**效果。
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-bold">扩展模式 (spreadMethod)</label>
            <div className="flex gap-2">
              {(['pad', 'reflect', 'repeat'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSpreadMethod(type)}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${spreadMethod === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground h-4">
              当渐变没有覆盖整个图形（比如方向向量只到 50%）时，决定剩余区域如何填充。
            </p>
          </div>

        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto">
{`<defs>
  <${activeTab === 'linear' ? 'linearGradient' : 'radialGradient'} id="myGrad" ${activeTab === 'linear' ? `x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%"` : `cx="${cx}%" cy="${cy}%" r="${r}%" fx="${fx}%" fy="${fy}%"`} spreadMethod="${spreadMethod}">
    <stop offset="0%" stop-color="${stops[0].color}" />
    <stop offset="100%" stop-color="${stops[1].color}" />
  </${activeTab === 'linear' ? 'linearGradient' : 'radialGradient'}>
</defs>

<rect fill="url(#myGrad)" ... />`}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] flex items-center justify-center bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <defs>
                {activeTab === 'linear' ? (
                  <linearGradient id="demoGrad" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} spreadMethod={spreadMethod}>
                    <stop offset="0%" stopColor={stops[0].color} stopOpacity={stops[0].opacity} />
                    <stop offset="100%" stopColor={stops[1].color} stopOpacity={stops[1].opacity} />
                  </linearGradient>
                ) : (
                  <radialGradient id="demoGrad" cx={`${cx}%`} cy={`${cy}%`} r={`${r}%`} fx={`${fx}%`} fy={`${fy}%`} spreadMethod={spreadMethod}>
                    <stop offset="0%" stopColor={stops[0].color} stopOpacity={stops[0].opacity} />
                    <stop offset="100%" stopColor={stops[1].color} stopOpacity={stops[1].opacity} />
                  </radialGradient>
                )}
              </defs>

              {/* The Shape with Gradient */}
              <rect x="50" y="50" width="200" height="200" rx="20" fill="url(#demoGrad)" stroke="#1e293b" strokeWidth="2" />
              
              {/* Visualizing the Vectors */}
              {activeTab === 'linear' ? (
                <g transform="translate(50, 50)">
                  <line x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="white" strokeWidth="2" strokeDasharray="4" style={{ mixBlendMode: 'difference' }} />
                  <circle cx={`${x1}%`} cy={`${y1}%`} r="4" fill="white" />
                  <text x={`${x1}%`} y={`${y1}%`} dy="-8" dx="-8" fontSize="10" fill="white" style={{ mixBlendMode: 'difference' }}>起点</text>
                  <circle cx={`${x2}%`} cy={`${y2}%`} r="4" fill="white" />
                  <text x={`${x2}%`} y={`${y2}%`} dy="14" dx="8" fontSize="10" fill="white" style={{ mixBlendMode: 'difference' }}>终点</text>
                </g>
              ) : (
                <g transform="translate(50, 50)">
                  <circle cx={`${cx}%`} cy={`${cy}%`} r={`${r}%`} fill="none" stroke="white" strokeWidth="1" strokeDasharray="4" style={{ mixBlendMode: 'difference' }} />
                  <circle cx={`${cx}%`} cy={`${cy}%`} r="4" fill="white" />
                  <text x={`${cx}%`} y={`${cy}%`} dy="-8" dx="-8" fontSize="10" fill="white" style={{ mixBlendMode: 'difference' }}>cx,cy</text>
                  
                  <circle cx={`${fx}%`} cy={`${fy}%`} r="4" fill="#f97316" />
                  <text x={`${fx}%`} y={`${fy}%`} dy="14" dx="8" fontSize="10" fill="#f97316" fontWeight="bold">fx,fy</text>
                </g>
              )}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
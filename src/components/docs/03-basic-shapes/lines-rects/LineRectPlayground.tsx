'use client';

import { useState } from 'react';

export function LineRectPlayground() {
  const [activeTab, setActiveTab] = useState<'line' | 'polyline' | 'rect'>('line');

  // Line states
  const [x1, setX1] = useState(50);
  const [y1, setY1] = useState(50);
  const [x2, setX2] = useState(250);
  const [y2, setY2] = useState(150);

  // Polyline states
  const [points, setPoints] = useState("50,150 100,50 150,150 200,50 250,150");
  const [fill, setFill] = useState('none');

  // Rect states
  const [rectX, setRectX] = useState(50);
  const [rectY, setRectY] = useState(50);
  const [rectW, setRectW] = useState(200);
  const [rectH, setRectH] = useState(100);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('line')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'line' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;line&gt; 直线
        </button>
        <button 
          onClick={() => setActiveTab('polyline')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'polyline' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;polyline&gt; 折线
        </button>
        <button 
          onClick={() => setActiveTab('rect')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'rect' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;rect&gt; 矩形
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4">
          {activeTab === 'line' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">x1</label>
                  <input type="range" min="0" max="300" value={x1} onChange={e => setX1(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{x1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">y1</label>
                  <input type="range" min="0" max="200" value={y1} onChange={e => setY1(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{y1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">x2</label>
                  <input type="range" min="0" max="300" value={x2} onChange={e => setX2(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{x2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">y2</label>
                  <input type="range" min="0" max="200" value={y2} onChange={e => setY2(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{y2}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg border font-mono text-sm text-primary">
                {`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" />`}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>注意：</strong>只有 x 和 y 属性是不够的！直线没有内部面积，如果不设置 <code>stroke</code> (描边颜色)，你将什么都看不见。
              </p>
            </>
          )}

          {activeTab === 'polyline' && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">points (点坐标集合，用空格或逗号分隔)</label>
                  <textarea 
                    value={points}
                    onChange={e => setPoints(e.target.value)}
                    className="w-full p-2 bg-background border rounded-md font-mono text-sm"
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">fill (填充色)</label>
                  <select 
                    value={fill} 
                    onChange={e => setFill(e.target.value)}
                    className="p-1 bg-background border rounded-md text-sm"
                  >
                    <option value="none">none (无填充)</option>
                    <option value="rgba(59, 130, 246, 0.2)">蓝色半透明</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg border font-mono text-sm text-primary overflow-x-auto">
                {`<polyline points="${points}" stroke="black" fill="${fill}" />`}
              </div>
            </>
          )}

          {activeTab === 'rect' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="w-12 font-mono text-sm">x</label>
                  <input type="range" min="0" max="200" value={rectX} onChange={e => setRectX(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{rectX}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-12 font-mono text-sm">y</label>
                  <input type="range" min="0" max="150" value={rectY} onChange={e => setRectY(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{rectY}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-12 font-mono text-sm">width</label>
                  <input type="range" min="10" max="250" value={rectW} onChange={e => setRectW(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{rectW}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-12 font-mono text-sm">height</label>
                  <input type="range" min="10" max="150" value={rectH} onChange={e => setRectH(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{rectH}</span>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <label className="w-12 font-mono text-sm text-orange-500">rx</label>
                  <input type="range" min="0" max="100" value={rx} onChange={e => setRx(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="w-8 text-right text-sm">{rx}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-12 font-mono text-sm text-orange-500">ry</label>
                  <input type="range" min="0" max="100" value={ry} onChange={e => setRy(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="w-8 text-right text-sm">{ry}</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg border font-mono text-sm text-primary">
                {`<rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}" ${rx > 0 ? `rx="${rx}" ` : ''}${ry > 0 ? `ry="${ry}" ` : ''}/>`}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                如果只设置 rx，ry 会自动等于 rx（产生正圆角）。如果两者不同，会产生椭圆角。
              </p>
            </>
          )}
        </div>

        {/* Canvas Display */}
        <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[250px] overflow-hidden bg-background">
          <svg width="100%" height="100%" viewBox="0 0 300 200" className="absolute inset-0">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Rendering Shape */}
            {activeTab === 'line' && (
              <>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx={x1} cy={y1} r="4" fill="#ef4444" />
                <circle cx={x2} cy={y2} r="4" fill="#3b82f6" />
                <text x={x1} y={y1-10} fontSize="12" fill="#ef4444" textAnchor="middle">P1</text>
                <text x={x2} y={y2-10} fontSize="12" fill="#3b82f6" textAnchor="middle">P2</text>
              </>
            )}

            {activeTab === 'polyline' && (
              <polyline 
                points={points} 
                stroke="currentColor" 
                strokeWidth="4" 
                fill={fill} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}

            {activeTab === 'rect' && (
              <rect 
                x={rectX} 
                y={rectY} 
                width={rectW} 
                height={rectH} 
                rx={rx} 
                ry={ry} 
                fill="rgba(16, 185, 129, 0.8)" 
                stroke="currentColor" 
                strokeWidth="2" 
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
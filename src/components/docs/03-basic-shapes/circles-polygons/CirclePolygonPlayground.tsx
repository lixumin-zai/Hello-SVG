'use client';

import { useState } from 'react';

export function CirclePolygonPlayground() {
  const [activeTab, setActiveTab] = useState<'circle' | 'ellipse' | 'polygon'>('circle');

  // Circle states
  const [cx, setCx] = useState(150);
  const [cy, setCy] = useState(100);
  const [r, setR] = useState(60);

  // Ellipse states
  const [rx, setRx] = useState(80);
  const [ry, setRy] = useState(40);

  // Polygon states
  const [sides, setSides] = useState(5);
  const [radius, setPolyRadius] = useState(80);
  const [fillMode, setFillMode] = useState<'solid' | 'outline'>('solid');

  // Calculate polygon points based on sides and radius
  const getPolygonPoints = () => {
    const points = [];
    const centerX = 150;
    const centerY = 100;
    for (let i = 0; i < sides; i++) {
      // Start from top (-PI/2) and go clockwise
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('circle')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'circle' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;circle&gt; 圆形
        </button>
        <button 
          onClick={() => setActiveTab('ellipse')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'ellipse' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;ellipse&gt; 椭圆
        </button>
        <button 
          onClick={() => setActiveTab('polygon')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'polygon' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;polygon&gt; 多边形
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4">
          {activeTab === 'circle' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">cx</label>
                  <input type="range" min="0" max="300" value={cx} onChange={e => setCx(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{cx}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">cy</label>
                  <input type="range" min="0" max="200" value={cy} onChange={e => setCy(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{cy}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">r</label>
                  <input type="range" min="10" max="100" value={r} onChange={e => setR(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{r}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg border font-mono text-sm text-primary">
                {`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3b82f6" />`}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                注意：圆形的 <code>cx</code> 和 <code>cy</code> 定义的是<strong>中心点</strong>的坐标，这与 <code>&lt;rect&gt;</code> 定义左上角完全不同！
              </p>
            </>
          )}

          {activeTab === 'ellipse' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">cx</label>
                  <input type="range" min="0" max="300" value={cx} onChange={e => setCx(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{cx}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm">cy</label>
                  <input type="range" min="0" max="200" value={cy} onChange={e => setCy(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{cy}</span>
                </div>
                <div className="flex items-center gap-3 border-t pt-2 mt-2">
                  <label className="w-8 font-mono text-sm text-orange-500">rx</label>
                  <input type="range" min="10" max="150" value={rx} onChange={e => setRx(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="w-8 text-right text-sm">{rx}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-8 font-mono text-sm text-orange-500">ry</label>
                  <input type="range" min="10" max="100" value={ry} onChange={e => setRy(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="w-8 text-right text-sm">{ry}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg border font-mono text-sm text-primary">
                {`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#10b981" />`}
              </div>
            </>
          )}

          {activeTab === 'polygon' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="w-16 font-mono text-sm">边数</label>
                  <input type="range" min="3" max="12" value={sides} onChange={e => setSides(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{sides}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-16 font-mono text-sm">外接半径</label>
                  <input type="range" min="20" max="100" value={radius} onChange={e => setPolyRadius(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{radius}</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <label className="w-16 text-sm">样式</label>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1 text-sm cursor-pointer">
                      <input type="radio" checked={fillMode === 'solid'} onChange={() => setFillMode('solid')} /> 填充
                    </label>
                    <label className="flex items-center gap-1 text-sm cursor-pointer">
                      <input type="radio" checked={fillMode === 'outline'} onChange={() => setFillMode('outline')} /> 描边
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg border font-mono text-xs text-primary overflow-y-auto max-h-24 break-all">
                {`<polygon points="${getPolygonPoints()}" ${fillMode === 'solid' ? 'fill="#f59e0b"' : 'fill="none" stroke="#f59e0b" stroke-width="4"'} />`}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>关键区别：</strong><code>&lt;polygon&gt;</code> 的语法与 <code>&lt;polyline&gt;</code> 完全相同，唯一的区别是 <strong>polygon 会自动将最后一个点和第一个点连接起来，形成闭合图形</strong>。
              </p>
            </>
          )}
        </div>

        {/* Canvas Display */}
        <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[250px] overflow-hidden bg-background">
          <svg width="100%" height="100%" viewBox="0 0 300 200" className="absolute inset-0">
            {/* Grid */}
            <defs>
              <pattern id="grid2" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />

            {/* Rendering Shape */}
            {activeTab === 'circle' && (
              <>
                <circle cx={cx} cy={cy} r={r} fill="rgba(59, 130, 246, 0.8)" stroke="#1d4ed8" strokeWidth="2" />
                {/* Center dot */}
                <circle cx={cx} cy={cy} r="3" fill="black" />
                <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="black" strokeDasharray="4" />
                <text x={cx + r/2} y={cy - 5} fontSize="12" textAnchor="middle">r</text>
              </>
            )}

            {activeTab === 'ellipse' && (
              <>
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(16, 185, 129, 0.8)" stroke="#047857" strokeWidth="2" />
                {/* Center dot */}
                <circle cx={cx} cy={cy} r="3" fill="black" />
                {/* rx axis */}
                <line x1={cx} y1={cy} x2={cx + rx} y2={cy} stroke="black" strokeDasharray="4" />
                <text x={cx + rx/2} y={cy - 5} fontSize="12" textAnchor="middle">rx</text>
                {/* ry axis */}
                <line x1={cx} y1={cy} x2={cx} y2={cy - ry} stroke="black" strokeDasharray="4" />
                <text x={cx + 5} y={cy - ry/2} fontSize="12" alignmentBaseline="middle">ry</text>
              </>
            )}

            {activeTab === 'polygon' && (
              <>
                {/* Visualize the bounding circle */}
                <circle cx="150" cy="100" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4" />
                
                <polygon 
                  points={getPolygonPoints()} 
                  fill={fillMode === 'solid' ? "rgba(245, 158, 11, 0.8)" : "none"} 
                  stroke="#d97706" 
                  strokeWidth={fillMode === 'outline' ? 4 : 2} 
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

export function TransformBasicPlayground() {
  const [activeTab, setActiveTab] = useState<'translate' | 'rotate' | 'scale' | 'skew'>('translate');

  // Translate
  const [tx, setTx] = useState(50);
  const [ty, setTy] = useState(20);

  // Rotate
  const [angle, setAngle] = useState(45);
  const [cx, setCx] = useState(150); // Center of rotation
  const [cy, setCy] = useState(150);
  const [useCenter, setUseCenter] = useState(false); // Whether to specify cx/cy

  // Scale
  const [sx, setSx] = useState(1.5);
  const [sy, setSy] = useState(1.5);

  // Skew
  const [skewX, setSkewX] = useState(20);
  const [skewY, setSkewY] = useState(0);

  // For the target shape
  const rectX = 100;
  const rectY = 100;
  const rectW = 100;
  const rectH = 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {(['translate', 'rotate', 'scale', 'skew'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {activeTab === 'translate' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm">平移 (Translate)</h4>
              <div className="flex items-center gap-3">
                <label className="w-6 text-sm">tx</label>
                <input type="range" min="-100" max="200" value={tx} onChange={e => setTx(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{tx}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-6 text-sm">ty</label>
                <input type="range" min="-100" max="200" value={ty} onChange={e => setTy(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{ty}</span>
              </div>
              <div className="p-3 bg-muted rounded border font-mono text-xs text-primary">
                {`transform="translate(${tx} ${ty})"`}
              </div>
            </div>
          )}

          {activeTab === 'rotate' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm">旋转 (Rotate)</h4>
              <div className="flex items-center gap-3">
                <label className="w-10 text-sm">角度</label>
                <input type="range" min="-180" max="180" value={angle} onChange={e => setAngle(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{angle}°</span>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg space-y-3">
                <h5 className="font-bold text-xs text-orange-600">旋转中心点问题 (核心难点)</h5>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={useCenter} onChange={e => setUseCenter(e.target.checked)} className="accent-orange-500" />
                  指定旋转中心 (cx, cy)
                </label>
                <p className="text-[10px] text-muted-foreground">
                  SVG 默认永远以画布左上角 <code>(0,0)</code> 为中心旋转！要以自身为中心旋转，必须传入第 2 和第 3 个参数。
                </p>
                
                {useCenter && (
                  <div className="pt-2 space-y-2 border-t border-orange-500/20">
                    <div className="flex items-center gap-3">
                      <label className="w-6 text-sm text-orange-600">cx</label>
                      <input type="range" min="0" max="300" value={cx} onChange={e => setCx(Number(e.target.value))} className="flex-1 accent-orange-500" />
                      <span className="w-8 text-right text-sm text-orange-600">{cx}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="w-6 text-sm text-orange-600">cy</label>
                      <input type="range" min="0" max="300" value={cy} onChange={e => setCy(Number(e.target.value))} className="flex-1 accent-orange-500" />
                      <span className="w-8 text-right text-sm text-orange-600">{cy}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-muted rounded border font-mono text-xs text-primary">
                {`transform="rotate(${angle}${useCenter ? ` ${cx} ${cy}` : ''})"`}
              </div>
            </div>
          )}

          {activeTab === 'scale' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm">缩放 (Scale)</h4>
              <p className="text-[10px] text-muted-foreground">注意：缩放同样默认以 (0,0) 为中心点！如果图形不在左上角，放大时它会向右下角"跑走"。</p>
              
              <div className="flex items-center gap-3">
                <label className="w-6 text-sm">sx</label>
                <input type="range" min="-2" max="3" step="0.1" value={sx} onChange={e => setSx(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{sx}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-6 text-sm">sy</label>
                <input type="range" min="-2" max="3" step="0.1" value={sy} onChange={e => setSy(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{sy}</span>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-700">
                <strong>镜像技巧：</strong> 尝试把 sx 或 sy 设为负数（如 -1），图形就会翻转！
              </div>

              <div className="p-3 bg-muted rounded border font-mono text-xs text-primary">
                {`transform="scale(${sx} ${sy})"`}
              </div>
            </div>
          )}

          {activeTab === 'skew' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm">倾斜 (Skew)</h4>
              <div className="flex items-center gap-3">
                <label className="w-10 text-sm">skewX</label>
                <input type="range" min="-60" max="60" value={skewX} onChange={e => setSkewX(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{skewX}°</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-10 text-sm">skewY</label>
                <input type="range" min="-60" max="60" value={skewY} onChange={e => setSkewY(Number(e.target.value))} className="flex-1" />
                <span className="w-8 text-right text-sm">{skewY}°</span>
              </div>
              <div className="p-3 bg-muted rounded border font-mono text-xs text-primary whitespace-pre">
{`transform="
  skewX(${skewX}) 
  skewY(${skewY})
"`}
              </div>
            </div>
          )}
        </div>

        {/* Canvas Display */}
        <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[300px] overflow-hidden bg-background">
          <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0">
            {/* Base Grid */}
            <defs>
              <pattern id="tf-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tf-grid)" />
            
            {/* Absolute Origin (0,0) indicator */}
            <circle cx="0" cy="0" r="5" fill="#ef4444" />
            <text x="10" y="15" fontSize="12" fill="#ef4444" fontWeight="bold">(0,0)</text>

            {/* Original Shape Ghost */}
            <rect 
              x={rectX} y={rectY} width={rectW} height={rectH} 
              fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4" 
            />
            <text x={rectX + 10} y={rectY + 20} fontSize="12" fill="currentColor" opacity="0.4">原位置</text>

            {/* Transformation Group */}
            <g transform={
              activeTab === 'translate' ? `translate(${tx} ${ty})` :
              activeTab === 'rotate' ? `rotate(${angle}${useCenter ? ` ${cx} ${cy}` : ''})` :
              activeTab === 'scale' ? `scale(${sx} ${sy})` :
              `skewX(${skewX}) skewY(${skewY})`
            }>
              {/* Local Coordinate System Grid (moves with the group) */}
              <g stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1">
                <line x1="-1000" y1="0" x2="1000" y2="0" />
                <line x1="0" y1="-1000" x2="0" y2="1000" />
              </g>

              {/* The Transformed Shape */}
              <rect 
                x={rectX} y={rectY} width={rectW} height={rectH} 
                fill="rgba(59, 130, 246, 0.5)" stroke="#2563eb" strokeWidth="2" 
              />
              
              {/* Orientation Indicators to show flipping/rotation clearly */}
              <circle cx={rectX} cy={rectY} r="4" fill="#ef4444" /> {/* Top Left */}
              <circle cx={rectX + rectW} cy={rectY} r="4" fill="#10b981" /> {/* Top Right */}
              <text x={rectX + rectW/2} y={rectY + rectH/2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
                {activeTab.toUpperCase()}
              </text>
            </g>

            {/* Rotation Center Indicator */}
            {activeTab === 'rotate' && useCenter && (
              <>
                <circle cx={cx} cy={cy} r="4" fill="#f97316" />
                <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="#f97316" />
                <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="#f97316" />
                <text x={cx + 8} y={cy - 8} fontSize="10" fill="#f97316" fontWeight="bold">中心点</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
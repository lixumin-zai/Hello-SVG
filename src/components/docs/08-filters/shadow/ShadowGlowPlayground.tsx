'use client';

import { useState } from 'react';

export function ShadowGlowPlayground() {
  const [activeTab, setActiveTab] = useState<'shadow' | 'glow' | 'gooey'>('shadow');

  // Shadow States
  const [dx, setDx] = useState(10);
  const [dy, setDy] = useState(10);
  const [blur, setBlur] = useState(5);
  const [shadowOpacity, setShadowOpacity] = useState(0.5);

  // Glow States
  const [glowColor, setGlowColor] = useState('#3b82f6');
  const [glowBlur, setGlowBlur] = useState(10);
  const [glowSpread, setGlowSpread] = useState(2);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('shadow')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'shadow' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          真实投影 (Drop Shadow)
        </button>
        <button 
          onClick={() => setActiveTab('glow')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'glow' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          霓虹发光 (Neon Glow)
        </button>
        <button 
          onClick={() => setActiveTab('gooey')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'gooey' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          融合粘滞 (Gooey Effect)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'shadow' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                与 CSS 的 <code>box-shadow</code> 只能投射矩形盒子不同，SVG 的投影会<strong>完美贴合图形的真实边缘（甚至是透明 PNG 的边缘）</strong>！
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-bold">偏移 (dx, dy)</label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] w-4">X</span>
                  <input type="range" min="-30" max="30" value={dx} onChange={e => setDx(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-[10px] w-6">{dx}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] w-4">Y</span>
                  <input type="range" min="-30" max="30" value={dy} onChange={e => setDy(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-[10px] w-6">{dy}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold">模糊 (stdDeviation)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="20" step="0.5" value={blur} onChange={e => setBlur(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-[10px] w-6 text-right">{blur}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold">透明度 (flood-opacity)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="1" step="0.1" value={shadowOpacity} onChange={e => setShadowOpacity(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-[10px] w-6 text-right">{shadowOpacity}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'glow' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                发光效果的本质是：提取源图形，填充颜色，进行大范围的高斯模糊，然后把原图叠加在上面。如果叠加多层不同模糊度的发光，效果会更逼真。
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-bold">发光颜色</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={glowColor} onChange={e => setGlowColor(e.target.value)} className="cursor-pointer" />
                  <span className="text-sm font-mono">{glowColor}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold">发光半径 (blur)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="2" max="30" value={glowBlur} onChange={e => setGlowBlur(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-[10px] w-6 text-right">{glowBlur}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold">发光强度 (merge count)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="1" max="5" value={glowSpread} onChange={e => setGlowSpread(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="text-[10px] w-6 text-right">{glowSpread}x</span>
                </div>
                <p className="text-[10px] text-muted-foreground">通过多次合并发光层，让中心区域更亮。</p>
              </div>
            </div>
          )}

          {activeTab === 'gooey' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                <strong>Gooey (融合/粘滞) 特效</strong>是前端动画中最经典的 SVG 滤镜应用。<br/><br/>
                <strong>原理揭秘：</strong><br/>
                1. 先用 <code>feGaussianBlur</code> 把两个靠近的圆极度模糊，让它们的边缘交融在一起。<br/>
                2. 再用 <code>feColorMatrix</code> 提高对比度（Alpha 通道阈值化），把模糊的边缘重新变得锐利！
              </p>
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-blue-700 font-bold">
                👉 请用鼠标拖动右侧画布中的小圆，靠近大圆体验融合效果！
              </div>
            </div>
          )}
        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[10px] text-primary whitespace-pre overflow-y-auto h-48">
{activeTab === 'shadow' ? `<!-- 现代 SVG 提供了简化的原语 -->
<filter id="shadow">
  <feDropShadow 
    dx="${dx}" dy="${dy}" 
    stdDeviation="${blur}" 
    flood-color="black" 
    flood-opacity="${shadowOpacity}" 
  />
</filter>` : ''}

{activeTab === 'glow' ? `<!-- 手工组装发光效果 -->
<filter id="glow">
  <!-- 1. 将原图填充为发光色 -->
  <feFlood flood-color="${glowColor}" result="COLOR" />
  <feComposite in="COLOR" in2="SourceAlpha" operator="in" result="COLORED_ALPHA" />
  
  <!-- 2. 模糊 -->
  <feGaussianBlur in="COLORED_ALPHA" stdDeviation="${glowBlur}" result="BLURRED" />
  
  <!-- 3. 合并图层 (原图在最上层) -->
  <feMerge>
    ${Array(glowSpread).fill('<feMergeNode in="BLURRED" />').join('\n    ')}
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>` : ''}

{activeTab === 'gooey' ? `<!-- Gooey 融合特效标准配方 -->
<filter id="gooey">
  <!-- 1. 极度模糊 -->
  <feGaussianBlur 
    in="SourceGraphic" 
    stdDeviation="10" 
    result="blur" 
  />
  <!-- 2. 提高 Alpha 通道对比度，切除半透明边缘 -->
  <feColorMatrix 
    in="blur" 
    mode="matrix" 
    values="1 0 0 0 0  
            0 1 0 0 0  
            0 0 1 0 0  
            0 0 0 19 -9" 
    result="goo" 
  />
  <!-- 3. 把原图贴回最上面 (可选，保持颜色锐利) -->
  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
</filter>` : ''}
          </div>

          <div className={`relative border-2 border-dashed border-border rounded-lg flex-1 min-h-[300px] flex items-center justify-center overflow-hidden ${activeTab === 'glow' ? 'bg-slate-900' : 'bg-grid-pattern bg-background'}`}>
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              <defs>
                <filter id="demoShadow" x="-20%" y="-20%" width="150%" height="150%">
                  <feDropShadow dx={dx} dy={dy} stdDeviation={blur} floodOpacity={shadowOpacity} />
                </filter>

                <filter id="demoGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feFlood floodColor={glowColor} result="COLOR" />
                  <feComposite in="COLOR" in2="SourceAlpha" operator="in" result="COLORED_ALPHA" />
                  <feGaussianBlur in="COLORED_ALPHA" stdDeviation={glowBlur} result="BLURRED" />
                  <feMerge>
                    {Array.from({ length: glowSpread }).map((_, i) => (
                      <feMergeNode key={i} in="BLURRED" />
                    ))}
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="demoGooey">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>

              <g transform="translate(200, 150)">
                {activeTab === 'shadow' && (
                  <path 
                    d="M 0 -50 L 30 40 L -40 -10 L 40 -10 L -30 40 Z" 
                    fill="#3b82f6" 
                    filter="url(#demoShadow)" 
                    transform="scale(1.5)"
                  />
                )}

                {activeTab === 'glow' && (
                  <>
                    <text 
                      x="0" y="0" 
                      fontSize="60" 
                      fontWeight="900" 
                      fontFamily="sans-serif"
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fill="white"
                      filter="url(#demoGlow)"
                    >
                      NEON
                    </text>
                    <path 
                      d="M -100 40 Q 0 80 100 40" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      filter="url(#demoGlow)" 
                    />
                  </>
                )}

                {activeTab === 'gooey' && (
                  <GooeyInteractiveDemo />
                )}
              </g>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

// Separate component for the Gooey interaction to handle mouse events within SVG
function GooeyInteractiveDemo() {
  const [pos, setPos] = useState({ x: 80, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<SVGCircleElement>) => {
    if (!isDragging) return;
    // Simple coordinate mapping (assuming viewBox center is 200,150)
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    // Transform back to local coordinates (translate(200, 150) was applied)
    setPos({ x: svgP.x - 200, y: svgP.y - 150 });
  };

  return (
    <g filter="url(#demoGooey)">
      {/* Big fixed circle */}
      <circle cx="-30" cy="0" r="60" fill="#ef4444" />
      
      {/* Small draggable circle */}
      <circle 
        cx={pos.x} 
        cy={pos.y} 
        r="30" 
        fill="#ef4444" 
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture(e.pointerId);
          setIsDragging(true);
        }}
        onPointerUp={(e) => {
          (e.target as Element).releasePointerCapture(e.pointerId);
          setIsDragging(false);
        }}
        onPointerMove={handlePointerMove}
      />
    </g>
  );
}
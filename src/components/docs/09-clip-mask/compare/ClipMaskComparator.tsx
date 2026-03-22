'use client';

import { useState } from 'react';

export function ClipMaskComparator() {
  const [activeMode, setActiveMode] = useState<'clip' | 'maskAlpha' | 'maskLuminance'>('clip');
  
  // States for the cutting shape
  const [shapeX, setShapeX] = useState(150);
  const [shapeY, setShapeY] = useState(150);
  const [shapeSize, setShapeSize] = useState(100);
  
  // Specific for Mask
  const [maskOpacity, setMaskOpacity] = useState(0.5);
  const [maskColor, setMaskColor] = useState('#888888'); // Gray for luminance testing

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveMode('clip')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeMode === 'clip' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          ✂️ 裁剪路径 (clipPath)
        </button>
        <button 
          onClick={() => setActiveMode('maskAlpha')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeMode === 'maskAlpha' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          👻 Alpha 蒙版 (mask)
        </button>
        <button 
          onClick={() => setActiveMode('maskLuminance')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeMode === 'maskLuminance' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          💡 亮度蒙版 (luminance)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-bold flex items-center gap-2">🕹️ 控制作用区域</h4>
            <p className="text-xs text-muted-foreground">移动或缩放下面这个星星形状，看看图片是如何被切出来的。</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-xs w-4">X</label>
                <input type="range" min="50" max="250" value={shapeX} onChange={e => setShapeX(Number(e.target.value))} className="flex-1 accent-primary" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs w-4">Y</label>
                <input type="range" min="50" max="250" value={shapeY} onChange={e => setShapeY(Number(e.target.value))} className="flex-1 accent-primary" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs w-8">大小</label>
                <input type="range" min="30" max="200" value={shapeSize} onChange={e => setShapeSize(Number(e.target.value))} className="flex-1 accent-primary" />
              </div>
            </div>
          </div>

          {activeMode === 'clip' && (
            <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/30">
              <h4 className="text-sm font-bold text-blue-600 mb-2">📌 ClipPath 特性</h4>
              <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                <li><strong>二元逻辑</strong>：非黑即白，要么完全显示，要么完全隐藏。</li>
                <li><strong>忽略颜色</strong>：裁剪路径的 fill/stroke 颜色完全不影响结果。</li>
                <li><strong>忽略透明度</strong>：哪怕你给裁剪路径设置 opacity=0.1，结果也是 100% 显示。</li>
                <li><strong>性能好</strong>：比蒙版渲染更快。</li>
              </ul>
            </div>
          )}

          {activeMode === 'maskAlpha' && (
            <div className="space-y-4 p-4 border rounded-lg bg-purple-500/10 border-purple-500/30">
              <h4 className="text-sm font-bold text-purple-600 mb-2">🎛️ Alpha 蒙版属性</h4>
              <p className="text-xs text-muted-foreground">根据蒙版图形的透明度 (opacity) 来决定显示多少。</p>
              
              <div className="flex items-center gap-3 pt-2 border-t border-purple-500/20">
                <label className="text-xs font-bold text-purple-600">透明度</label>
                <input type="range" min="0" max="1" step="0.1" value={maskOpacity} onChange={e => setMaskOpacity(Number(e.target.value))} className="flex-1 accent-purple-500" />
                <span className="text-xs w-6 text-right text-purple-600">{maskOpacity}</span>
              </div>
            </div>
          )}

          {activeMode === 'maskLuminance' && (
            <div className="space-y-4 p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
              <h4 className="text-sm font-bold text-orange-600 mb-2">🎛️ 亮度蒙版属性</h4>
              <p className="text-xs text-muted-foreground">根据蒙版图形的<strong>颜色亮度</strong> (Luminance) 来决定显示多少。白色=全显，黑色=全隐。</p>
              
              <div className="flex items-center gap-3 pt-2 border-t border-orange-500/20">
                <label className="text-xs font-bold text-orange-600">颜色</label>
                <input type="color" value={maskColor} onChange={e => setMaskColor(e.target.value)} className="cursor-pointer" />
                <span className="text-xs font-mono text-orange-600">{maskColor}</span>
              </div>
            </div>
          )}

        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto h-36">
{activeMode === 'clip' ? `<defs>
  <clipPath id="myClip">
    <path d="M...Z" /> <!-- 忽略颜色和透明度 -->
  </clipPath>
</defs>

<image href="photo.jpg" clip-path="url(#myClip)" />` : ''}

{activeMode === 'maskAlpha' ? `<defs>
  <mask id="myMask" mask-type="alpha">
    <path d="M...Z" fill="white" opacity="${maskOpacity}" />
  </mask>
</defs>

<image href="photo.jpg" mask="url(#myMask)" />` : ''}

{activeMode === 'maskLuminance' ? `<defs>
  <mask id="myMask" mask-type="luminance">
    <path d="M...Z" fill="${maskColor}" />
  </mask>
</defs>

<image href="photo.jpg" mask="url(#myMask)" />` : ''}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] flex items-center justify-center bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <defs>
                {/* Generate Star Path */}
                <g id="starShape" transform={`translate(${shapeX}, ${shapeY}) scale(${shapeSize / 100})`}>
                  <path d="M 0 -50 L 11 -15 L 47 -15 L 18 6 L 29 40 L 0 20 L -29 40 L -18 6 L -47 -15 L -11 -15 Z" />
                </g>

                <clipPath id="demoClip">
                  <use href="#starShape" />
                </clipPath>

                <mask id="demoMaskAlpha" style={{ maskType: 'alpha' }}>
                  <use href="#starShape" fill="white" opacity={maskOpacity} />
                </mask>

                <mask id="demoMaskLuminance" style={{ maskType: 'luminance' }}>
                  <use href="#starShape" fill={maskColor} />
                </mask>
              </defs>

              {/* The Image to be clipped/masked */}
              <image 
                href="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
                x="0" y="0" width="300" height="300" 
                preserveAspectRatio="xMidYMid slice"
                clipPath={activeMode === 'clip' ? 'url(#demoClip)' : undefined}
                mask={activeMode === 'maskAlpha' ? 'url(#demoMaskAlpha)' : activeMode === 'maskLuminance' ? 'url(#demoMaskLuminance)' : undefined}
              />

              {/* Ghost outline to show where the shape is even if fully hidden by mask */}
              <use href="#starShape" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4" pointerEvents="none" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
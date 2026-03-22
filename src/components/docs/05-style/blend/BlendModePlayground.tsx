'use client';

import { useState } from 'react';

export function BlendModePlayground() {
  const [blendMode, setBlendMode] = useState('normal');
  const [isolate, setIsolate] = useState(false);
  const [backgroundType, setBackgroundType] = useState<'gradient' | 'image'>('gradient');

  const modes = [
    'normal', 'multiply', 'screen', 'overlay', 
    'darken', 'lighten', 'color-dodge', 'color-burn',
    'hard-light', 'soft-light', 'difference', 'exclusion',
    'hue', 'saturation', 'color', 'luminosity'
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold">混合模式 (mix-blend-mode)</label>
            <select 
              value={blendMode} 
              onChange={e => setBlendMode(e.target.value)}
              className="w-full p-2 bg-background border rounded-md text-sm shadow-sm"
            >
              {modes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              控制 SVG 图形（或组）如何与它下方的背景图层进行颜色混合。与 Photoshop 中的图层混合模式完全一致。
            </p>
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-bold">背景设置</h4>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  checked={backgroundType === 'gradient'} 
                  onChange={() => setBackgroundType('gradient')} 
                  className="accent-primary"
                /> 渐变背景
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer ml-4">
                <input 
                  type="radio" 
                  checked={backgroundType === 'image'} 
                  onChange={() => setBackgroundType('image')} 
                  className="accent-primary"
                /> 图片背景
              </label>
            </div>
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="text-sm font-bold text-orange-600">隔离上下文 (isolation)</h4>
            <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
              <input 
                type="checkbox" 
                checked={isolate} 
                onChange={e => setIsolate(e.target.checked)} 
                className="accent-orange-500"
              />
              开启 isolation: isolate
            </label>
            <p className="text-xs text-muted-foreground">
              给外层容器 <code>&lt;g&gt;</code> 开启隔离后，内部元素之间的混合模式仍然生效，但它们<strong>整体不再与容器外部的背景进行混合</strong>。
            </p>
          </div>
        </div>

        {/* Display */}
        <div className="flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto">
{`<!-- 背景层 -->
${backgroundType === 'image' ? '<image href="photo.jpg" ... />' : '<rect fill="url(#bg-gradient)" ... />'}

<!-- 混合组 -->
<g style="isolation: ${isolate ? 'isolate' : 'auto'};">
  <!-- 内部三个圆相互混合，且受隔离属性影响 -->
  <circle fill="#ff0000" style="mix-blend-mode: ${blendMode};" />
  <circle fill="#00ff00" style="mix-blend-mode: ${blendMode};" />
  <circle fill="#0000ff" style="mix-blend-mode: ${blendMode};" />
</g>`}
          </div>

          <div className="relative border rounded-lg overflow-hidden bg-background h-[300px]">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              
              {/* Background Layer */}
              <defs>
                <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <pattern id="checkers" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#94a3b8" opacity="0.3"/>
                  <rect x="20" y="20" width="20" height="20" fill="#94a3b8" opacity="0.3"/>
                </pattern>
              </defs>
              
              {backgroundType === 'gradient' ? (
                <>
                  <rect width="100%" height="100%" fill="url(#checkers)" />
                  <rect width="100%" height="100%" fill="url(#bgGrad)" opacity="0.8" />
                </>
              ) : (
                <image 
                  href="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop" 
                  width="100%" 
                  height="100%" 
                  preserveAspectRatio="xMidYMid slice"
                />
              )}

              {/* The Blended Group */}
              <g style={{ isolation: isolate ? 'isolate' : 'auto' }}>
                {/* Red Circle */}
                <circle 
                  cx="160" cy="120" r="70" 
                  fill="#ef4444" 
                  style={{ mixBlendMode: blendMode as any }} 
                />
                {/* Green Circle */}
                <circle 
                  cx="240" cy="120" r="70" 
                  fill="#22c55e" 
                  style={{ mixBlendMode: blendMode as any }} 
                />
                {/* Blue Circle */}
                <circle 
                  cx="200" cy="190" r="70" 
                  fill="#3b82f6" 
                  style={{ mixBlendMode: blendMode as any }} 
                />
              </g>

            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
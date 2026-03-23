'use client';

import React, { useState } from 'react';

export function TransformOriginVisualizer() {
  const [useTransformBox, setUseTransformBox] = useState(false);
  const [rotation, setRotation] = useState(45);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 切换 Transform Box 选项，观察 SVG 中元素旋转中心点的差异。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video md:aspect-square w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
            {/* 画布原点标记 */}
            <circle cx="0" cy="0" r="4" fill="hsl(var(--destructive))" />
            <text x="8" y="12" fontSize="10" fill="hsl(var(--destructive))" fontFamily="monospace">(0, 0) Canvas Origin</text>
            
            {/* 辅助线 */}
            <line x1="0" y1="0" x2="200" y2="0" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
            <line x1="0" y1="0" x2="0" y2="200" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4" opacity="0.5" />

            {/* 原始位置轮廓 */}
            <rect 
              x="100" 
              y="100" 
              width="60" 
              height="60" 
              fill="none" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="1" 
              strokeDasharray="2" 
            />

            {/* 旋转元素 */}
            <g>
              <rect 
                x="100" 
                y="100" 
                width="60" 
                height="60" 
                fill="hsl(var(--primary))" 
                rx="8"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  transformBox: useTransformBox ? 'fill-box' : 'view-box',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* 旋转中心点指示器 */}
              <circle 
                cx={useTransformBox ? 130 : 0} 
                cy={useTransformBox ? 130 : 0} 
                r="4" 
                fill="white" 
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </g>
          </svg>
        </div>

        {/* 右侧：控制与代码 */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex justify-between">
                <span>旋转角度</span>
                <span className="font-mono text-primary">{rotation}°</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={rotation} 
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-3 bg-muted/50 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-sm">选择计算参考框 (transform-box)</h3>
              
              <label className={`flex items-center gap-3 cursor-pointer p-3 rounded-md transition-colors ${!useTransformBox ? 'bg-background border border-primary shadow-sm' : 'hover:bg-background/50 border border-transparent'}`}>
                <input 
                  type="radio" 
                  checked={!useTransformBox} 
                  onChange={() => setUseTransformBox(false)} 
                  className="accent-primary w-4 h-4" 
                />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold text-destructive">默认 (view-box)</span>
                  <span className="text-xs text-muted-foreground mt-1">中心点是整个 SVG 画布的左上角 (0,0)。</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 cursor-pointer p-3 rounded-md transition-colors ${useTransformBox ? 'bg-background border border-primary shadow-sm' : 'hover:bg-background/50 border border-transparent'}`}>
                <input 
                  type="radio" 
                  checked={useTransformBox} 
                  onChange={() => setUseTransformBox(true)} 
                  className="accent-primary w-4 h-4" 
                />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold text-primary">fill-box (推荐)</span>
                  <span className="text-xs text-muted-foreground mt-1">中心点是元素自身的边界框中心。</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-3 text-sm">
            <p className="font-mono text-xs whitespace-pre">
{`.spin-icon {
  transform-origin: center;
${useTransformBox ? '  transform-box: fill-box; /* 👈 关键修复 */\n' : ''}  transform: rotate(${rotation}deg);
}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

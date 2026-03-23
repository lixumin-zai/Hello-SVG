'use client';

import React, { useState } from 'react';

export function SmilMotionVisualizer() {
  const [rotate, setRotate] = useState<'auto' | 'auto-reverse' | '0'>('auto');

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 切换 rotate 属性，观察元素如何沿复杂路径运动并自动旋转。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
            <defs>
              <path 
                id="infinity-track" 
                d="M 50 100 C 50 50, 100 50, 100 100 C 100 150, 150 150, 150 100 C 150 50, 100 50, 100 100 C 100 150, 50 150, 50 100 Z" 
              />
            </defs>
            
            {/* 显示运动轨迹 */}
            <use 
              href="#infinity-track" 
              fill="none" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />

            {/* 运动的元素（一辆小车/箭头） */}
            <g>
              <path 
                d="M -10 -8 L 12 0 L -10 8 Z" 
                fill="hsl(var(--primary))" 
              />
              <animateMotion 
                dur="4s" 
                repeatCount="indefinite"
                rotate={rotate === '0' ? 0 : rotate}
              >
                <mpath href="#infinity-track" />
              </animateMotion>
            </g>
          </svg>
        </div>

        {/* 右侧：控制与代码 */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-3 bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-sm">选择 rotate 属性：</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="motion-rotate" value="auto" checked={rotate === 'auto'} onChange={() => setRotate('auto')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold text-primary">auto</span>
                  <span className="text-xs text-muted-foreground">元素会自动根据路径切线方向旋转。</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="motion-rotate" value="auto-reverse" checked={rotate === 'auto-reverse'} onChange={() => setRotate('auto-reverse')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">auto-reverse</span>
                  <span className="text-xs text-muted-foreground">自动旋转，但方向相反（倒车）。</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="motion-rotate" value="0" checked={rotate === '0'} onChange={() => setRotate('0')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">0 (固定角度)</span>
                  <span className="text-xs text-muted-foreground">元素不旋转，始终保持原始朝向。</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-4">
            <pre className="text-xs font-mono whitespace-pre overflow-x-auto">
{`<path id="track" d="..." />

<g>
  <path d="M -10 -8 L 12 0 L -10 8 Z" />
  <animateMotion 
    dur="4s" 
    repeatCount="indefinite"
    rotate="${rotate}"
  >
    <mpath href="#track" />
  </animateMotion>
</g>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

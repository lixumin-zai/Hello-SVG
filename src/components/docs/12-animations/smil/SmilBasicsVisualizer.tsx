'use client';

import React, { useState } from 'react';

export function SmilBasicsVisualizer() {
  const [activeTab, setActiveTab] = useState<'animate' | 'transform'>('animate');

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 切换标签，观察原生 SMIL 标签如何实现属性渐变与变换动画。
      </div>

      <div className="flex gap-2 bg-muted/50 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('animate')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'animate' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          &lt;animate&gt; 属性渐变
        </button>
        <button 
          onClick={() => setActiveTab('transform')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'transform' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          &lt;animateTransform&gt; 变换
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {activeTab === 'animate' ? (
              <circle cx="100" cy="100" r="30" fill="hsl(var(--primary))">
                <animate 
                  attributeName="r" 
                  values="30; 50; 30" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="fill" 
                  values="hsl(var(--primary)); hsl(var(--destructive)); hsl(var(--primary))" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
              </circle>
            ) : (
              <g>
                <circle cx="100" cy="100" r="3" fill="hsl(var(--muted-foreground))" />
                <rect x="70" y="70" width="60" height="60" fill="hsl(var(--primary))" rx="8">
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    from="0 100 100" 
                    to="360 100 100" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                </rect>
              </g>
            )}
          </svg>
        </div>

        {/* 右侧：代码 */}
        <div className="flex flex-col justify-center bg-muted/50 p-4 rounded-lg border border-border overflow-x-auto">
          <h3 className="font-mono text-sm font-semibold mb-4">SVG Code</h3>
          <pre className="text-sm font-mono whitespace-pre text-muted-foreground">
{activeTab === 'animate' ? 
`<circle cx="100" cy="100" r="30">
  <animate 
    attributeName="r" 
    values="30; 50; 30" 
    dur="2s" 
    repeatCount="indefinite" 
  />
  <animate 
    attributeName="fill" 
    values="blue; red; blue" 
    dur="2s" 
    repeatCount="indefinite" 
  />
</circle>` 
: 
`<rect x="70" y="70" width="60" height="60">
  <!-- from/to 的格式是: 
       "角度 旋转中心X 旋转中心Y" -->
  <animateTransform 
    attributeName="transform" 
    type="rotate" 
    from="0 100 100" 
    to="360 100 100" 
    dur="3s" 
    repeatCount="indefinite" 
  />
</rect>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

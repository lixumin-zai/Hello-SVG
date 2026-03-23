'use client';

import React, { useState } from 'react';

const modes = [
  {
    id: 'alpha',
    name: '模式 A：Alpha 蒙版',
    desc: '现代 Web 标准。基于蒙版图形的 透明度 (Opacity) 来工作。',
    rules: [
      { condition: '不透明 (opacity=1)', result: '底图完全显示' },
      { condition: '半透明 (opacity=0.5)', result: '底图半透明显示' },
      { condition: '全透明 (opacity=0)', result: '底图完全隐藏' }
    ]
  },
  {
    id: 'luminance',
    name: '模式 B：亮度蒙版 (Luminance)',
    desc: '老式 SVG 默认标准。基于蒙版图形的 颜色亮度 (Color Luminance) 来工作。',
    rules: [
      { condition: '纯白 (#FFFFFF)', result: '底图完全显示' },
      { condition: '灰色 (如 #888888)', result: '底图半透明显示' },
      { condition: '纯黑 (#000000)', result: '底图完全隐藏' }
    ]
  }
];

export function MaskTypesExplorer() {
  const [activeTab, setActiveTab] = useState(modes[0].id);
  const activeContent = modes.find(m => m.id === activeTab);

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row border-b border-border bg-muted/30">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveTab(m.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === m.id 
                ? 'border-b-2 border-primary text-primary bg-background' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div key={activeTab} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-base font-medium">{activeContent?.desc}</p>
          
          <div className="grid gap-3">
            {activeContent?.rules.map((rule, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="font-mono text-sm font-semibold text-primary">
                  {rule.condition}
                </div>
                <div className="text-muted-foreground text-sm px-2">➡️</div>
                <div className="text-sm font-medium text-foreground">
                  {rule.result}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 rounded-lg bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] border border-dashed border-border p-8 flex justify-center items-center">
              <svg width="200" height="60" viewBox="0 0 200 60">
                <defs>
                  {/* The background pattern to reveal */}
                  <pattern id="bg-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#3b82f6" />
                    <circle cx="10" cy="10" r="8" fill="#60a5fa" />
                  </pattern>

                  {/* Alpha Mask */}
                  <mask id="mask-alpha" mask-type="alpha">
                    <rect x="0" y="0" width="60" height="60" fill="white" opacity="1" />
                    <rect x="70" y="0" width="60" height="60" fill="white" opacity="0.5" />
                    <rect x="140" y="0" width="60" height="60" fill="white" opacity="0" />
                  </mask>

                  {/* Luminance Mask */}
                  <mask id="mask-luminance" mask-type="luminance">
                    <rect x="0" y="0" width="60" height="60" fill="#FFFFFF" />
                    <rect x="70" y="0" width="60" height="60" fill="#888888" />
                    <rect x="140" y="0" width="60" height="60" fill="#000000" />
                  </mask>
                </defs>

                <rect width="200" height="60" fill="url(#bg-pattern)" opacity="0.2" />
                <rect 
                  width="200" 
                  height="60" 
                  fill="url(#bg-pattern)" 
                  mask={`url(#mask-${activeTab})`} 
                />
                
                {/* Outlines */}
                <rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                <rect x="70" y="0" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                <rect x="140" y="0" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
              </svg>
            </div>
          </div>
      </div>
    </div>
  );
}
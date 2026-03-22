'use client';

import { useState } from 'react';

export function AccessibilityVisualizer() {
  const [activeMode, setActiveMode] = useState<'visual' | 'screen-reader'>('visual');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold">无障碍语义实验室</h3>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setActiveMode('visual')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${activeMode === 'visual' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            👁️ 视觉模式
          </button>
          <button 
            onClick={() => setActiveMode('screen-reader')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${activeMode === 'screen-reader' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            🎧 屏幕阅读器模式
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The SVG Graphic */}
        <div className="flex flex-col items-center">
          <div className={`p-8 rounded-xl border-2 transition-all duration-500 w-full max-w-[300px] bg-slate-50 dark:bg-slate-900 ${activeMode === 'screen-reader' ? 'border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-dashed border-border'}`}>
            <svg 
              viewBox="0 0 100 100" 
              role="img" 
              aria-labelledby="chart-title chart-desc"
              className={activeMode === 'screen-reader' ? 'opacity-30 grayscale blur-[2px] transition-all' : 'transition-all'}
            >
              <title id="chart-title">本季度销售饼图</title>
              <desc id="chart-desc">显示A产品占75%，B产品占25%的销售分布</desc>
              
              <g 
                onMouseEnter={() => setHoveredElement('A')} 
                onMouseLeave={() => setHoveredElement(null)}
                className="cursor-help"
              >
                <path d="M50 50 L50 10 A40 40 0 1 1 10 50 Z" fill="#3b82f6" />
                <text x="65" y="65" fill="white" fontSize="8" fontWeight="bold">75%</text>
              </g>

              <g 
                onMouseEnter={() => setHoveredElement('B')} 
                onMouseLeave={() => setHoveredElement(null)}
                className="cursor-help"
              >
                <path d="M50 50 L10 50 A40 40 0 0 1 50 10 Z" fill="#f59e0b" />
                <text x="35" y="35" fill="white" fontSize="8" fontWeight="bold">25%</text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            {activeMode === 'visual' ? '将鼠标悬停在饼图区域查看结构。' : '在屏幕阅读器眼中，这不再是一张图，而是一段有结构的文字。'}
          </p>
        </div>

        {/* The Code / Output panel */}
        <div className="bg-muted rounded-lg p-4 font-mono text-xs h-[250px] flex flex-col justify-center">
          {activeMode === 'visual' ? (
            <div className="space-y-2">
              <div className="text-muted-foreground">/* SVG 源码结构 */</div>
              <div className="text-blue-500">{"<svg role='img' aria-labelledby='t d'>"}</div>
              <div className={`pl-4 ${hoveredElement ? 'text-muted-foreground' : 'text-green-600 font-bold'}`}>
                {"<title id='t'>本季度销售饼图</title>"}
              </div>
              <div className={`pl-4 ${hoveredElement ? 'text-muted-foreground' : 'text-purple-600 font-bold'}`}>
                {"<desc id='d'>显示A产品占75%...</desc>"}
              </div>
              <div className={`pl-4 ${hoveredElement === 'A' ? 'text-foreground bg-primary/10 rounded font-bold' : 'text-muted-foreground'}`}>
                {"<path fill='blue' d='...' />"}
              </div>
              <div className={`pl-4 ${hoveredElement === 'B' ? 'text-foreground bg-primary/10 rounded font-bold' : 'text-muted-foreground'}`}>
                {"<path fill='orange' d='...' />"}
              </div>
              <div className="text-blue-500">{"</svg>"}</div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95">
              <div className="text-muted-foreground flex items-center gap-2 border-b border-border pb-2">
                <span>🔊</span> <span>VoiceOver 朗读内容：</span>
              </div>
              <div className="p-3 bg-background rounded border-l-4 border-primary shadow-sm text-foreground text-sm leading-relaxed">
                "图像。<br/>
                <span className="font-bold">本季度销售饼图。</span><br/>
                显示A产品占75%，B产品占25%的销售分布。"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

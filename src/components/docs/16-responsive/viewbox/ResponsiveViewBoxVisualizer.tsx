'use client';

import { useState } from 'react';

export function ResponsiveViewBoxVisualizer() {
  const [containerWidth, setContainerWidth] = useState(100);

  // SVG configuration based on container width
  const isMobile = containerWidth < 40;
  const isTablet = containerWidth >= 40 && containerWidth < 70;
  
  // Dynamic viewBox to show different parts or scales of the SVG
  // Mobile: 0 0 100 100 (Zoom in on the core logo)
  // Tablet: 0 0 200 100 (Show logo + short text)
  // Desktop: 0 0 300 100 (Show full detailed logo)
  const currentViewBox = isMobile ? "0 0 100 100" : isTablet ? "0 0 200 100" : "0 0 300 100";

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="mb-8">
        <label className="text-sm font-medium mb-2 flex justify-between">
          <span>拖动调整容器宽度 (Container Width)</span>
          <span className="font-mono text-primary">{containerWidth}%</span>
        </label>
        <input 
          type="range" 
          min="20" 
          max="100" 
          value={containerWidth} 
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* The Resizable Container */}
        <div className="h-[200px] border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center bg-muted/30 relative">
          <div className="absolute -top-3 left-2 bg-background px-2 text-xs text-muted-foreground font-mono">
            &lt;div style=&#123; width: {containerWidth}% &#125;&gt;
          </div>
          
          <div 
            className="h-full flex items-center justify-center transition-all duration-300" 
            style={{ width: `${containerWidth}%` }}
          >
            {/* The SVG */}
            <svg 
              viewBox={currentViewBox} 
              className="w-full h-full max-h-[100px] transition-all duration-500 border border-border bg-background shadow-sm"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Logo Mark (Always visible) */}
              <circle cx="50" cy="50" r="30" fill="#3b82f6" />
              <path d="M40 40 L60 60 M60 40 L40 60" stroke="white" strokeWidth="6" strokeLinecap="round" />

              {/* Tablet & Desktop Text */}
              <g className={`transition-opacity duration-500 ${isMobile ? 'opacity-0' : 'opacity-100'}`}>
                <text x="110" y="58" fontSize="24" fontWeight="bold" fill="currentColor">
                  Brand
                </text>
              </g>

              {/* Desktop Only Extra Details */}
              <g className={`transition-opacity duration-500 ${!isMobile && !isTablet ? 'opacity-100' : 'opacity-0'}`}>
                <text x="195" y="58" fontSize="24" fontWeight="light" fill="currentColor" opacity="0.6">
                  Studio
                </text>
                <circle cx="280" cy="50" r="5" fill="#10b981" />
              </g>
            </svg>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-muted rounded-lg p-4 font-mono text-xs h-[200px] flex flex-col justify-center">
          <div className="text-muted-foreground mb-2">当前 SVG 配置：</div>
          
          <div className="space-y-4">
            <div>
              <span className="text-purple-500">viewBox</span> = 
              <span className="text-green-600 bg-green-500/10 px-1 ml-1 rounded transition-all">"{currentViewBox}"</span>
            </div>
            
            <div className="text-muted-foreground border-l-2 border-primary/30 pl-2">
              {isMobile && "📱 移动端模式：视口缩小到 100x100，仅显示核心图形。"}
              {isTablet && "💻 平板模式：视口扩大到 200x100，显示图形 + 主品牌名。"}
              {!isMobile && !isTablet && "🖥️ 桌面模式：视口完全展开到 300x100，显示完整 Logo。"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

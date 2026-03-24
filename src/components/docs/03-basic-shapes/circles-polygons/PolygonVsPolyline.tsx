'use client';

import { useState } from 'react';

export function PolygonVsPolyline() {
  const [isHovered, setIsHovered] = useState(false);
  const [showFill, setShowFill] = useState(false);

  const points = "20,100 80,20 140,100 200,20 260,100";

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">▶ 开启填充色，对比观察 `polyline` 和 `polygon` 的闭合行为差异</p>
        <button 
          onClick={() => setShowFill(!showFill)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${showFill ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        >
          {showFill ? '🟢 隐藏填充 (fill="none")' : '⚪ 显示填充 (fill="currentColor")'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Polyline */}
        <div 
          className="relative rounded-xl border bg-background p-6 group cursor-pointer transition-all hover:border-blue-500 hover:shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-4 left-4 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold">
            &lt;polyline&gt; (开放折线)
          </div>
          
          <div className="mt-8 flex justify-center items-center h-[150px]">
            <svg viewBox="0 0 280 120" className="w-full h-full overflow-visible drop-shadow-md">
              <polyline 
                points={points} 
                fill={showFill ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all duration-500 ${showFill ? 'text-blue-500/20 stroke-blue-500' : 'text-foreground stroke-foreground'}`}
              />
              {/* Highlight start and end points */}
              <circle cx="20" cy="100" r="6" fill="currentColor" className="text-blue-500" />
              <text x="20" y="115" fontSize="12" className="fill-muted-foreground" textAnchor="middle">起点</text>
              <circle cx="260" cy="100" r="6" fill="currentColor" className="text-blue-500" />
              <text x="260" y="115" fontSize="12" className="fill-muted-foreground" textAnchor="middle">终点</text>
              
              {/* Dashed line to show it's NOT closed */}
              <line x1="260" y1="100" x2="20" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <text x="140" y="115" fontSize="12" className="fill-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" textAnchor="middle">不会自动连接</text>
            </svg>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-md font-mono text-xs overflow-x-auto">
            &lt;polyline points="..." fill="{showFill ? 'blue' : 'none'}" stroke="blue" /&gt;
          </div>
        </div>

        {/* Polygon */}
        <div 
          className="relative rounded-xl border bg-background p-6 group cursor-pointer transition-all hover:border-green-500 hover:shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-4 left-4 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold">
            &lt;polygon&gt; (闭合多边形)
          </div>
          
          <div className="mt-8 flex justify-center items-center h-[150px]">
            <svg viewBox="0 0 280 120" className="w-full h-full overflow-visible drop-shadow-md">
              <polygon 
                points={points} 
                fill={showFill ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinejoin="round"
                className={`transition-all duration-500 ${showFill ? 'text-green-500/20 stroke-green-500' : 'text-foreground stroke-foreground'}`}
              />
              {/* Highlight start and end points */}
              <circle cx="20" cy="100" r="6" fill="currentColor" className="text-green-500" />
              <circle cx="260" cy="100" r="6" fill="currentColor" className="text-green-500" />
              
              {/* Highlight the automatic closing line */}
              <line x1="260" y1="100" x2="20" y2="100" stroke="currentColor" strokeWidth="4" className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <text x="140" y="115" fontSize="12" className="fill-green-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" textAnchor="middle">自动闭合连线！</text>
            </svg>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-md font-mono text-xs overflow-x-auto">
            &lt;polygon points="..." fill="{showFill ? 'green' : 'none'}" stroke="green" /&gt;
          </div>
        </div>
      </div>
    </div>
  );
}

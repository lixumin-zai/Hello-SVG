'use client';

import { useState } from 'react';

export function ResolutionSimulator() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 拖动滑块模拟放大图像，观察光栅图（左）和矢量图（右）的区别
      </p>
      
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium">缩放倍数: {zoom.toFixed(1)}x</span>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="flex-1 cursor-pointer accent-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-8 h-64 overflow-hidden border rounded-lg bg-background relative">
        {/* Raster (Left) */}
        <div className="relative flex items-center justify-center border-r">
          <div className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded shadow">
            光栅图 (PNG/JPG)
          </div>
          <div 
            style={{ 
              transform: `scale(${zoom})`,
              transition: 'transform 0.1s ease-out'
            }}
            className="flex flex-col items-center"
          >
            {/* Simulating a pixelated circle */}
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: zoom > 3 ? '0' : '50%',
                backgroundColor: '#3b82f6',
                boxShadow: zoom > 3 ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none',
                filter: zoom > 2 ? 'blur(1px) contrast(2)' : 'none',
                imageRendering: 'pixelated'
              }}
            >
              {/* Add grid lines when zoomed in to simulate pixels */}
              {zoom > 4 && (
                <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-[1px] bg-blue-300">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-blue-500 w-full h-full"></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vector (Right) */}
        <div className="relative flex items-center justify-center">
          <div className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded shadow">
            矢量图 (SVG)
          </div>
          <div 
            style={{ 
              transform: `scale(${zoom})`,
              transition: 'transform 0.1s ease-out'
            }}
            className="flex flex-col items-center"
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <strong>提示：</strong>光栅图在放大后会出现明显的锯齿和马赛克（失真），而矢量图由数学公式实时计算渲染，无论放大多少倍依然保持边缘平滑。这正是 SVG 被称为<strong>"分辨率无关"</strong>的原因。
      </div>
    </div>
  );
}
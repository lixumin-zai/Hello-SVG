'use client';

import React, { useState } from 'react';

export function ClipPathVisualizer() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="mb-4 text-sm text-muted-foreground">
        ▶ 拖动滑块移动“剪刀”（即 clipPath），观察它是如何做二元裁剪的。
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">剪刀水平位置 (cx)</label>
            <input 
              type="range" 
              min="0" max="200" 
              value={position.x}
              onChange={(e) => setPosition({ ...position, x: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium">剪刀垂直位置 (cy)</label>
            <input 
              type="range" 
              min="0" max="200" 
              value={position.y}
              onChange={(e) => setPosition({ ...position, y: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="rounded bg-muted p-4 text-xs font-mono text-muted-foreground">
            {`<clipPath id="my-clip">`}<br/>
            {`  <circle cx="${position.x}" cy="${position.y}" r="60" />`}<br/>
            {`</clipPath>`}<br/><br/>
            {`<image clip-path="url(#my-clip)" />`}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] p-8 relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
            <defs>
              <clipPath id="demo-clip">
                <circle cx={position.x} cy={position.y} r="60" />
              </clipPath>
              {/* Pattern for the "photo" */}
              <pattern id="photo-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#3b82f6" />
                <circle cx="20" cy="20" r="10" fill="#60a5fa" />
              </pattern>
            </defs>
            
            {/* The background to show what is hidden */}
            <rect width="200" height="200" fill="url(#photo-pattern)" opacity="0.2" />
            
            {/* The actual clipped element */}
            <rect width="200" height="200" fill="url(#photo-pattern)" clipPath="url(#demo-clip)" />
            
            {/* Visualizer for the clip path boundary */}
            <circle 
              cx={position.x} 
              cy={position.y} 
              r="60" 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />
            
            {/* Scissors icon near the boundary */}
            <text x={position.x + 45} y={position.y - 45} fontSize="20" className="pointer-events-none select-none">
              ✂️
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

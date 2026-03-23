'use client';

import React, { useState } from 'react';

export function FilterRegionVisualizer() {
  const [blur, setBlur] = useState(20);
  const [expandRegion, setExpandRegion] = useState(false);

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="mb-4 text-sm text-muted-foreground">
        ▶ 拖动滑块增加模糊强度。注意观察当区域未扩展时，边缘是如何被“一刀切”的。
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">模糊强度 (stdDeviation)</label>
              <span className="text-sm text-muted-foreground">{blur}</span>
            </div>
            <input 
              type="range" 
              min="0" max="40" step="1"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="expand-region"
              checked={expandRegion}
              onChange={(e) => setExpandRegion(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="expand-region" className="text-sm font-medium">
              扩展滤镜作用域
            </label>
          </div>
          
          <div className="rounded bg-muted p-4 text-xs font-mono text-muted-foreground">
            {`<filter id="myBlur"`}<br/>
            {expandRegion ? `  x="-50%" y="-50%" width="200%" height="200%"` : `  /* 默认: x="-10%" y="-10%" width="120%" height="120%" */`}<br/>
            {`>`}<br/>
            {`  <feGaussianBlur stdDeviation="${blur}" />`}<br/>
            {`</filter>`}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] p-8">
          <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
            <defs>
              <filter
                id="demo-blur-region"
                x={expandRegion ? "-50%" : "-10%"}
                y={expandRegion ? "-50%" : "-10%"}
                width={expandRegion ? "200%" : "120%"}
                height={expandRegion ? "200%" : "120%"}
              >
                <feGaussianBlur stdDeviation={blur} />
              </filter>
            </defs>
            
            {/* The actual element */}
            <circle cx="100" cy="100" r="40" fill="#3b82f6" filter="url(#demo-blur-region)" />
            
            {/* Bounding box visualizer */}
            <rect 
              x={expandRegion ? 20 : 52} 
              y={expandRegion ? 20 : 52} 
              width={expandRegion ? 160 : 96} 
              height={expandRegion ? 160 : 96} 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />
            <text x="100" y={expandRegion ? 15 : 45} textAnchor="middle" fill="#f97316" fontSize="10">
              Filter Region
            </text>
            
            {/* Object bounding box */}
            <rect x="60" y="60" width="80" height="80" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
            <text x="100" y="145" textAnchor="middle" fill="#22c55e" fontSize="10">
              Bounding Box
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

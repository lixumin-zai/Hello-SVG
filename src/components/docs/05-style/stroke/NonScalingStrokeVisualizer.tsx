'use client';

import { useState } from 'react';

export function NonScalingStrokeVisualizer() {
  const [scale, setScale] = useState(1);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <p className="text-sm text-muted-foreground mb-4">▶ 拖动滑块缩放图形，观察描边粗细的变化</p>
      
      <div className="flex items-center gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <label className="text-sm font-bold whitespace-nowrap w-24">缩放比例: {scale.toFixed(1)}x</label>
        <input 
          type="range" min="0.5" max="3" step="0.1" 
          value={scale} 
          onChange={e => setScale(Number(e.target.value))} 
          className="flex-1 accent-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center h-12">
            <div className="font-bold text-sm text-red-500 mb-1 flex items-center justify-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span> 默认行为
            </div>
            <div className="text-xs text-muted-foreground">描边随图形一起被放大/缩小</div>
          </div>
          <div className="w-full h-56 bg-background border border-border shadow-inner rounded-lg flex items-center justify-center overflow-hidden relative">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              {/* Reference Grid */}
              <g stroke="rgba(150,150,150,0.1)" strokeWidth="1">
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="50" y1="0" x2="50" y2="100" />
              </g>
              <rect 
                x="30" y="30" width="40" height="40" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="4" 
                style={{ 
                  transform: `scale(${scale})`, 
                  transformOrigin: 'center' 
                }} 
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-center h-12">
            <div className="font-bold text-sm text-green-500 mb-1 flex items-center justify-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span> vector-effect="non-scaling-stroke"
            </div>
            <div className="text-xs text-muted-foreground">无论怎么缩放，描边始终保持 4px 的粗细</div>
          </div>
          <div className="w-full h-56 bg-background border border-border shadow-inner rounded-lg flex items-center justify-center overflow-hidden relative">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              {/* Reference Grid */}
              <g stroke="rgba(150,150,150,0.1)" strokeWidth="1">
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="50" y1="0" x2="50" y2="100" />
              </g>
              <rect 
                x="30" y="30" width="40" height="40" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
                style={{ 
                  transform: `scale(${scale})`, 
                  transformOrigin: 'center' 
                }} 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

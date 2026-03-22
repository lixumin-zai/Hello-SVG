'use client';

import { useState } from 'react';

export function ViewBoxPlayground() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(200);
  const [vbX, setVbX] = useState(0);
  const [vbY, setVbY] = useState(0);
  const [vbW, setVbW] = useState(400);
  const [vbH, setVbH] = useState(200);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 调节属性，观察视口 (Viewport) 与用户坐标系 (viewBox) 的关系
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-secondary/20">
            <h4 className="font-semibold text-primary mb-3">Viewport (视口尺寸)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <label className="w-16">width</label>
                <input type="range" min="100" max="400" value={width} onChange={e => setWidth(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{width}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-16">height</label>
                <input type="range" min="100" max="400" value={height} onChange={e => setHeight(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{height}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="font-semibold text-orange-600 mb-3">viewBox (用户坐标系)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <label className="w-16">min-x</label>
                <input type="range" min="-200" max="200" value={vbX} onChange={e => setVbX(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{vbX}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-16">min-y</label>
                <input type="range" min="-200" max="200" value={vbY} onChange={e => setVbY(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{vbY}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-16">width</label>
                <input type="range" min="50" max="800" value={vbW} onChange={e => setVbW(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{vbW}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-16">height</label>
                <input type="range" min="50" max="800" value={vbH} onChange={e => setVbH(Number(e.target.value))} className="flex-1" />
                <span className="w-12 text-right">{vbH}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted rounded text-xs font-mono">
            {`<svg width="${width}" height="${height}" viewBox="${vbX} ${vbY} ${vbW} ${vbH}">`}
          </div>
        </div>

        {/* Display */}
        <div className="flex flex-col items-center justify-center bg-grid-pattern relative min-h-[450px]">
          {/* Background grid to show page context */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          {/* Viewport Box */}
          <div 
            className="border-2 border-primary border-dashed relative overflow-hidden bg-background shadow-lg"
            style={{ width, height, transition: 'all 0.3s ease' }}
          >
            <div className="absolute top-1 left-2 text-xs text-primary font-bold opacity-50 pointer-events-none z-10">
              Viewport (浏览器窗口)
            </div>

            {/* SVG Content */}
            <svg 
              width={width} 
              height={height} 
              viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
              className="absolute inset-0"
              style={{ transition: 'all 0.3s ease' }}
            >
              {/* Internal Grid representing user coordinate system */}
              <defs>
                <pattern id="user-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#user-grid)" />
              
              {/* Origin indicator */}
              <circle cx="0" cy="0" r="5" fill="#ef4444" />
              <text x="10" y="15" fill="#ef4444" fontSize="14" fontWeight="bold">(0,0)</text>

              {/* Sample shapes */}
              <circle cx="200" cy="100" r="50" fill="#3b82f6" fillOpacity="0.8" />
              <rect x="50" y="50" width="100" height="100" fill="#10b981" fillOpacity="0.8" />
              
              <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16">
                图形内容
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <strong>核心概念：</strong> <br/>
        • <strong>Viewport</strong>（外框虚线）：就像一扇窗户，决定了 SVG 在网页上占据多大物理空间。<br/>
        • <strong>viewBox</strong>（内部橙色网格）：定义了 SVG 内部自己的世界坐标系。改变 viewBox 的 x/y 相当于移动窗户看世界（平移），改变 width/height 相当于拉近/拉远看世界（缩放）。
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

export function PatternPlayground() {
  const [activePattern, setActivePattern] = useState<'dots' | 'stripes' | 'checkers' | 'custom'>('dots');

  // Pattern Size
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

  // Transformations
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-3">
            <label className="block text-sm font-bold">选择图案基础单元 (Tile)</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActivePattern('dots')}
                className={`py-2 text-xs rounded border transition-colors ${activePattern === 'dots' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
              >波点 (Dots)</button>
              <button 
                onClick={() => setActivePattern('stripes')}
                className={`py-2 text-xs rounded border transition-colors ${activePattern === 'stripes' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
              >斜纹 (Stripes)</button>
              <button 
                onClick={() => setActivePattern('checkers')}
                className={`py-2 text-xs rounded border transition-colors ${activePattern === 'checkers' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
              >棋盘格 (Checkers)</button>
              <button 
                onClick={() => setActivePattern('custom')}
                className={`py-2 text-xs rounded border transition-colors ${activePattern === 'custom' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-secondary'}`}
              >星星 (Stars)</button>
            </div>
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
            <h4 className="text-sm font-bold">图案尺寸 (patternUnits)</h4>
            <p className="text-[10px] text-muted-foreground">定义单个无缝贴图的宽高。调整它就像更换瓷砖的尺寸。</p>
            <div className="flex items-center gap-3">
              <label className="text-xs w-10">width</label>
              <input type="range" min="10" max="100" value={width} onChange={e => setWidth(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="text-xs w-6">{width}</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs w-10">height</label>
              <input type="range" min="10" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="text-xs w-6">{height}</span>
            </div>
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-orange-500/10 border-orange-500/30">
            <h4 className="text-sm font-bold text-orange-600">图案变换 (patternTransform)</h4>
            <p className="text-[10px] text-muted-foreground">你可以对整个生成的图案网格进行统一的旋转和缩放！</p>
            <div className="flex items-center gap-3">
              <label className="text-xs w-10 text-orange-600">旋转</label>
              <input type="range" min="-90" max="90" value={rotate} onChange={e => setRotate(Number(e.target.value))} className="flex-1 accent-orange-500" />
              <span className="text-xs w-8 text-orange-600">{rotate}°</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs w-10 text-orange-600">缩放</label>
              <input type="range" min="0.5" max="3" step="0.1" value={scale} onChange={e => setScale(Number(e.target.value))} className="flex-1 accent-orange-500" />
              <span className="text-xs w-8 text-orange-600">{scale}x</span>
            </div>
          </div>

        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto h-32">
{`<defs>
  <pattern 
    id="myPattern" 
    width="${width}" height="${height}" 
    patternUnits="userSpaceOnUse"
    patternTransform="rotate(${rotate}) scale(${scale})"
  >
    <!-- 图案内部的内容 -->
${activePattern === 'dots' ? `    <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.3}" fill="#3b82f6" />` : ''}
${activePattern === 'stripes' ? `    <line x1="0" y1="0" x2="0" y2="${height}" stroke="#10b981" stroke-width="${width/2}" />` : ''}
${activePattern === 'checkers' ? `    <rect x="0" y="0" width="${width/2}" height="${height/2}" fill="#f59e0b" />
    <rect x="${width/2}" y="${height/2}" width="${width/2}" height="${height/2}" fill="#f59e0b" />` : ''}
${activePattern === 'custom' ? `    <path d="..." fill="#ec4899" />` : ''}
  </pattern>
</defs>`}
          </div>

          <div className="relative border rounded-lg h-[300px] overflow-hidden bg-white">
            <svg width="100%" height="100%">
              <defs>
                <pattern 
                  id="demoPattern" 
                  width={width} 
                  height={height} 
                  patternUnits="userSpaceOnUse"
                  patternTransform={`rotate(${rotate}) scale(${scale})`}
                >
                  {/* Background of the pattern tile (transparent by default, but let's add a faint one for clarity) */}
                  <rect width={width} height={height} fill="#f8fafc" />
                  
                  {/* Pattern Contents */}
                  {activePattern === 'dots' && (
                    <circle cx={width/2} cy={height/2} r={Math.min(width, height) * 0.3} fill="#3b82f6" />
                  )}
                  
                  {activePattern === 'stripes' && (
                    <line x1={0} y1={0} x2={0} y2={height} stroke="#10b981" strokeWidth={width/2} />
                  )}

                  {activePattern === 'checkers' && (
                    <>
                      <rect x={0} y={0} width={width/2} height={height/2} fill="#f59e0b" />
                      <rect x={width/2} y={height/2} width={width/2} height={height/2} fill="#f59e0b" />
                    </>
                  )}

                  {activePattern === 'custom' && (
                    <g transform={`scale(${Math.min(width, height) / 50})`}>
                      <path d="M25,1 32,15 49,17 37,29 40,46 25,39 10,46 13,29 1,17 18,15z" fill="#ec4899" />
                    </g>
                  )}

                  {/* Draw a faint outline around each tile to help users understand how it tiles */}
                  <rect width={width} height={height} fill="none" stroke="black" strokeOpacity="0.1" strokeDasharray="2" />
                </pattern>
              </defs>

              {/* The element being filled with the pattern */}
              <rect width="100%" height="100%" fill="url(#demoPattern)" />

              {/* A floating text to show it's a background */}
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="36" fontWeight="900" fill="black" style={{ paintOrder: 'stroke fill', stroke: 'white', strokeWidth: 8, strokeLinejoin: 'round' }}>
                PATTERN
              </text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
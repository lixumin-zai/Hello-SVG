'use client';

import React, { useState, useRef, useEffect } from 'react';

export function BBoxVisualizer() {
  const [shape, setShape] = useState<'circle' | 'path' | 'text'>('path');
  const [bbox, setBBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const shapeRef = useRef<SVGGraphicsElement>(null);

  useEffect(() => {
    if (shapeRef.current) {
      const box = shapeRef.current.getBBox();
      setBBox({ x: box.x, y: box.y, width: box.width, height: box.height });
    }
  }, [shape]);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 切换不同图形，观察 getBBox() 返回的紧凑几何包围盒。注意：BBox 不包含描边 (stroke) 的宽度！
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
            {/* 坐标系辅助线 */}
            <line x1="0" y1="100" x2="200" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4" opacity="0.3" />

            {/* 目标图形 */}
            <g>
              {shape === 'path' && (
                <path 
                  ref={shapeRef as any}
                  d="M 50 150 Q 100 20 150 150" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="10" 
                />
              )}
              {shape === 'circle' && (
                <circle 
                  ref={shapeRef as any}
                  cx="100" 
                  cy="100" 
                  r="40" 
                  fill="hsl(var(--primary))" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth="10" 
                />
              )}
              {shape === 'text' && (
                <text 
                  ref={shapeRef as any}
                  x="100" 
                  y="110" 
                  textAnchor="middle" 
                  fontSize="40" 
                  fontWeight="bold" 
                  fill="hsl(var(--primary))"
                >
                  SVG
                </text>
              )}
            </g>

            {/* BBox 渲染框 */}
            {bbox.width > 0 && (
              <rect 
                x={bbox.x} 
                y={bbox.y} 
                width={bbox.width} 
                height={bbox.height} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeDasharray="4" 
              />
            )}
            
            {/* 标出 BBox 的坐标 */}
            {bbox.width > 0 && (
              <circle cx={bbox.x} cy={bbox.y} r="3" fill="#10b981" />
            )}
          </svg>
        </div>

        {/* 右侧：控制与代码 */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex gap-2 bg-muted/50 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setShape('path')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${shape === 'path' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Path (曲线)
            </button>
            <button 
              onClick={() => setShape('circle')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${shape === 'circle' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Circle (带粗描边)
            </button>
            <button 
              onClick={() => setShape('text')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${shape === 'text' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Text (文本)
            </button>
          </div>

          <div className="space-y-4 bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-mono text-sm font-semibold">getBBox() 结果</h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div className="bg-background p-2 rounded border border-border">
                <span className="text-muted-foreground">x:</span> {bbox.x.toFixed(1)}
              </div>
              <div className="bg-background p-2 rounded border border-border">
                <span className="text-muted-foreground">y:</span> {bbox.y.toFixed(1)}
              </div>
              <div className="bg-background p-2 rounded border border-border text-[#10b981] font-bold">
                <span className="text-muted-foreground font-normal">width:</span> {bbox.width.toFixed(1)}
              </div>
              <div className="bg-background p-2 rounded border border-border text-[#10b981] font-bold">
                <span className="text-muted-foreground font-normal">height:</span> {bbox.height.toFixed(1)}
              </div>
            </div>
            {shape === 'circle' && (
              <p className="text-xs text-destructive mt-2">
                注意：圆形的半径是 40，所以 BBox 宽高是 80。外面的粗红线（strokeWidth=10）超出了 BBox 范围，因为 BBox 仅计算几何尺寸，忽略 stroke！
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

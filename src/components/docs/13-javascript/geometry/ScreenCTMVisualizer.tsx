'use client';

import React, { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';

export function ScreenCTMVisualizer() {
  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 });
  const [svgPos, setSvgPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    // 1. 获取鼠标在屏幕（或 viewport）上的坐标
    const clientX = e.clientX;
    const clientY = e.clientY;
    setScreenPos({ x: clientX, y: clientY });

    // 2. 创建一个 SVGPoint 并赋入屏幕坐标
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    // 3. 获取并应用逆矩阵，转换为 SVG 内部坐标
    const ctm = svgRef.current.getScreenCTM();
    if (ctm) {
      const inverseCtm = ctm.inverse();
      const svgPoint = pt.matrixTransform(inverseCtm);
      setSvgPos({ x: svgPoint.x, y: svgPoint.y });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 将鼠标移动到下方的 SVG 区域中，观察屏幕坐标是如何被 CTM 转换为 SVG 内部的绝对坐标的。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="flex flex-col gap-2">
          <div 
            className="relative aspect-video w-full rounded-lg border-2 border-dashed border-primary/50 bg-muted/30 overflow-hidden flex items-center justify-center cursor-crosshair"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* 这个 SVG 的 viewBox 是 0 0 1000 1000，和实际的 DOM 宽高完全不一致 */}
            <svg 
              ref={svgRef}
              viewBox="0 0 1000 1000" 
              className="w-full h-full drop-shadow-md overflow-visible"
              onMouseMove={handleMouseMove}
            >
              {/* 背景网格 - 代表 SVG 内部的用户坐标系 */}
              <defs>
                <pattern id="ctm-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" className="text-muted/40" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ctm-grid)" />
              
              <text x="500" y="500" textAnchor="middle" fill="currentColor" className="text-muted-foreground opacity-50" fontSize="40">
                viewBox="0 0 1000 1000"
              </text>

              {isHovering && (
                <g>
                  {/* 跟随鼠标的圆点 */}
                  <circle cx={svgPos.x} cy={svgPos.y} r="20" fill="hsl(var(--primary))" opacity="0.8" />
                  <circle cx={svgPos.x} cy={svgPos.y} r="4" fill="white" />
                  
                  {/* 坐标线 */}
                  <line x1="0" y1={svgPos.y} x2={svgPos.x} y2={svgPos.y} stroke="hsl(var(--primary))" strokeDasharray="10" strokeWidth="4" />
                  <line x1={svgPos.x} y1="0" x2={svgPos.x} y2={svgPos.y} stroke="hsl(var(--primary))" strokeDasharray="10" strokeWidth="4" />
                </g>
              )}
            </svg>
          </div>
          <p className="text-xs text-center text-muted-foreground">虚线框为 DOM 实际尺寸，内部为 1000x1000 的 SVG 坐标系。</p>
        </div>

        {/* 右侧：控制与代码 */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-4 bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-mono text-sm font-semibold">坐标对比</h3>
            
            <div className="flex flex-col gap-4">
              <div className="p-3 bg-background border border-border rounded-md">
                <div className="text-xs text-muted-foreground mb-1">1. DOM 屏幕坐标 (clientX / clientY)</div>
                <div className="font-mono text-sm">
                  <span className="text-destructive">X: {Math.round(screenPos.x)}</span>, 
                  <span className="text-destructive ml-2">Y: {Math.round(screenPos.y)}</span>
                </div>
              </div>
              
              <div className="flex justify-center text-muted-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                <span className="text-xs ml-2 pt-1">通过 CTM.inverse() 转换</span>
              </div>

              <div className="p-3 bg-primary/10 border border-primary/30 rounded-md">
                <div className="text-xs text-primary mb-1 font-semibold">2. SVG 内部用户坐标 (SVG User Space)</div>
                <div className="font-mono text-sm text-primary">
                  X: {Math.round(svgPos.x)}, Y: {Math.round(svgPos.y)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

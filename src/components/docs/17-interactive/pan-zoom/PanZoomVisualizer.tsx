'use client';

import { useState, useRef, MouseEvent, WheelEvent } from 'react';

export function PanZoomVisualizer() {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 400, h: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate how much the mouse moved in screen pixels
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Convert screen pixel movement to viewBox unit movement
    // Note: If SVG width is 800px and viewBox width is 400, 
    // 1 screen px = 0.5 viewBox units. We approximate it here for the demo.
    const svgRect = svgRef.current?.getBoundingClientRect();
    const ratioX = svgRect ? viewBox.w / svgRect.width : 1;
    const ratioY = svgRect ? viewBox.h / svgRect.height : 1;

    // Pan moves the viewBox opposite to mouse movement
    setViewBox(prev => ({
      ...prev,
      x: prev.x - dx * ratioX,
      y: prev.y - dy * ratioY
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    
    // Simple zoom to center (a real implementation would zoom to mouse pointer)
    setViewBox(prev => {
      const newW = prev.w * zoomFactor;
      const newH = prev.h * zoomFactor;
      // Adjust x and y to keep center
      const newX = prev.x + (prev.w - newW) / 2;
      const newY = prev.y + (prev.h - newH) / 2;
      
      return { x: newX, y: newY, w: newW, h: newH };
    });
  };

  const resetView = () => {
    setViewBox({ x: 0, y: 0, w: 400, h: 300 });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-bold">Pan & Zoom 实验室</h3>
          <p className="text-xs text-muted-foreground mt-1">
            在画面上按住鼠标<b>拖拽 (Pan)</b>，或者使用鼠标滚轮<b>缩放 (Zoom)</b>。
          </p>
        </div>
        <button 
          onClick={resetView}
          className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-md hover:bg-secondary/80"
        >
          重置视角
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="border-2 border-primary/20 rounded-lg overflow-hidden relative cursor-grab active:cursor-grabbing bg-[#1e1e1e]">
            {/* The actual interactive SVG */}
            <svg 
              ref={svgRef}
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`} 
              className="w-full aspect-[4/3] touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {/* Background grid representing the infinite canvas */}
              <defs>
                <pattern id="infinite-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect x="-5000" y="-5000" width="10000" height="10000" fill="url(#infinite-grid)" />
              
              {/* Some content to look at */}
              <circle cx="200" cy="150" r="80" fill="#3b82f6" opacity="0.8" />
              <rect x="50" y="50" width="100" height="100" fill="#ef4444" opacity="0.8" rx="10" />
              <polygon points="300,50 350,150 250,150" fill="#10b981" opacity="0.8" />
              
              <text x="200" y="155" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                SVG 世界的中心
              </text>
              <text x="200" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">
                (200, 150)
              </text>
            </svg>
            
            {/* Overlay showing current state */}
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono p-2 rounded backdrop-blur-sm">
              <span className="text-muted-foreground">当前 viewBox:</span><br/>
              <span className="text-blue-300">x: </span>{Math.round(viewBox.x)} <br/>
              <span className="text-green-300">y: </span>{Math.round(viewBox.y)} <br/>
              <span className="text-purple-300">w: </span>{Math.round(viewBox.w)} <br/>
              <span className="text-orange-300">h: </span>{Math.round(viewBox.h)}
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg text-xs font-mono flex flex-col justify-center space-y-4">
          <p className="text-muted-foreground mb-2">底层原理：</p>
          <div>
            <span className="text-foreground font-bold border-b border-primary pb-1">1. 平移 (Pan)</span>
            <p className="mt-2 text-muted-foreground">
              拖拽时，我们没有移动任何内部元素，而是反向改变了 viewBox 的 <code>x</code> 和 <code>y</code> 值。摄像机往左移，画面看起来就往右走。
            </p>
          </div>
          <div>
            <span className="text-foreground font-bold border-b border-primary pb-1">2. 缩放 (Zoom)</span>
            <p className="mt-2 text-muted-foreground">
              滚轮时，我们改变了 viewBox 的 <code>width</code> 和 <code>height</code>。取景框变小，里面的东西看起来就放大了。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

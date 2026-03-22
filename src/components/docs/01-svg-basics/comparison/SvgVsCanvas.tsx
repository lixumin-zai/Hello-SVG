'use client';

import { useState, useRef, useEffect } from 'react';

export function SvgVsCanvas() {
  const [elementCount, setElementCount] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Update canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw elements
    for (let i = 0; i < elementCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 10 + 2;
      
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${(i * 137.5) % 360}, 70%, 50%)`;
      ctx.fill();
    }
  }, [elementCount]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 调节元素数量，对比 SVG（保留 DOM 节点）与 Canvas（直接绘制像素）的差异
      </p>
      
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium w-24">元素数量: {elementCount}</span>
        <input
          type="range"
          min="10"
          max="2000"
          step="10"
          value={elementCount}
          onChange={(e) => setElementCount(parseInt(e.target.value))}
          className="flex-1 cursor-pointer accent-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Side */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <span className="font-semibold text-primary">SVG (声明式 / DOM)</span>
            <span className="text-xs text-muted-foreground">会生成 {elementCount} 个 DOM 节点</span>
          </div>
          <div className="h-64 border rounded-lg bg-background overflow-hidden relative">
            <svg width="100%" height="100%" className="absolute inset-0">
              {Array.from({ length: elementCount }).map((_, i) => {
                // Fixed random seed for deterministic rendering in this demo
                const seed = (i * 137.5) % 1000 / 1000;
                const seed2 = (i * 113.1) % 1000 / 1000;
                const seed3 = (i * 179.3) % 1000 / 1000;
                
                return (
                  <circle
                    key={i}
                    cx={`${seed * 100}%`}
                    cy={`${seed2 * 100}%`}
                    r={seed3 * 10 + 2}
                    fill={`hsl(${(i * 137.5) % 360}, 70%, 50%)`}
                    className="cursor-pointer hover:opacity-50 transition-opacity"
                    onClick={() => alert(`你点击了 SVG 的第 ${i+1} 个节点！这就是保留 DOM 的优势。`)}
                  />
                );
              })}
            </svg>
          </div>
          <p className="text-xs text-muted-foreground px-2">
            ✅ <strong>交互容易</strong>：试着点击上方的圆圈，每个圆圈都是独立的 DOM 节点，可以绑定事件。<br/>
            ❌ <strong>性能瓶颈</strong>：当数量超过几千时，浏览器要维护庞大的 DOM 树，会导致页面卡顿。
          </p>
        </div>

        {/* Canvas Side */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <span className="font-semibold text-orange-500">Canvas (命令式 / 像素)</span>
            <span className="text-xs text-muted-foreground">只有 1 个 Canvas 节点</span>
          </div>
          <div className="h-64 border rounded-lg bg-background overflow-hidden relative">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={256} 
              className="absolute inset-0 w-full h-full object-cover"
              onClick={() => alert('你点击了整个 Canvas 元素。要想知道点击了哪个圆圈，需要自己计算鼠标坐标与圆的几何碰撞！')}
            />
          </div>
          <p className="text-xs text-muted-foreground px-2">
            ✅ <strong>性能极高</strong>：适合渲染上万个元素（如游戏、粒子特效），因为画完就变成像素，不占内存。<br/>
            ❌ <strong>交互困难</strong>：试着点击上方的圆圈，无法单独绑定事件，只能获取整个画布的点击坐标并自己进行碰撞计算。
          </p>
        </div>
      </div>
    </div>
  );
}
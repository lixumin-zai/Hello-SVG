'use client';

import { useState, useEffect } from 'react';

export function PerformanceVisualizer() {
  const [elementCount, setElementCount] = useState(100);
  const [fps, setFps] = useState(60);

  // Simple FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const calculateFps = (currentTime: number) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(calculateFps);
    };

    animationFrameId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Generate random circles
  const circles = Array.from({ length: elementCount }).map((_, i) => {
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const r = Math.random() * 5 + 1;
    const isAnimating = Math.random() > 0.5;
    return (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill={`hsl(${Math.random() * 360}, 70%, 50%)`}
        opacity={0.6}
        className={isAnimating ? 'animate-pulse' : ''}
      >
        {isAnimating && (
          <animate
            attributeName="cy"
            values={`${cy};${cy + 10};${cy}`}
            dur={`${Math.random() * 2 + 1}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
    );
  });

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-2 flex justify-between">
            <span>DOM 节点数量: <span className="text-primary font-bold">{elementCount}</span></span>
            <span className={`font-mono font-bold ${fps < 30 ? 'text-red-500' : fps < 50 ? 'text-orange-500' : 'text-green-500'}`}>
              FPS: {fps}
            </span>
          </label>
          <input
            type="range"
            min="10"
            max="5000"
            step="10"
            value={elementCount}
            onChange={(e) => setElementCount(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="relative aspect-video max-w-2xl mx-auto border border-dashed rounded-lg bg-black overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {circles}
        </svg>
        
        {elementCount > 2000 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 text-center animate-in fade-in">
            <div className="max-w-sm">
              <p className="text-red-500 font-bold mb-2">⚠️ 性能警告</p>
              <p className="text-sm">当 SVG 中的独立 DOM 节点（特别是带动画的节点）超过几千个时，浏览器的渲染和重排成本将急剧上升，导致掉帧。</p>
              <p className="text-xs text-muted-foreground mt-2">（在这种数据量级下，应该考虑使用 Canvas 或 WebGL）</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

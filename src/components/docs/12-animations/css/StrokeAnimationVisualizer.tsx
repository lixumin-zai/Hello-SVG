'use client';

import React, { useState, useEffect } from 'react';

export function StrokeAnimationVisualizer() {
  const [dashArray, setDashArray] = useState(1000);
  const [dashOffset, setDashOffset] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 2000; // 2 seconds

    if (isPlaying) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const currentProgress = Math.min(elapsed / duration, 1);
        
        setProgress(currentProgress);
        setDashOffset(dashArray * (1 - currentProgress));

        if (currentProgress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, dashArray]);

  const handlePlay = () => {
    setProgress(0);
    setDashOffset(dashArray);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setDashOffset(dashArray);
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 拖动滑块或点击播放，观察 dashoffset 如何实现画线效果。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：可视化 */}
        <div className="relative aspect-video md:aspect-square w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* 底色辅助线 */}
            <path 
              d="M 40 160 C 40 40, 160 40, 160 160" 
              fill="none" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-20"
            />
            
            {/* 动画线条 */}
            <path 
              d="M 40 160 C 40 40, 160 40, 160 160" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              className="transition-all duration-75"
            />
          </svg>
        </div>

        {/* 右侧：控制与代码 */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="font-semibold">stroke-dasharray</span>
              <span className="text-muted-foreground">{dashArray}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="font-semibold text-primary">stroke-dashoffset</span>
                <span className="text-primary font-bold">{Math.round(dashOffset)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={dashArray} 
                value={dashOffset} 
                onChange={(e) => {
                  setDashOffset(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full accent-primary"
              />
              <p className="text-xs text-muted-foreground">当 offset 等于 array 时，线条完全隐藏；当 offset 为 0 时，线条完全显示。</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handlePlay}
                disabled={isPlaying}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPlaying ? '播放中...' : '▶ 播放动画'}
              </button>
              <button 
                onClick={handleReset}
                className="py-2 px-4 border border-border bg-background rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-mono text-sm font-semibold mb-2">CSS 核心代码</h3>
            <pre className="text-xs font-mono text-muted-foreground whitespace-pre overflow-x-auto">
{`.draw-line {
  stroke-dasharray: ${dashArray};
  stroke-dashoffset: ${Math.round(dashOffset)};
${isPlaying ? '  animation: draw 2s ease forwards;' : '  /* 等待动画触发 */'}
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

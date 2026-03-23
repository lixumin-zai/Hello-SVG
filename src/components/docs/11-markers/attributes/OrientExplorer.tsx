'use client';

import React, { useState, useEffect } from 'react';

export function OrientExplorer() {
  const [orient, setOrient] = useState('auto');
  const [offset, setOffset] = useState(0);

  // Simple animation for the path to show how "auto" follows the curve
  useEffect(() => {
    let animationFrame: number;
    let t = 0;
    
    const animate = () => {
      t += 0.02;
      setOffset(Math.sin(t) * 30);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card mt-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 切换 orient 属性，观察标记如何随着路径形状和方向进行旋转。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：动态可视化 */}
        <div className="relative aspect-video w-full rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md overflow-visible">
            <defs>
              <marker
                id="orient-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient={orient}
              >
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="hsl(var(--primary))" />
                <circle cx="5" cy="5" r="1" fill="white" />
              </marker>
            </defs>

            {/* 动态计算路径点 */}
            <path
              d={`M 20 50 Q 60 ${20 + offset} 100 50 T 180 50`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              markerStart="url(#orient-arrow)"
              markerMid="url(#orient-arrow)"
              markerEnd="url(#orient-arrow)"
              className="text-foreground"
            />
            
            {/* 标出三个关键点位置 */}
            <circle cx="20" cy="50" r="2" fill="none" stroke="hsl(var(--muted-foreground))" />
            <circle cx="100" cy="50" r="2" fill="none" stroke="hsl(var(--muted-foreground))" />
            <circle cx="180" cy="50" r="2" fill="none" stroke="hsl(var(--muted-foreground))" />
          </svg>
        </div>

        {/* 右侧：属性控制与解释 */}
        <div className="flex flex-col gap-4">
          <div className="space-y-3 bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-sm">选择 orient 属性值：</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="orient" value="auto" checked={orient === 'auto'} onChange={() => setOrient('auto')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">auto</span>
                  <span className="text-xs text-muted-foreground">自动计算路径在该点的切线方向，箭头始终顺着线条方向。</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="orient" value="auto-start-reverse" checked={orient === 'auto-start-reverse'} onChange={() => setOrient('auto-start-reverse')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">auto-start-reverse</span>
                  <span className="text-xs text-muted-foreground">如果箭头放在起点，会自动调转 180 度。非常适合做双向箭头！</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="orient" value="0" checked={orient === '0'} onChange={() => setOrient('0')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">0</span>
                  <span className="text-xs text-muted-foreground">固定角度 0 度。无论线条怎么弯，箭头永远保持水平向右。</span>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-background transition-colors">
                <input type="radio" name="orient" value="90" checked={orient === '90'} onChange={() => setOrient('90')} className="accent-primary w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold">90</span>
                  <span className="text-xs text-muted-foreground">固定角度 90 度。箭头永远垂直向下。</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

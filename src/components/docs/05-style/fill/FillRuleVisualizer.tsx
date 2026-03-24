'use client';

import { useState } from 'react';

export function FillRuleVisualizer() {
  const [rule, setRule] = useState<'nonzero' | 'evenodd'>('nonzero');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <p className="text-sm text-muted-foreground mb-4">▶ 切换填充规则，观察中间交集区域的变化</p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex gap-2">
            <button 
              onClick={() => setRule('nonzero')}
              className={`flex-1 px-4 py-2 text-sm rounded-lg border transition-all ${rule === 'nonzero' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-secondary'}`}
            >
              nonzero (非零环绕)
            </button>
            <button 
              onClick={() => setRule('evenodd')}
              className={`flex-1 px-4 py-2 text-sm rounded-lg border transition-all ${rule === 'evenodd' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-secondary'}`}
            >
              evenodd (奇偶环绕)
            </button>
          </div>
          
          <div className="text-sm mt-2 p-4 bg-muted/50 rounded-lg min-h-[100px] flex items-center">
            {rule === 'nonzero' 
              ? '【默认值】通过“射线法”计算：如果一条射线穿过路径，顺时针穿过+1，逆时针穿过-1。结果不为 0 即认为是内部（填充）。所以默认情况下，五角星的中心和同向绘制的同心圆内部都会被填满。' 
              : '通过“射线法”计算：射线穿过路径边界的次数，奇数次视为内部（填充），偶数次视为外部（不填充）。这是在 SVG 中制作“镂空”、“圆环”效果最简单的方法！'}
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">复杂多边形 (五角星)</span>
            <svg width="120" height="120" viewBox="0 0 100 100" className="bg-background rounded-lg border border-border shadow-sm">
              <path 
                d="M 50 5 L 64 95 L 10 35 L 90 35 L 36 95 Z" 
                fill="#3b82f6" 
                fillRule={rule}
                stroke="#1e3a8a"
                strokeWidth="2"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">复合路径 (同向同心圆)</span>
            <svg width="120" height="120" viewBox="0 0 100 100" className="bg-background rounded-lg border border-border shadow-sm">
              <path 
                d="M 50 10 A 40 40 0 1 1 49.9 10 M 50 25 A 25 25 0 1 1 49.9 25" 
                fill="#ef4444" 
                fillRule={rule}
                stroke="#7f1d1d"
                strokeWidth="2"
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

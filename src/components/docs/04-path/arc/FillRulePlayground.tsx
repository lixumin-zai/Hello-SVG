'use client';

import { useState } from 'react';

export function FillRulePlayground() {
  const [fillRule, setFillRule] = useState<'nonzero' | 'evenodd'>('nonzero');
  
  // A star path and an inner hole path
  const pathData = "M 150 20 L 190 110 L 290 110 L 210 170 L 240 270 L 150 210 L 60 270 L 90 170 L 10 110 L 110 110 Z M 150 80 L 120 160 L 180 160 Z";

  // Two intersecting circles
  const circlesPath = "M 100 150 A 60 60 0 1 1 100 149.9 Z M 200 150 A 60 60 0 1 1 200 149.9 Z";

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Controls */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <h4 className="font-bold mb-3">填充规则 (fill-rule)</h4>
            <div className="flex flex-col gap-3">
              <label className={`p-3 border rounded-lg cursor-pointer transition-colors ${fillRule === 'nonzero' ? 'bg-primary/10 border-primary' : 'hover:bg-secondary'}`}>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    checked={fillRule === 'nonzero'} 
                    onChange={() => setFillRule('nonzero')} 
                    className="accent-primary"
                  />
                  <span className="font-bold">nonzero</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-5">
                  非零环绕规则（默认）。根据路径绘制的方向来判断内部和外部。
                </p>
              </label>
              
              <label className={`p-3 border rounded-lg cursor-pointer transition-colors ${fillRule === 'evenodd' ? 'bg-primary/10 border-primary' : 'hover:bg-secondary'}`}>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    checked={fillRule === 'evenodd'} 
                    onChange={() => setFillRule('evenodd')} 
                    className="accent-primary"
                  />
                  <span className="font-bold">evenodd</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-5">
                  奇偶规则。简单计算射线穿过路径的次数，奇数次为内部，偶数次为外部。忽略绘制方向。
                </p>
              </label>
            </div>
          </div>
          
          <div className="p-3 bg-muted rounded text-xs font-mono break-all text-primary">
            fill-rule="{fillRule}"
          </div>
        </div>

        {/* Display */}
        <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
          <div className="border rounded-lg bg-grid-pattern h-[200px] overflow-hidden bg-background relative flex flex-col items-center">
            <span className="text-xs text-muted-foreground absolute top-2 left-2">自相交路径</span>
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <path 
                d={pathData} 
                fill="rgba(59, 130, 246, 0.8)" 
                stroke="#1d4ed8" 
                strokeWidth="2" 
                fillRule={fillRule} 
              />
            </svg>
          </div>

          <div className="border rounded-lg bg-grid-pattern h-[200px] overflow-hidden bg-background relative flex flex-col items-center">
             <span className="text-xs text-muted-foreground absolute top-2 left-2">重叠子路径</span>
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              <path 
                d={circlesPath} 
                fill="rgba(16, 185, 129, 0.8)" 
                stroke="#047857" 
                strokeWidth="2" 
                fillRule={fillRule} 
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
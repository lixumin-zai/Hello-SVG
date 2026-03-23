'use client';

import React, { useState } from 'react';
import { MousePointer2, GitCommit, Infinity } from 'lucide-react';

const curves = [
  {
    id: 'Q',
    name: '二次贝塞尔 (Q / q)',
    icon: GitCommit,
    description: '由 3 个点决定：起点、1个控制点、终点。你可以想象起点和终点之间有一根松弛的橡皮筋，你捏住控制点往外拉，橡皮筋就会跟着弯曲。',
    syntax: 'Q cx cy, x y',
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        {/* Helper Lines */}
        <path d="M 40 80 L 100 20 L 160 80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" fill="none" />
        
        {/* Curve */}
        <path d="M 40 80 Q 100 20, 160 80" stroke="currentColor" strokeWidth="3" fill="none" className="text-foreground" />
        
        {/* Points */}
        <circle cx="40" cy="80" r="4" className="fill-slate-500" />
        <text x="40" y="100" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">起点</text>
        
        <circle cx="160" cy="80" r="4" className="fill-slate-500" />
        <text x="160" y="100" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">终点 (x,y)</text>
        
        <circle cx="100" cy="20" r="5" className="fill-blue-500" />
        <text x="100" y="10" className="text-xs fill-blue-500 font-mono font-bold" textAnchor="middle">控制点 (cx,cy)</text>
      </svg>
    ),
    shortcut: 'T 命令（平滑二次贝塞尔）：接在 Q 后面，会自动以上一个控制点为中心对称生成新的控制点。'
  },
  {
    id: 'C',
    name: '三次贝塞尔 (C / c)',
    icon: Infinity,
    description: '由 4 个点决定，它比 Q 命令多了一个控制点，因此可以画出 S 型 的曲线。',
    syntax: 'C cx1 cy1, cx2 cy2, x y',
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        {/* Helper Lines */}
        <path d="M 30 60 L 80 10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" fill="none" />
        <path d="M 170 60 L 120 110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" fill="none" />
        
        {/* Curve */}
        <path d="M 30 60 C 80 10, 120 110, 170 60" stroke="currentColor" strokeWidth="3" fill="none" className="text-foreground" />
        
        {/* Points */}
        <circle cx="30" cy="60" r="4" className="fill-slate-500" />
        <text x="15" y="63" className="text-[10px] fill-slate-500 font-mono" textAnchor="end">起点</text>
        
        <circle cx="170" cy="60" r="4" className="fill-slate-500" />
        <text x="185" y="63" className="text-[10px] fill-slate-500 font-mono" textAnchor="start">终点 (x,y)</text>
        
        <circle cx="80" cy="10" r="5" className="fill-blue-500" />
        <text x="80" y="0" className="text-xs fill-blue-500 font-mono font-bold" textAnchor="middle">cx1,cy1</text>
        
        <circle cx="120" cy="110" r="5" className="fill-red-500" />
        <text x="120" y="125" className="text-xs fill-red-500 font-mono font-bold" textAnchor="middle">cx2,cy2</text>
      </svg>
    ),
    shortcut: 'S 命令（平滑三次贝塞尔）：接在 C 后面，会自动对称生成第一个控制点，常用于画连续波浪。'
  }
];

export function BezierAnatomy() {
  const [activeTab, setActiveTab] = useState(curves[0].id);
  const activeCurve = curves.find(c => c.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，对比二次和三次贝塞尔曲线的控制点差异</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 flex flex-col gap-2">
          {curves.map(curve => {
            const Icon = curve.icon;
            const isActive = activeTab === curve.id;
            return (
              <button
                key={curve.id}
                onClick={() => setActiveTab(curve.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium font-mono">{curve.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 font-mono">
              语法：<code>{activeCurve.syntax}</code>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeCurve.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center border border-border h-48 relative">
             {activeCurve.visual}
          </div>

          <div className="mt-auto bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 p-4 rounded-md text-sm">
            <span className="font-bold">✨ 简写技巧：</span>
            {activeCurve.shortcut}
          </div>
        </div>
      </div>
    </div>
  );
}

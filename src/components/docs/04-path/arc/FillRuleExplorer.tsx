'use client';

import React, { useState } from 'react';
import { MousePointer2, PaintBucket, HelpCircle } from 'lucide-react';

const rules = [
  {
    id: 'nonzero',
    name: 'nonzero (默认)',
    description: '非零环绕规则。想象从图形内部射出一条射线：穿过一条从左向右画的线计数 +1，穿过从右向左画的线计数 -1。如果最后总和不是 0，就在内部（填充）。',
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        {/* Outer path (clockwise) */}
        <path d="M 50 10 L 150 10 L 150 110 L 50 110 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" markerMid="url(#arrow-cw)" markerStart="url(#arrow-cw)" />
        
        {/* Inner path (counter-clockwise) */}
        <path d="M 70 30 L 70 90 L 130 90 L 130 30 Z" fill="white" stroke="#ef4444" strokeWidth="2" markerMid="url(#arrow-ccw)" markerStart="url(#arrow-ccw)" />
        
        {/* Ray casting */}
        <path d="M 100 60 L 180 60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow-ray)" />
        <circle cx="100" cy="60" r="4" fill="#f59e0b" />
        
        {/* Annotations */}
        <text x="135" y="55" className="text-xs fill-red-500 font-bold" textAnchor="start">-1</text>
        <text x="155" y="55" className="text-xs fill-blue-500 font-bold" textAnchor="start">+1</text>
        <text x="185" y="65" className="text-xs fill-amber-500 font-bold" textAnchor="start">总和=0 (不填充)</text>

        <defs>
          <marker id="arrow-cw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-ccw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
          <marker id="arrow-ray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    ),
    implication: '如果要画一个镂空的甜甜圈，外圈必须顺时针画，内圈必须逆时针画！方向极其重要。'
  },
  {
    id: 'evenodd',
    name: 'evenodd (奇偶规则)',
    description: '不关心画线的方向！只要射线穿过路径的次数是奇数次，就在内部（填充）；如果是偶数次，就在外部（不填充）。',
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        {/* Outer path (direction doesn't matter) */}
        <path d="M 50 10 L 150 10 L 150 110 L 50 110 Z" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
        
        {/* Inner path (direction doesn't matter) */}
        <path d="M 70 30 L 130 30 L 130 90 L 70 90 Z" fill="white" stroke="#10b981" strokeWidth="2" />
        
        {/* Ray casting */}
        <path d="M 100 60 L 180 60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow-ray-eo)" />
        <circle cx="100" cy="60" r="4" fill="#f59e0b" />
        
        {/* Annotations */}
        <text x="135" y="55" className="text-xs fill-emerald-500 font-bold" textAnchor="start">1</text>
        <text x="155" y="55" className="text-xs fill-emerald-500 font-bold" textAnchor="start">2</text>
        <text x="185" y="65" className="text-xs fill-amber-500 font-bold" textAnchor="start">偶数次 (不填充)</text>

        <defs>
          <marker id="arrow-ray-eo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    ),
    implication: '对于制作复杂镂空图标，使用 evenodd 通常更简单，不用管设计软件是怎么画这些线的，直接“逢双镂空”。'
  }
];

export function FillRuleExplorer() {
  const [activeTab, setActiveTab] = useState(rules[0].id);
  const activeRule = rules.find(r => r.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，直观理解两种填充规则的计算原理</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 flex flex-col gap-2">
          {rules.map(rule => {
            const isActive = activeTab === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setActiveTab(rule.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <PaintBucket className="h-5 w-5" />
                <span className="font-medium font-mono">{rule.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 font-mono">
              fill-rule="{activeRule.id}"
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeRule.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center border border-border h-48 relative bg-white dark:bg-slate-950">
             {activeRule.visual}
          </div>

          <div className="mt-auto bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 p-4 rounded-md text-sm flex gap-3">
            <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="leading-relaxed"><span className="font-bold">实战意义：</span>{activeRule.implication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

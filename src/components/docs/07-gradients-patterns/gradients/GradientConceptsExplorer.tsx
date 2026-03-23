'use client';

import React, { useState } from 'react';

const concepts = [
  {
    id: 'linear',
    name: '线性渐变 (x1, y1, x2, y2)',
    desc: '通过两点定义一条方向向量，颜色沿着这条直线均匀过渡。'
  },
  {
    id: 'radial',
    name: '径向渐变焦点 (fx, fy)',
    desc: '焦点定义了 0% 颜色开始的位置。偏离中心的焦点能画出带立体高光的球体。'
  },
  {
    id: 'stop',
    name: '<stop> 颜色节点',
    desc: '无论哪种渐变，都需要嵌套 <stop> 来定义颜色在 offset 处的值和透明度。'
  }
];

export function GradientConceptsExplorer() {
  const [activeTab, setActiveTab] = useState(concepts[0].id);

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row border-b border-border bg-muted/30">
        {concepts.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === c.id 
                ? 'border-b-2 border-primary text-primary bg-background' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div key={activeTab} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-base font-medium">{concepts.find(c => c.id === activeTab)?.desc}</p>
          
          <div className="mt-4 rounded-lg bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] border border-dashed border-border p-8 min-h-[200px] flex justify-center items-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
              <defs>
                <linearGradient id="demo-linear" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                
                <radialGradient id="demo-radial" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </radialGradient>
              </defs>

              {activeTab === 'linear' && (
                <>
                  <rect x="20" y="20" width="160" height="160" fill="url(#demo-linear)" rx="10" />
                  <line x1="20" y1="20" x2="180" y2="180" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="20" cy="20" r="4" fill="white" />
                  <text x="20" y="10" fill="currentColor" fontSize="12">(x1, y1)</text>
                  <circle cx="180" cy="180" r="4" fill="white" />
                  <text x="180" y="195" fill="currentColor" fontSize="12">(x2, y2)</text>
                </>
              )}

              {activeTab === 'radial' && (
                <>
                  <circle cx="100" cy="100" r="80" fill="url(#demo-radial)" />
                  <circle cx="68" cy="68" r="4" fill="#f97316" />
                  <text x="68" y="55" fill="#f97316" fontSize="12" textAnchor="middle">焦点 (fx, fy)</text>
                  <circle cx="100" cy="100" r="4" fill="currentColor" />
                  <text x="100" y="115" fill="currentColor" fontSize="12" textAnchor="middle">中心 (cx, cy)</text>
                </>
              )}

              {activeTab === 'stop' && (
                <g>
                  <rect x="20" y="80" width="160" height="40" fill="url(#demo-linear)" rx="20" />
                  <circle cx="20" cy="100" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <text x="20" y="140" fill="currentColor" fontSize="12" textAnchor="middle">offset="0%"</text>
                  <circle cx="180" cy="100" r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <text x="180" y="140" fill="currentColor" fontSize="12" textAnchor="middle">offset="100%"</text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
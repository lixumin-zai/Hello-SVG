'use client';

import React, { useState } from 'react';
import { MousePointer2, Minus, Activity, Square, AlertTriangle } from 'lucide-react';

const shapes = [
  {
    id: 'line',
    name: '<line> 直线',
    icon: Minus,
    description: '最基础的元素，由起点和终点构成。直线没有面积，只响应 stroke 属性。',
    code: `<line 
  x1="20" y1="20" 
  x2="180" y2="80" 
  stroke="black" stroke-width="4" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
        <line x1="20" y1="20" x2="180" y2="80" stroke="currentColor" strokeWidth="4" className="text-foreground" />
        
        {/* Annotations */}
        <circle cx="20" cy="20" r="4" className="fill-blue-500" />
        <text x="20" y="10" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">x1, y1</text>
        
        <circle cx="180" cy="80" r="4" className="fill-blue-500" />
        <text x="180" y="95" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">x2, y2</text>
      </svg>
    ),
    warning: '直线没有面积，只有长度！它不响应 fill 属性，必须设置 stroke 否则不可见。'
  },
  {
    id: 'polyline',
    name: '<polyline> 折线',
    icon: Activity,
    description: '一系列相连的直线段。主要用于绘制折线图或多边形的未闭合边缘。',
    code: `<polyline 
  points="20,80 60,20 100,80 140,20 180,80" 
  fill="none" 
  stroke="black" stroke-width="4" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <polyline points="20,80 60,20 100,80 140,20 180,80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-foreground" />
        
        {/* Annotations */}
        {[[20,80], [60,20], [100,80], [140,20], [180,80]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" className="fill-blue-500" />
            <text x={x} y={y > 50 ? y + 15 : y - 8} className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">点{i+1}</text>
          </g>
        ))}
      </svg>
    ),
    warning: '默认是不闭合的！起点和终点不会自动连起来（与 <polygon> 不同）。'
  },
  {
    id: 'rect',
    name: '<rect> 矩形',
    icon: Square,
    description: '绘制矩形或圆角矩形。通过 x/y 定位左上角，width/height 控制尺寸。',
    code: `<rect 
  x="40" y="20" 
  width="120" height="60" 
  rx="10" ry="10" 
  fill="blue" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <rect x="40" y="20" width="120" height="60" rx="10" ry="10" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        
        {/* Annotations */}
        <circle cx="40" cy="20" r="4" className="fill-blue-500" />
        <text x="35" y="15" className="text-[10px] fill-blue-500 font-mono" textAnchor="end">x, y (左上角)</text>
        
        {/* Width/Height lines */}
        <line x1="40" y1="10" x2="160" y2="10" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrow-w)" markerStart="url(#arrow-w-start)" />
        <text x="100" y="5" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">width</text>
        
        <line x1="170" y1="20" x2="170" y2="80" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrow-h)" markerStart="url(#arrow-h-start)" />
        <text x="175" y="52" className="text-[10px] fill-blue-500 font-mono" textAnchor="start">height</text>
        
        {/* rx/ry arc annotation */}
        <path d="M 160 20 A 10 10 0 0 1 150 30" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="2,2" />
        <text x="145" y="40" className="text-[10px] fill-red-500 font-mono" textAnchor="end">rx, ry</text>
        
        <defs>
          <marker id="arrow-w" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-w-start" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-h" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-h-start" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
    ),
    warning: '坐标 x, y 定义的是矩形的左上角，而不是中心点！圆角 rx/ry 如果超过宽度的一半，会自动被限制（可用于画胶囊）。'
  }
];

export function LineRectAnatomy() {
  const [activeTab, setActiveTab] = useState(shapes[0].id);
  const activeShape = shapes.find(s => s.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，查看每种形状的核心属性图解</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 flex flex-col gap-2">
          {shapes.map(shape => {
            const Icon = shape.icon;
            const isActive = activeTab === shape.id;
            return (
              <button
                key={shape.id}
                onClick={() => setActiveTab(shape.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium font-mono">{shape.id}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 font-mono">
              {activeShape.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeShape.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center border border-border h-48 relative">
             {activeShape.visual}
          </div>

          {activeShape.warning && (
            <div className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 p-4 rounded-md text-sm flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{activeShape.warning}</p>
            </div>
          )}

          <div className="mt-auto border-t border-border pt-4">
            <pre className="text-sm font-mono text-foreground bg-muted p-4 rounded-md overflow-x-auto">
              <code>{activeShape.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

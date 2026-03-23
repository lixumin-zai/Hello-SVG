'use client';

import React, { useState } from 'react';
import { MousePointer2, Circle, Hexagon, Info } from 'lucide-react';

const shapes = [
  {
    id: 'circle',
    name: '<circle> 圆形',
    icon: Circle,
    description: '最常用的形状之一，基于中心点 (cx, cy) 和半径 (r) 绘制。',
    code: `<circle 
  cx="100" cy="50" 
  r="40" 
  fill="none" stroke="black" stroke-width="4" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <circle cx="100" cy="50" r="40" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        
        {/* Center */}
        <circle cx="100" cy="50" r="3" className="fill-blue-500" />
        <text x="100" y="65" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">cx, cy</text>
        
        {/* Radius */}
        <line x1="100" y1="50" x2="140" y2="50" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="120" y="45" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">r</text>
      </svg>
    ),
    tip: '常用于头像占位符、散点图、雷达图的基础点，或者动画的涟漪效果。'
  },
  {
    id: 'ellipse',
    name: '<ellipse> 椭圆',
    icon: Circle,
    description: '当你需要一个被“压扁”的圆时使用，分别拥有 X 轴半径和 Y 轴半径。',
    code: `<ellipse 
  cx="100" cy="50" 
  rx="60" ry="30" 
  fill="none" stroke="black" stroke-width="4" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <ellipse cx="100" cy="50" rx="60" ry="30" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        
        {/* Center */}
        <circle cx="100" cy="50" r="3" className="fill-blue-500" />
        
        {/* rx */}
        <line x1="100" y1="50" x2="160" y2="50" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="130" y="45" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">rx</text>

        {/* ry */}
        <line x1="100" y1="50" x2="100" y2="20" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="95" y="35" className="text-[10px] fill-red-500 font-mono" textAnchor="end">ry</text>
      </svg>
    ),
    tip: '技巧：虽然 <rect> 可以做圆角，但在某些特定图表（如组织架构图节点）中使用 <ellipse> 会更柔和。'
  },
  {
    id: 'polygon',
    name: '<polygon> 多边形',
    icon: Hexagon,
    description: '绘制至少有 3 个边的闭合图形。坐标格式与 <polyline> 完全一样，但会自动闭合。',
    code: `<polygon 
  points="100,10 140,90 60,90" 
  fill="blue" 
/>`,
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <polygon points="100,10 140,90 60,90" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="text-foreground" />
        
        {/* Points */}
        <circle cx="100" cy="10" r="4" className="fill-blue-500" />
        <text x="100" y="0" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">点1</text>
        
        <circle cx="140" cy="90" r="4" className="fill-blue-500" />
        <text x="150" y="95" className="text-[10px] fill-blue-500 font-mono" textAnchor="start">点2</text>
        
        <circle cx="60" cy="90" r="4" className="fill-blue-500" />
        <text x="50" y="95" className="text-[10px] fill-blue-500 font-mono" textAnchor="end">点3</text>

        {/* Auto-closing line visualization */}
        <path d="M 60 90 L 100 10" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <text x="65" y="45" className="text-[10px] fill-red-500 font-mono font-bold" textAnchor="start">自动闭合</text>
      </svg>
    ),
    tip: 'Polygon vs Polyline: 如果需要填充颜色，使用 polygon；如果只是画一条开放的轨迹线，必须使用 polyline。'
  }
];

export function RadialPolygonAnatomy() {
  const [activeTab, setActiveTab] = useState(shapes[0].id);
  const activeShape = shapes.find(s => s.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，探索基于中心点和多边形的核心属性</span>
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

          {activeShape.tip && (
            <div className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 p-4 rounded-md text-sm flex gap-3">
              <Info className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{activeShape.tip}</p>
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

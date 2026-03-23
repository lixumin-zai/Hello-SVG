'use client';

import React, { useState } from 'react';
import { MousePointer2, AlignLeft, WrapText, Navigation, AlertTriangle } from 'lucide-react';

const textFeatures = [
  {
    id: 'anchor',
    name: '基础与对齐 (text-anchor)',
    icon: AlignLeft,
    description: '通过 x, y 设置文本的锚点，然后使用 text-anchor 属性决定文本如何相对于该锚点对齐。',
    code: `<text x="100" y="30" text-anchor="start">Start</text>
<text x="100" y="60" text-anchor="middle">Middle</text>
<text x="100" y="90" text-anchor="end">End</text>`,
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        {/* Anchor line */}
        <line x1="100" y1="10" x2="100" y2="110" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" />
        <text x="100" y="5" className="text-[10px] fill-red-500 font-mono" textAnchor="middle">x=100 (锚点)</text>
        
        {/* Start */}
        <circle cx="100" cy="30" r="3" className="fill-red-500" />
        <text x="100" y="30" className="text-sm fill-foreground" textAnchor="start">start (左对齐)</text>
        
        {/* Middle */}
        <circle cx="100" cy="60" r="3" className="fill-red-500" />
        <text x="100" y="60" className="text-sm fill-foreground" textAnchor="middle">middle (居中)</text>
        
        {/* End */}
        <circle cx="100" cy="90" r="3" className="fill-red-500" />
        <text x="100" y="90" className="text-sm fill-foreground" textAnchor="end">end (右对齐)</text>
      </svg>
    ),
    warning: 'y 坐标默认对齐的是文字的基线 (baseline)，而不是顶部。如果设置 y="0"，文字很可能会跑到视口外面！'
  },
  {
    id: 'tspan',
    name: '换行方案 (<tspan>)',
    icon: WrapText,
    description: 'SVG 文本完全不支持自动换行！必须使用 <tspan> 元素并配合 dy 属性（相对偏移）来实现多行文本。',
    code: `<text x="20" y="30">
  <tspan x="20" dy="0">第一行：SVG</tspan>
  <tspan x="20" dy="1.2em">第二行：不支持</tspan>
  <tspan x="20" dy="1.2em">第三行：自动换行</tspan>
</text>`,
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        <text x="40" y="40" className="text-sm fill-foreground font-mono">
          <tspan x="40" dy="0">第一行：SVG</tspan>
          <tspan x="40" dy="1.5em">第二行：不支持</tspan>
          <tspan x="40" dy="1.5em">第三行：自动换行</tspan>
        </text>
        
        {/* Visualizing dy */}
        <path d="M 30 40 L 30 60" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-dy)" />
        <text x="25" y="55" className="text-[10px] fill-blue-500 font-mono" textAnchor="end">dy="1.5em"</text>

        <path d="M 30 65 L 30 85" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-dy)" />
        <text x="25" y="80" className="text-[10px] fill-blue-500 font-mono" textAnchor="end">dy="1.5em"</text>
        
        <defs>
          <marker id="arrow-dy" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
    ),
    warning: '如果要渲染大量包含自动换行的长文本，强烈建议使用 <foreignObject> 嵌入 HTML 的 <p> 或 <div> 标签，而不是强行用 SVG 排版。'
  },
  {
    id: 'textpath',
    name: '路径文字 (<textPath>)',
    icon: Navigation,
    description: '通过在 <defs> 中定义路径，再使用 <textPath> 引用该路径，文字可以像过山车一样沿着任意曲线排布。',
    code: `<defs>
  <path id="myCurve" d="M 20 80 Q 100 0, 180 80" />
</defs>
<text>
  <textPath href="#myCurve" startOffset="50%" text-anchor="middle">
    沿着曲线排布的文字
  </textPath>
</text>`,
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
        <defs>
          <path id="demoCurve" d="M 20 90 Q 100 10, 180 90" fill="none" />
        </defs>
        
        {/* Visible Path for demo */}
        <use href="#demoCurve" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
        
        <text className="text-sm font-bold fill-foreground">
          <textPath href="#demoCurve" startOffset="50%" textAnchor="middle">
            🌈 沿着曲线排布的酷炫文字
          </textPath>
        </text>
        
        {/* Start offset annotation */}
        <circle cx="100" cy="50" r="3" className="fill-blue-500" />
        <text x="100" y="40" className="text-[10px] fill-blue-500 font-mono" textAnchor="middle">startOffset="50%"</text>
      </svg>
    )
  }
];

export function TextCapabilitiesExplorer() {
  const [activeTab, setActiveTab] = useState(textFeatures[0].id);
  const activeFeature = textFeatures.find(f => f.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，探索 SVG 文本排版的三大核心能力</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 flex flex-col gap-2">
          {textFeatures.map(feature => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium font-mono text-sm">{feature.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 font-mono">
              {activeFeature.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeFeature.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center border border-border h-48 relative">
             {activeFeature.visual}
          </div>

          {activeFeature.warning && (
            <div className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 p-4 rounded-md text-sm flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{activeFeature.warning}</p>
            </div>
          )}

          <div className="mt-auto border-t border-border pt-4">
            <pre className="text-sm font-mono text-foreground bg-muted p-4 rounded-md overflow-x-auto">
              <code>{activeFeature.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

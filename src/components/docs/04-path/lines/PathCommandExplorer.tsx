'use client';

import React, { useState } from 'react';
import { MousePointer2, Move, ArrowDownRight, CornerUpLeft } from 'lucide-react';

const commands = [
  {
    id: 'M',
    name: 'M / m (Move)',
    icon: Move,
    desc: '移动画笔，但不画线（相当于提笔）。通常作为路径的第一个命令。',
    absolute: 'M 50 50',
    relative: 'm 50 50',
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <circle cx="10" cy="10" r="3" fill="#64748b" />
        <text x="10" y="25" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">原点(0,0)</text>
        
        <path d="M 10 10 L 50 50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow-cmd)" fill="none" />
        
        <circle cx="50" cy="50" r="5" className="fill-primary" />
        <text x="50" y="70" className="text-xs fill-primary font-mono font-bold" textAnchor="middle">M 50 50</text>
        
        <defs>
          <marker id="arrow-cmd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
    )
  },
  {
    id: 'L',
    name: 'L / l (Line)',
    icon: ArrowDownRight,
    desc: '从当前点画一条直线到指定坐标。',
    absolute: 'L 150 50',
    relative: 'l 100 0',
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <circle cx="50" cy="50" r="4" fill="#64748b" />
        <text x="50" y="70" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">起点(50,50)</text>
        
        <path d="M 50 50 L 150 50" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-solid)" className="text-foreground" />
        
        <circle cx="150" cy="50" r="5" className="fill-primary" />
        <text x="150" y="70" className="text-xs fill-primary font-mono font-bold" textAnchor="middle">L 150 50</text>
        
        <defs>
          <marker id="arrow-solid" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-foreground" />
          </marker>
        </defs>
      </svg>
    )
  },
  {
    id: 'HV',
    name: 'H / V (Horizontal/Vertical)',
    icon: CornerUpLeft,
    desc: 'L 的简写，分别用于画纯水平线 (H) 和纯垂直线 (V)。只需要提供一个坐标。',
    absolute: 'H 150 V 80',
    relative: 'h 100 v 30',
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <circle cx="50" cy="20" r="4" fill="#64748b" />
        
        {/* H Line */}
        <path d="M 50 20 L 150 20" stroke="currentColor" strokeWidth="3" className="text-foreground" />
        <circle cx="150" cy="20" r="4" className="fill-primary" />
        <text x="100" y="12" className="text-xs fill-primary font-mono font-bold" textAnchor="middle">H 150</text>
        
        {/* V Line */}
        <path d="M 150 20 L 150 80" stroke="currentColor" strokeWidth="3" className="text-foreground" />
        <circle cx="150" cy="80" r="5" className="fill-primary" />
        <text x="160" y="55" className="text-xs fill-primary font-mono font-bold" textAnchor="start">V 80</text>
      </svg>
    )
  },
  {
    id: 'Z',
    name: 'Z / z (Close Path)',
    icon: CornerUpLeft,
    desc: '闭合路径。从当前点画一条直线直接连回当前子路径的起点 (上一个 M 所在的位置)。大小写 z 效果完全一样。',
    absolute: 'Z',
    relative: 'z',
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        {/* Start Point M */}
        <circle cx="50" cy="20" r="5" className="fill-green-500" />
        <text x="50" y="10" className="text-[10px] fill-green-500 font-mono font-bold" textAnchor="middle">起点 (M)</text>
        
        {/* Path body */}
        <path d="M 50 20 L 150 20 L 150 80" stroke="#64748b" strokeWidth="3" fill="none" />
        <text x="160" y="80" className="text-[10px] fill-slate-500 font-mono" textAnchor="start">当前点</text>
        
        {/* Z Line */}
        <path d="M 150 80 L 50 20" stroke="currentColor" strokeWidth="3" strokeDasharray="6,4" markerEnd="url(#arrow-solid)" className="text-foreground" />
        <text x="90" y="65" className="text-xs fill-primary font-mono font-bold" textAnchor="middle">Z</text>
      </svg>
    )
  }
];

export function PathCommandExplorer() {
  const [activeTab, setActiveTab] = useState(commands[0].id);
  const activeCommand = commands.find(c => c.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击选项卡，直观理解不同的路径基础指令</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 flex flex-col gap-2">
          {commands.map(cmd => {
            const Icon = cmd.icon;
            const isActive = activeTab === cmd.id;
            return (
              <button
                key={cmd.id}
                onClick={() => setActiveTab(cmd.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium font-mono">{cmd.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 font-mono">
              {activeCommand.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeCommand.desc}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center border border-border h-48 relative">
             {activeCommand.visual}
          </div>

          <div className="mt-auto border-t border-border pt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">大写 (绝对坐标)</div>
              <div className="bg-muted px-3 py-2 rounded-md font-mono text-sm border border-border/50">
                {activeCommand.absolute}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">小写 (相对坐标)</div>
              <div className="bg-muted px-3 py-2 rounded-md font-mono text-sm border border-border/50">
                {activeCommand.relative}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

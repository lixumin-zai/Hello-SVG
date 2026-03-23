'use client';

import { useState } from 'react';
import { LayoutGrid, BarChart3, Image as ImageIcon, Map } from 'lucide-react';

export function SvgRoles() {
  const roles = [
    {
      id: 'icons',
      title: '图标系统 (Icon Systems)',
      icon: <LayoutGrid className="w-6 h-6" />,
      desc: '替代字体图标（Icon Font）。支持多色、无对齐问题、对屏幕阅读器友好。现代组件库（如 Lucide）的标准。',
      demo: (
        <div className="flex gap-4 items-center justify-center h-full text-primary">
          <LayoutGrid className="w-12 h-12" />
          <BarChart3 className="w-12 h-12" />
          <ImageIcon className="w-12 h-12" />
        </div>
      )
    },
    {
      id: 'charts',
      title: '数据可视化 (Data Viz)',
      icon: <BarChart3 className="w-6 h-6" />,
      desc: 'D3.js、Recharts 等图表库的底层渲染核心。DOM 节点特性非常适合绑定数据和添加交互事件。',
      demo: (
        <div className="flex items-end justify-center gap-2 h-full pb-4">
          {[40, 80, 60, 100, 50].map((h, i) => (
            <div 
              key={i} 
              className="w-8 bg-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-400 cursor-pointer" 
              style={{ height: h + '%' }}
            />
          ))}
        </div>
      )
    },
    {
      id: 'illustrations',
      title: '复杂插图与动画',
      icon: <ImageIcon className="w-6 h-6" />,
      desc: '完美还原设计稿的复杂插画，结合 CSS 动画或 Lottie 库，实现极具体积优势的精美动效。',
      demo: (
        <div className="flex items-center justify-center h-full">
          <svg viewBox="0 0 100 100" className="w-24 h-24 animate-[spin_8s_linear_infinite]">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="60 40" className="text-purple-500" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="30 20" className="text-pink-500 opacity-80" />
          </svg>
        </div>
      )
    },
    {
      id: 'maps',
      title: '交互式地图',
      icon: <Map className="w-6 h-6" />,
      desc: '绘制国家/世界地图。支持无极缩放和平移，省份点击高亮等交互逻辑。',
      demo: (
        <div className="flex items-center justify-center h-full">
          <svg viewBox="0 0 100 100" className="w-24 h-24 text-green-500">
            <path d="M20 50 Q 40 20, 80 40 T 80 80 Q 50 90, 20 50 Z" fill="currentColor" className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
          </svg>
        </div>
      )
    }
  ];

  const [activeId, setActiveId] = useState(roles[0].id);

  const activeRole = roles.find(r => r.id === activeId)!;

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 点击选项卡，了解 SVG 在现代前端开发中的四大核心应用场景
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="flex flex-col gap-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveId(role.id)}
              className={`flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                activeId === role.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {role.icon}
              <span className="font-medium">{role.title}</span>
            </button>
          ))}
        </div>

        {/* Content Display Area */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="h-48 border rounded-xl bg-background overflow-hidden relative p-4 shadow-inner">
            {activeRole.demo}
          </div>
          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <h4 className="font-bold text-lg mb-2">{activeRole.title}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {activeRole.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
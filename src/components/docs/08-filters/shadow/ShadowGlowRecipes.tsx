'use client';

import React, { useState } from 'react';

const recipes = [
  {
    id: 'drop-shadow',
    name: '真实投影 (Drop Shadow)',
    desc: 'CSS 的阴影只能投射在元素的矩形边框上。而 SVG 的投影会完美贴合图形的真实几何边缘。',
    code: '<feDropShadow dx="10" dy="10" stdDeviation="5" flood-color="black" flood-opacity="0.5" />',
    steps: [
      '使用 <feDropShadow> 原语',
      '设置偏移量 dx, dy',
      '设置模糊半径 stdDeviation',
      '设置颜色 flood-color'
    ]
  },
  {
    id: 'neon-glow',
    name: '霓虹发光 (Neon Glow)',
    desc: '发光效果其实就是“彩色的、没有偏移的、多次叠加的投影”。',
    steps: [
      '提取图形轮廓，填上发光颜色',
      '进行大范围高斯模糊',
      '使用 <feMerge> 把模糊后的光晕重复叠加多次',
      '最后把原图盖在最上面'
    ]
  },
  {
    id: 'gooey',
    name: '融合粘滞 (Gooey)',
    desc: '先极度模糊，再极度锐化。用于水滴融合、加载动画等。',
    steps: [
      '<feGaussianBlur>：把两个靠近的图形模糊掉，边缘交融。',
      '<feColorMatrix>：修改 Alpha 通道，设置陡峭阈值 (0 0 0 19 -9)。',
      '结果：模糊交融地带变成拥有锐利边缘的“粘连桥梁”。'
    ]
  }
];

export function ShadowGlowRecipes() {
  const [activeTab, setActiveTab] = useState(recipes[0].id);
  const activeContent = recipes.find(r => r.id === activeTab);

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row border-b border-border bg-muted/30">
        {recipes.map(r => (
          <button
            key={r.id}
            onClick={() => setActiveTab(r.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === r.id 
                ? 'border-b-2 border-primary text-primary bg-background' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
      
      <div className="p-6 min-h-[250px]">
        <div key={activeTab} className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
          <p className="text-base text-muted-foreground">{activeContent?.desc}</p>
          
          {activeContent?.code && (
            <div className="rounded bg-muted p-3 text-xs font-mono overflow-x-auto text-primary">
              {activeContent.code}
            </div>
          )}
          
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">核心配方步骤</h4>
            <div className="grid gap-2">
              {activeContent?.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-background p-3 shadow-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="text-sm">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
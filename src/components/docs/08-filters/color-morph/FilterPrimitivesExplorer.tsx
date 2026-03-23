'use client';

import React, { useState } from 'react';

const primitives = [
  {
    id: 'colorMatrix',
    name: '<feColorMatrix>',
    desc: '类似于 Photoshop 中的“色彩平衡”或“色相/饱和度”调整层。通过矩阵乘法重新计算每个像素的 RGBA 值。',
    types: [
      { name: 'hueRotate', effect: '旋转色相环，例如一键把蓝天变成紫天。' },
      { name: 'saturate', effect: '调整饱和度。值为 0 时，图像变成完美的黑白灰度图。' },
      { name: 'luminanceToAlpha', effect: '把图像的“亮度”转换成“透明度”，常用于制作自定义蒙版。' }
    ]
  },
  {
    id: 'morphology',
    name: '<feMorphology>',
    desc: '形态学滤镜，用于让图形的轮廓“变胖”或“变瘦”。',
    types: [
      { name: 'dilate (膨胀)', effect: '让图形向外扩张，常用于给没有描边属性的复杂图形加粗。' },
      { name: 'erode (腐蚀)', effect: '让图形向内收缩，如果半径足够大，图形会完全消失。' }
    ]
  },
  {
    id: 'displacementMap',
    name: '<feDisplacementMap>',
    desc: '终极魔法：置换贴图。创造水波纹、火焰扭曲、故障艺术的核心技术。',
    types: [
      { name: 'SourceGraphic', effect: '你要扭曲的目标图形。' },
      { name: 'Displacement Map', effect: '作为“参考指南”的位移图（通常使用 feTurbulence 生成柏林噪声）。' },
      { name: '扭曲规则', effect: '读取位移图颜色，根据 R/G 通道值在水平/垂直方向推挤源像素。' }
    ]
  }
];

export function FilterPrimitivesExplorer() {
  const [activeTab, setActiveTab] = useState(primitives[0].id);

  const activeContent = primitives.find(p => p.id === activeTab);

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex border-b border-border bg-muted/30">
        {primitives.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === p.id 
                ? 'border-b-2 border-primary text-primary bg-background' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-lg font-medium">{activeContent?.desc}</p>
          
          <div className="grid gap-3 mt-4">
            {activeContent?.types.map((type, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:items-center rounded-lg border border-border/50 bg-muted/20 p-3">
                <div className="font-mono text-sm font-semibold text-primary whitespace-nowrap min-w-[150px]">
                  {type.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {type.effect}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

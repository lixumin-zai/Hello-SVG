'use client';

import { useState } from 'react';
import { Box, Layers, Image as ImageIcon, FileText, Code } from 'lucide-react';

type TechType = 'webgl' | 'css' | 'raster' | 'pdf';

const comparisons = {
  webgl: {
    title: 'SVG vs. WebGL',
    icon: <Box className="w-5 h-5" />,
    svgPros: ['学习曲线平缓，基于 DOM', '天然支持 2D 矢量交互', '利于 SEO 和无障碍访问'],
    otherPros: ['性能极高，由 GPU 硬件加速', '专为 3D 渲染设计', '适合数万级节点的大规模场景'],
    verdict: '2D 图表、UI 和简单动画用 SVG；3D 游戏、复杂数据可视化（如十万个散点）用 WebGL。'
  },
  css: {
    title: 'SVG vs. CSS (Shapes)',
    icon: <Code className="w-5 h-5" />,
    svgPros: ['擅长复杂的不规则曲线（贝塞尔）', '语义化好，意图明确', '多图层叠加更容易'],
    otherPros: ['无需额外的 DOM 节点', '性能通常更好', '简单的圆角、阴影实现极快'],
    verdict: '简单几何图形（圆、矩形）用 CSS；复杂图标、插画、不规则裁剪用 SVG。最佳实践：SVG 画路径，CSS clip-path 引用。'
  },
  raster: {
    title: 'SVG vs. PNG / WebP',
    icon: <ImageIcon className="w-5 h-5" />,
    svgPros: ['无论放大多少倍都清晰', '文件体积对简单图形极小', '可通过 CSS/JS 动态修改'],
    otherPros: ['适合表现复杂的摄影照片', '色彩层次极其丰富', '渲染性能稳定（无需实时计算）'],
    verdict: 'UI 图标、Logo、插画用 SVG；真实照片、截图、色彩极其复杂的背景用 PNG/WebP/JPEG。'
  },
  pdf: {
    title: 'SVG vs. PDF',
    icon: <FileText className="w-5 h-5" />,
    svgPros: ['专为屏幕和 Web 交互设计', '支持动画和 DOM 事件', '响应式布局'],
    otherPros: ['专为物理打印设计', '严格的分页和排版控制', '支持 CMYK 色彩空间'],
    verdict: '它们是互补的文档描述语言。屏幕显示用 SVG，下载打印用 PDF。前端常有 SVG 转 PDF 的需求。'
  }
};

export function TechComparison() {
  const [activeTab, setActiveTab] = useState<TechType>('webgl');
  const data = comparisons[activeTab];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 点击左侧技术栈，对比它们与 SVG 的核心差异与适用场景
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:w-48 shrink-0">
          {(Object.keys(comparisons) as TechType[]).map((key) => {
            const item = comparisons[key];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                {item.title.split('vs. ')[1]}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-blue-500">SVG</span>
            <span className="text-muted-foreground text-sm font-normal mx-2">VS</span>
            <span>{data.title.split('vs. ')[1]}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-200 bg-blue-50/5 rounded-xl">
              <h4 className="font-semibold text-blue-500 mb-3 flex items-center gap-2">
                SVG 的优势
              </h4>
              <ul className="space-y-2">
                {data.svgPros.map((pro, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-border bg-muted/30 rounded-xl">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                {data.title.split('vs. ')[1]} 的优势
              </h4>
              <ul className="space-y-2">
                {data.otherPros.map((pro, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-0.5">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-2 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <span className="font-bold text-primary mr-2">🎯 结论：</span>
            <span className="text-sm leading-relaxed">{data.verdict}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
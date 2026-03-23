'use client';

import React, { useState } from 'react';
import { MousePointer2, Code, Image as ImageIcon, PaintBucket, Box, Link, CheckCircle2, XCircle } from 'lucide-react';

const methods = [
  {
    id: 'inline',
    name: '内联 SVG',
    icon: Code,
    pros: ['最强大，完全成为 HTML DOM 树的一部分', '支持外部 CSS (如 Tailwind) 轻松修改颜色和样式', '支持复杂的 JS 绑定事件与路径动画'],
    cons: ['无法被浏览器作为独立文件缓存', '在多页面复用会导致 HTML 体积臃肿'],
    useCases: '单色/多色 UI 图标（配合 currentColor）、需要复杂交互的数据可视化图表（D3.js）、页面专属的插画动画。',
    code: `<svg viewBox="0 0 100 100" class="text-blue-500 hover:text-red-500">
  <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>`
  },
  {
    id: 'img',
    name: '<img> 标签',
    icon: ImageIcon,
    pros: ['最简单，语义明确', '支持浏览器强缓存', '对无障碍访问 (A11y) 友好'],
    cons: ['处于安全隔离环境', '主页面的 CSS 无法穿透进去修改图形的颜色', 'SVG 内部的 <script> 也不会执行'],
    useCases: '不需要修改颜色、不需要内部交互的纯静态插图、Logo、照片占位符。',
    code: `<img src="/assets/logo.svg" alt="Company Logo" />`
  },
  {
    id: 'bg',
    name: 'CSS 背景图',
    icon: PaintBucket,
    pros: ['适合纯装饰性的图形', '支持浏览器强缓存', '保持 HTML 结构干净'],
    cons: ['完全没有语义，屏幕阅读器会忽略它', '同样无法用外部 CSS 修改内部颜色 (除非使用 mask)'],
    useCases: '网页背景纹理、纯装饰性的列表小图标。',
    code: `.icon {
  background-image: url('pattern.svg');
  background-repeat: no-repeat;
  background-size: contain;
}`
  },
  {
    id: 'object',
    name: '<object>',
    icon: Box,
    pros: ['支持缓存', '同源请求下，主页面 JS 可以通过 contentDocument 获取并操作内部 DOM'],
    cons: ['语法相对古老', '处理跨域 (CORS) 问题比较麻烦'],
    useCases: '体积巨大的交互式地图（需要独立缓存，又需要复杂的点击高亮交互）。',
    code: `<object type="image/svg+xml" data="map.svg">
  <!-- 不支持时的降级方案 -->
  <img src="map-fallback.png" alt="Map" />
</object>

<script>
  // 获取内部 DOM
  const svgDoc = document.querySelector('object').contentDocument;
</script>`
  },
  {
    id: 'data-uri',
    name: 'Data URI',
    icon: Link,
    pros: ['减少小图标的 HTTP 请求', '纯文本转码，可读性好，比 Base64 体积小'],
    cons: ['无法被单独缓存，改变图标需刷新整个 CSS', '大文件会导致 CSS 体积剧增'],
    useCases: 'CSS 中体积极小的装饰性图标。',
    code: `.icon-check {
  /* 将 < 替换为 %3C 等 */
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E...%3C/svg%3E");
}`
  }
];

export function EmbeddingComparison() {
  const [activeTab, setActiveTab] = useState(methods[0].id);
  const activeMethod = methods.find(m => m.id === activeTab)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击下方选项卡，对比不同 SVG 嵌入方式的优缺点与适用场景</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-1/3 border-r border-border bg-muted/30 p-4 space-y-2">
          {methods.map((method) => {
            const Icon = method.icon;
            const isActive = activeTab === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <activeMethod.icon className="h-6 w-6 text-primary" />
              {activeMethod.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">适用场景:</span> {activeMethod.useCases}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" /> 优势
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                {activeMethod.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" /> 劣势
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                {activeMethod.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">代码示例</h4>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono text-foreground">
                <code>{activeMethod.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

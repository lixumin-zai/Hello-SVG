'use client';

import React, { useState } from 'react';
import { MousePointer2, Info, AlertTriangle } from 'lucide-react';

const namespaces = [
  {
    id: 'xmlns',
    label: 'xmlns (默认)',
    codeSnippet: `<svg xmlns="http://www.w3.org/2000/svg">
  <!-- 这里的元素都被认为属于 SVG 规范 -->
  <circle cx="50" cy="50" r="40" />
</svg>`,
    title: '默认 SVG 命名空间',
    desc: '声明此标签及内部元素属于 SVG 规范。如果没有它，作为独立 .svg 文件打开时，浏览器会把它当成普通 XML 文本渲染，而不是画出图形。',
    note: '在 HTML5 文档中内联 SVG 时可以省略，现代解析器会自动推断。',
    type: 'info'
  },
  {
    id: 'xlink',
    label: 'xmlns:xlink',
    codeSnippet: `<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- 旧版写法 -->
  <use xlink:href="#my-icon" />
  
  <!-- 现代写法 (推荐) -->
  <use href="#my-icon" />
</svg>`,
    title: 'XLink 命名空间 (历史遗留)',
    desc: '在旧版本的 SVG 中，如果你想引入外部资源（比如图片、或者复用另一个 SVG 节点），必须使用 xlink:href 属性并声明此命名空间。',
    note: '在 SVG 2.0 中已废弃！你可以直接使用原生的 href 属性，此声明也可以安全删除。',
    type: 'warn'
  },
  {
    id: 'foreignObject',
    label: '<foreignObject>',
    codeSnippet: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <foreignObject x="20" y="20" width="160" height="160">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <p>这段文字支持自动换行，这在纯 SVG 中是非常难以实现的！</p>
    </div>
  </foreignObject>
</svg>`,
    title: '混合其他 XML 语言',
    desc: '命名空间的强大之处在于允许在同一个文档中混合使用多种 XML 语言。通过声明 XHTML 命名空间，我们可以在 SVG 中直接嵌入标准的 HTML 元素。',
    note: '非常适合用于在 SVG 中实现复杂的文本自动换行、输入框等 HTML 原生功能。',
    type: 'info'
  },
  {
    id: 'data',
    label: 'data-*',
    codeSnippet: `<svg xmlns="http://www.w3.org/2000/svg">
  <!-- 在地图路径上绑定业务数据 -->
  <path 
    id="province-gd" 
    data-adcode="440000" 
    data-sales="50000" 
    d="M10...Z" 
  />
</svg>

<script>
  const gd = document.getElementById('province-gd');
  console.log(gd.dataset.sales); // "50000"
</script>`,
    title: '自定义数据属性',
    desc: '在开发交互式 SVG 时，我们经常需要把业务数据绑定到节点上。与 HTML 一样，SVG 完美支持 data-* 属性。',
    note: '这些属性完全合法，不会影响渲染，且极易通过 JavaScript (dataset) 读取。',
    type: 'info'
  }
];

export function NamespaceExplorer() {
  const [activeId, setActiveId] = useState(namespaces[0].id);
  const activeItem = namespaces.find(n => n.id === activeId)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b border-border text-sm text-muted-foreground flex items-center gap-2">
        <MousePointer2 className="h-4 w-4" />
        <span>▶ 点击不同的属性/标签，了解其在 SVG 中的作用</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Navigation / Code Explorer */}
        <div className="w-full md:w-5/12 border-r border-border bg-muted/20 p-4 space-y-2">
          {namespaces.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition-all font-mono text-sm ${
                activeId === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                  : 'hover:bg-muted text-muted-foreground border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-7/12 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-foreground">{activeItem.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeItem.desc}
            </p>
          </div>

          <div className="bg-muted p-4 rounded-md mb-6 overflow-x-auto border border-border">
            <pre className="text-sm font-mono text-foreground">
              <code>{activeItem.codeSnippet}</code>
            </pre>
          </div>

          <div className={`mt-auto p-4 rounded-md text-sm flex gap-3 ${
            activeItem.type === 'warn' 
              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20' 
              : 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
          }`}>
            <div className="shrink-0 mt-0.5">
              {activeItem.type === 'warn' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </div>
            <p className="leading-relaxed font-medium">{activeItem.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

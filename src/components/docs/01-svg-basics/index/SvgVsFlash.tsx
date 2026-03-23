'use client';

import { useState } from 'react';

export function SvgVsFlash() {
  const [activeTab, setActiveTab] = useState<'svg' | 'flash'>('flash');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 点击切换查看 SVG 与 Flash 的对比，体验一场"时代之战"
      </p>

      <div className="flex bg-muted p-1 rounded-lg mb-6 max-w-md mx-auto relative">
        <button
          onClick={() => setActiveTab('flash')}
          className={`flex-1 py-2 text-center rounded-md text-sm font-semibold transition-all z-10 ${
            activeTab === 'flash' ? 'text-red-600' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Adobe Flash (过去)
        </button>
        <button
          onClick={() => setActiveTab('svg')}
          className={`flex-1 py-2 text-center rounded-md text-sm font-semibold transition-all z-10 ${
            activeTab === 'svg' ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          HTML5 + SVG (现在)
        </button>
        
        {/* Background slider */}
        <div 
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-md shadow-sm transition-transform duration-300"
          style={{ transform: activeTab === 'flash' ? 'translateX(0)' : 'translateX(100%)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">
        {/* Visual Preview Area */}
        <div className="flex items-center justify-center border rounded-lg bg-secondary/30 relative overflow-hidden p-6">
          {activeTab === 'flash' ? (
            <div className="text-center animate-pulse">
              <div className="w-24 h-24 mx-auto bg-red-600 rounded-lg flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-xl shadow-red-500/20 transform rotate-12">
                f
              </div>
              <p className="font-bold text-red-500">Plugin Required</p>
              <div className="mt-4 px-4 py-2 bg-background border border-border rounded text-xs text-muted-foreground inline-block">
                Right click: Adobe Flash Player 10.0...
              </div>
            </div>
          ) : (
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto text-blue-500 drop-shadow-lg" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0L100 20L90 80L50 100L10 80L0 20L50 0Z" className="opacity-20" />
                <path d="M50 10L85 25L77 75L50 90L23 75L15 25L50 10Z" />
                <path d="M50 20L50 80L70 70L75 30L50 20Z" fill="white" className="opacity-50" />
                <path d="M50 20L30 30L35 70L50 80L50 20Z" fill="white" />
              </svg>
              <p className="font-bold text-blue-500 mt-4">Native Browser Support</p>
              <div className="mt-4 px-4 py-2 bg-background border border-border rounded text-xs text-muted-foreground inline-block">
                &lt;svg viewBox="0 0 100 100"&gt;...&lt;/svg&gt;
              </div>
            </div>
          )}
        </div>

        {/* Feature List Area */}
        <div className="flex flex-col justify-center gap-4">
          {activeTab === 'flash' ? (
            <>
              <div className="p-3 border border-red-200 bg-red-50/10 rounded-lg">
                <h4 className="font-bold text-red-500 mb-1">❌ 封闭标准</h4>
                <p className="text-sm text-muted-foreground">由 Adobe 控制的私有格式，需要安装专门的浏览器插件。</p>
              </div>
              <div className="p-3 border border-red-200 bg-red-50/10 rounded-lg">
                <h4 className="font-bold text-red-500 mb-1">❌ 性能与安全隐患</h4>
                <p className="text-sm text-muted-foreground">在移动端极其耗电（被乔布斯公开信批评），且存在大量安全漏洞。</p>
              </div>
              <div className="p-3 border border-red-200 bg-red-50/10 rounded-lg">
                <h4 className="font-bold text-red-500 mb-1">❌ 对 SEO 不友好</h4>
                <p className="text-sm text-muted-foreground">内容编译为二进制 `.swf` 文件，搜索引擎无法读取内部文本。</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 border border-blue-200 bg-blue-50/10 rounded-lg">
                <h4 className="font-bold text-blue-500 mb-1">✅ 开放标准</h4>
                <p className="text-sm text-muted-foreground">W3C 制定，所有现代浏览器原生支持，无需任何插件。</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50/10 rounded-lg">
                <h4 className="font-bold text-blue-500 mb-1">✅ 完美融入 DOM</h4>
                <p className="text-sm text-muted-foreground">可以使用 CSS 控制样式，使用 JavaScript 动态修改和绑定事件。</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50/10 rounded-lg">
                <h4 className="font-bold text-blue-500 mb-1">✅ 文本可索引</h4>
                <p className="text-sm text-muted-foreground">本质是 XML 文本，搜索引擎可以轻松解析其中的 &lt;text&gt; 节点。</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

export function XSSVisualizer() {
  const [activeTab, setActiveTab] = useState<'img' | 'object' | 'inline'>('img');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-bold text-red-500">SVG XSS 攻击模拟</h3>
          <p className="text-xs text-muted-foreground mt-1">
            假设一个黑客上传了一个包含恶意脚本的 <code>evil.svg</code>，你用不同的方式把它展示在页面上。
          </p>
        </div>
      </div>

      {/* The Evil SVG Code */}
      <div className="bg-zinc-950 p-4 rounded-lg font-mono text-[11px] mb-6 border-l-4 border-red-500">
        <span className="text-muted-foreground">{"<!-- evil.svg 的内容 -->"}</span><br/>
        <span className="text-blue-400">{"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>"}</span><br/>
        <span className="text-purple-400 pl-4">{"<circle cx='50' cy='50' r='40' fill='red' />"}</span><br/>
        <span className="text-red-400 font-bold pl-4">{"<script>"}</span><br/>
        <span className="text-yellow-300 pl-8">{"alert('你的 Cookie 被盗了！');"}</span><br/>
        <span className="text-red-400 font-bold pl-4">{"</script>"}</span><br/>
        <span className="text-blue-400">{"</svg>"}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-border pb-2">
        <button 
          onClick={() => setActiveTab('img')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'img' ? 'text-primary border-b-2 border-primary -mb-[9px]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          1. 通过 &lt;img&gt; 引入
        </button>
        <button 
          onClick={() => setActiveTab('object')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'object' ? 'text-primary border-b-2 border-primary -mb-[9px]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          2. 通过 &lt;object&gt; 引入
        </button>
        <button 
          onClick={() => setActiveTab('inline')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'inline' ? 'text-primary border-b-2 border-primary -mb-[9px]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          3. 直接内联插入 (Inline)
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden">
        
        {activeTab === 'img' && (
          <div className="text-center animate-in fade-in">
            <div className="w-24 h-24 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🛡️</span>
            </div>
            <h4 className="font-bold text-green-600 mb-2">安全！脚本被浏览器拦截</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              当使用 <code>&lt;img src="evil.svg"&gt;</code> 时，浏览器会强制以“图像模式”解析它。<b>所有的脚本、外部请求和交互事件都会被彻底禁用。</b>
            </p>
          </div>
        )}

        {activeTab === 'object' && (
          <div className="text-center animate-in fade-in">
            <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-red-500 border-4 border-red-800 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
              <span className="text-3xl text-white">⚠️</span>
            </div>
            <h4 className="font-bold text-red-500 mb-2">危险！脚本在隔离上下文中执行</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              使用 <code>&lt;object&gt;</code> 或 <code>&lt;iframe&gt;</code> 引入时，脚本<b>会执行</b>！但它运行在独立的 Window 上下文中（除非同源，否则无法直接访问父页面的 DOM）。
            </p>
          </div>
        )}

        {activeTab === 'inline' && (
          <div className="text-center animate-in fade-in">
            <div className="absolute inset-0 bg-red-900/20 pointer-events-none" />
            <div className="w-24 h-24 rounded-full bg-red-600 border-4 border-black flex items-center justify-center mx-auto mb-4 shadow-[0_0_50px_rgba(220,38,38,1)] scale-110">
              <span className="text-4xl">☠️</span>
            </div>
            <h4 className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">致命！彻底沦陷 (XSS 成功)</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              如果你把用户上传的 SVG 代码直接通过 <code>innerHTML</code> (或 React 的 dangerouslySetInnerHTML) 插入页面，<b>恶意脚本将直接在你的主站上下文中执行</b>，窃取 Cookie 或发起伪造请求！
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

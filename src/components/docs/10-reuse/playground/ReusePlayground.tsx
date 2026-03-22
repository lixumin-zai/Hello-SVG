'use client';

import { useState } from 'react';

export function ReusePlayground() {
  const [activeTab, setActiveTab] = useState<'group' | 'defs-use' | 'symbol'>('defs-use');
  
  // States for Use instances
  const [car1Color, setCar1Color] = useState('#3b82f6');
  const [car2Color, setCar2Color] = useState('#ef4444');
  
  // States for Symbol instances
  const [iconSize1, setIconSize1] = useState(40);
  const [iconSize2, setIconSize2] = useState(80);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('group')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'group' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          📦 &lt;g&gt; 分组
        </button>
        <button 
          onClick={() => setActiveTab('defs-use')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'defs-use' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          ♻️ &lt;defs&gt; 与 &lt;use&gt;
        </button>
        <button 
          onClick={() => setActiveTab('symbol')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'symbol' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          ✨ &lt;symbol&gt; (组件化)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'group' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/30">
                <h4 className="text-sm font-bold text-blue-600 mb-2">属性继承魔法</h4>
                <p className="text-xs text-muted-foreground">
                  <code>&lt;g&gt;</code> 标签最大的作用就是<strong>批量应用属性</strong>。你在 <code>&lt;g&gt;</code> 上设置的 fill、stroke、transform，会被它里面所有的子元素继承（除非子元素自己重写了该属性）。
                </p>
              </div>
              <div className="p-3 bg-muted rounded border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto">
{`<!-- 这个组里的所有形状都会变成蓝色半透明，并且整体向右平移 50px -->
<g fill="#3b82f6" opacity="0.5" transform="translate(50, 0)">
  <circle cx="50" cy="50" r="40" />
  <rect x="100" y="10" width="80" height="80" />
  
  <!-- 这个圆自己设置了 fill，所以它不会继承组的蓝色 -->
  <circle cx="250" cy="50" r="40" fill="#ef4444" />
</g>`}
              </div>
            </div>
          )}

          {activeTab === 'defs-use' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                把画好的图形放进 <code>&lt;defs&gt;</code> 中隐藏起来，然后在需要的地方用 <code>&lt;use href="#id"&gt;</code> 召唤它。这就像在写代码时声明了一个变量然后多次调用。
              </p>
              
              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <h4 className="text-sm font-bold">实例化汽车组件</h4>
                
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold w-12">汽车 1</label>
                  <input type="color" value={car1Color} onChange={e => setCar1Color(e.target.value)} className="cursor-pointer" />
                  <span className="text-xs font-mono">{car1Color}</span>
                </div>
                
                <div className="flex items-center gap-3 pt-2 border-t">
                  <label className="text-xs font-bold w-12">汽车 2</label>
                  <input type="color" value={car2Color} onChange={e => setCar2Color(e.target.value)} className="cursor-pointer" />
                  <span className="text-xs font-mono">{car2Color}</span>
                </div>
                
                <p className="text-[10px] text-orange-600 mt-2">
                  * 提示：要想让外部的颜色生效，<code>&lt;defs&gt;</code> 里的原始图形必须<strong>不设置该属性，或者设置为 currentColor</strong>。
                </p>
              </div>

              <div className="p-3 bg-muted rounded border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto">
{`<defs>
  <g id="car">
    <!-- 车身使用 currentColor 以便外部修改 -->
    <path d="..." fill="currentColor" />
    <!-- 轮胎颜色写死为黑色 -->
    <circle cx="20" cy="40" r="10" fill="black" />
    <circle cx="80" cy="40" r="10" fill="black" />
  </g>
</defs>

<!-- 复用并上色 -->
<use href="#car" x="10" y="20" color="${car1Color}" />
<use href="#car" x="10" y="100" color="${car2Color}" />`}
              </div>
            </div>
          )}

          {activeTab === 'symbol' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-purple-500/10 border-purple-500/30">
                <h4 className="text-sm font-bold text-purple-600 mb-2">Symbol = Defs + ViewBox</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code>&lt;use&gt;</code> 有一个致命弱点：它不能改变原始图形的宽高比例！
                  而 <code>&lt;symbol&gt;</code> 允许你给每个图标自带一个 <code>viewBox</code>。这样在使用时，你就可以像用普通的 <code>&lt;svg&gt;</code> 一样，随意设置 width 和 height 了。
                </p>
                <p className="text-[10px] text-purple-700 font-bold">
                  （这就是现代 SVG Sprite 图标库的底层实现原理！）
                </p>
              </div>

              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold w-12">图标 1</label>
                  <input type="range" min="20" max="100" value={iconSize1} onChange={e => setIconSize1(Number(e.target.value))} className="flex-1 accent-purple-500" />
                  <span className="text-xs w-12 text-right">{iconSize1}px</span>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <label className="text-xs font-bold w-12">图标 2</label>
                  <input type="range" min="20" max="100" value={iconSize2} onChange={e => setIconSize2(Number(e.target.value))} className="flex-1 accent-purple-500" />
                  <span className="text-xs w-12 text-right">{iconSize2}px</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[350px] flex items-center justify-center bg-background">
            <svg width="100%" height="100%" viewBox="0 0 300 200">
              
              {/* Definitions */}
              <defs>
                {/* For use tab */}
                <g id="demoCar">
                  {/* Car body - inherits color via currentColor */}
                  <path d="M 10 30 L 20 10 L 60 10 L 70 30 L 90 30 C 95 30 100 35 100 40 L 100 50 L 0 50 L 0 40 C 0 35 5 30 10 30 Z" fill="currentColor" />
                  {/* Car window - hardcoded color */}
                  <polygon points="25,12 55,12 63,28 20,28" fill="#e2e8f0" />
                  {/* Wheels - hardcoded color */}
                  <circle cx="25" cy="50" r="12" fill="#1e293b" />
                  <circle cx="75" cy="50" r="12" fill="#1e293b" />
                  <circle cx="25" cy="50" r="5" fill="#94a3b8" />
                  <circle cx="75" cy="50" r="5" fill="#94a3b8" />
                </g>

                {/* For symbol tab */}
                <symbol id="demoIcon" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                </symbol>
              </defs>

              {/* Rendering logic based on active tab */}
              {activeTab === 'group' && (
                <g fill="#3b82f6" opacity="0.5" transform="translate(40, 40)">
                  <circle cx="50" cy="50" r="40" />
                  <rect x="100" y="10" width="80" height="80" />
                  {/* Override fill for this specific circle */}
                  <circle cx="230" cy="50" r="40" fill="#ef4444" />
                </g>
              )}

              {activeTab === 'defs-use' && (
                <>
                  <use href="#demoCar" x="30" y="40" color={car1Color} />
                  <use href="#demoCar" x="130" y="100" color={car2Color} />
                </>
              )}

              {activeTab === 'symbol' && (
                <>
                  <use href="#demoIcon" x="40" y="50" width={iconSize1} height={iconSize1} fill="#18181b" />
                  <use href="#demoIcon" x="150" y="50" width={iconSize2} height={iconSize2} fill="#18181b" />
                </>
              )}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
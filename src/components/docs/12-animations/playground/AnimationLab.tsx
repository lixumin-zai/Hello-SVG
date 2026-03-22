'use client';

import { useState, useEffect } from 'react';

export function AnimationLab() {
  const [activeTab, setActiveTab] = useState<'smil' | 'stroke' | 'transform'>('smil');

  // Stroke Animation State
  const [dashArray, setDashArray] = useState(1000);
  const [dashOffset, setDashOffset] = useState(1000);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let currentOffset = dashOffset;
    
    if (isDrawing && activeTab === 'stroke') {
      const animate = () => {
        currentOffset -= 10;
        if (currentOffset <= 0) {
          currentOffset = 0;
          setDashOffset(0);
          setIsDrawing(false);
        } else {
          setDashOffset(currentOffset);
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isDrawing, activeTab]);

  // Transform Origin State
  const [rotation, setRotation] = useState(0);
  const [originX, setOriginX] = useState('50%');
  const [originY, setOriginY] = useState('50%');

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('smil')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'smil' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          🎬 SMIL 动画 (原生)
        </button>
        <button 
          onClick={() => setActiveTab('stroke')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'stroke' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          ✍️ CSS 画线动画
        </button>
        <button 
          onClick={() => setActiveTab('transform')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'transform' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          🔄 Transform 陷阱
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'smil' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-indigo-500/10 border-indigo-500/30">
                <h4 className="text-sm font-bold text-indigo-600 mb-2">原生 SVG 动画 (SMIL)</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  无需任何 JS 和 CSS，直接在 SVG 标签内实现动画。支持<strong>属性渐变</strong>和<strong>沿路径运动</strong>。
                </p>
                <div className="space-y-2 text-xs">
                  <p>🔹 <code>&lt;animate&gt;</code> 改变属性值</p>
                  <p>🔹 <code>&lt;animateMotion&gt;</code> 沿路径移动</p>
                  <p>🔹 <code>&lt;animateTransform&gt;</code> 旋转/缩放/平移</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stroke' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-pink-500/10 border-pink-500/30">
                <h4 className="text-sm font-bold text-pink-600 mb-2">线条生长动画原理</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  通过设置 <code>stroke-dasharray</code> (虚线长度) 为整个路径的总长度，然后改变 <code>stroke-dashoffset</code> (虚线偏移量) 来实现"画线"效果。
                </p>
                
                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-xs text-pink-600 font-bold">stroke-dashoffset: {dashOffset}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max={dashArray} 
                    value={dashOffset} 
                    onChange={e => { setDashOffset(Number(e.target.value)); setIsDrawing(false); }} 
                    className="accent-pink-500" 
                  />
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { setDashOffset(dashArray); setIsDrawing(true); }}
                    className="flex-1 py-2 bg-pink-500 text-white rounded text-sm font-bold hover:bg-pink-600 transition-colors"
                  >
                    ▶️ 播放动画
                  </button>
                  <button 
                    onClick={() => { setDashOffset(dashArray); setIsDrawing(false); }}
                    className="py-2 px-4 border border-pink-500 text-pink-600 rounded text-sm font-bold hover:bg-pink-50 transition-colors"
                  >
                    ⏹️ 重置
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transform' && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-teal-500/10 border-teal-500/30">
                <h4 className="text-sm font-bold text-teal-600 mb-2">CSS 旋转与中心点问题</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  在 SVG 中使用 CSS transform 旋转时，默认的 <code>transform-origin</code> 是 <strong>SVG 画布的左上角 (0,0)</strong>，而不是元素本身的中心！
                </p>
                
                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-xs text-teal-600 font-bold">旋转角度 (deg): {rotation}</label>
                  <input type="range" min="0" max="360" value={rotation} onChange={e => setRotation(Number(e.target.value))} className="accent-teal-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold">transform-origin X:</label>
                    <select value={originX} onChange={e => setOriginX(e.target.value)} className="text-xs p-1 border rounded bg-background">
                      <option value="0">0 (画布左边界)</option>
                      <option value="50%">50% (元素中心)</option>
                      <option value="100%">100% (元素右边界)</option>
                      <option value="150px">150px (绝对坐标)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold">transform-origin Y:</label>
                    <select value={originY} onChange={e => setOriginY(e.target.value)} className="text-xs p-1 border rounded bg-background">
                      <option value="0">0 (画布上边界)</option>
                      <option value="50%">50% (元素中心)</option>
                      <option value="100%">100% (元素下边界)</option>
                      <option value="150px">150px (绝对坐标)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-background border rounded text-[10px] font-mono">
                  transform: rotate({rotation}deg);<br/>
                  transform-origin: {originX} {originY};<br/>
                  <span className="text-teal-600">/* 试试设置 transform-box: fill-box 修复 */</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-7 bg-muted/30 rounded-lg flex items-center justify-center p-4 min-h-[400px] border border-dashed">
          {activeTab === 'smil' && (
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-[400px] bg-white rounded shadow-sm border">
              <defs>
                <path id="motionPath" d="M 50 150 C 50 50, 350 50, 350 150 C 350 250, 50 250, 50 150 Z" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
              </defs>
              
              {/* 显示路径轨迹 */}
              <use href="#motionPath" />
              
              {/* 动画对象 */}
              <g>
                <circle cx="0" cy="0" r="15" fill="#6366f1">
                  {/* 颜色属性渐变 */}
                  <animate attributeName="fill" values="#6366f1;#ec4899;#8b5cf6;#6366f1" dur="4s" repeatCount="indefinite" />
                  {/* 大小缩放渐变 */}
                  <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* 沿路径运动 */}
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath href="#motionPath" />
                </animateMotion>
              </g>

              {/* 旋转矩形 */}
              <rect x="175" y="125" width="50" height="50" fill="#f59e0b" rx="8">
                <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>
          )}

          {activeTab === 'stroke' && (
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-[400px] bg-white rounded shadow-sm border">
              <path 
                d="M 50 250 C 50 100, 150 50, 200 150 C 250 250, 350 100, 350 50" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-75"
              />
              {/* 底色辅助线 */}
              <path 
                d="M 50 250 C 50 100, 150 50, 200 150 C 250 250, 350 100, 350 50" 
                fill="none" 
                stroke="#fce7f3" 
                strokeWidth="8"
                strokeLinecap="round"
                className="-z-10 opacity-50"
              />
            </svg>
          )}

          {activeTab === 'transform' && (
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-[400px] bg-white rounded shadow-sm border overflow-visible">
              {/* 坐标轴辅助 */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <line x1="0" y1="0" x2="0" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <circle cx="0" cy="0" r="4" fill="#ef4444" />
              <text x="10" y="20" fontSize="12" fill="#ef4444" fontFamily="monospace">(0, 0)</text>

              {/* 旋转的矩形 */}
              <g>
                <rect 
                  x="150" 
                  y="100" 
                  width="100" 
                  height="100" 
                  fill="#14b8a6" 
                  rx="12"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: `${originX} ${originY}`,
                    transition: 'transform 0.1s linear'
                  }}
                />
                {/* 标记矩形本身的中心点 */}
                <circle cx="200" cy="150" r="3" fill="#fff" />
              </g>
              
              <text x="150" y="230" fontSize="12" fill="#64748b" fontFamily="monospace">x="150" y="100"</text>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
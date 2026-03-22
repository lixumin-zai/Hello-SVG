'use client';

import { useState } from 'react';

export function TextPlayground() {
  const [activeTab, setActiveTab] = useState<'basic' | 'tspan' | 'textPath'>('basic');

  // Basic Text States
  const [text, setText] = useState('Hello SVG!');
  const [fontSize, setFontSize] = useState(48);
  const [textAnchor, setTextAnchor] = useState<'start' | 'middle' | 'end'>('start');
  const [fill, setFill] = useState('#3b82f6');
  const [strokeWidth, setStrokeWidth] = useState(0);

  // Path States for textPath
  const [pathType, setPathType] = useState<'wave' | 'circle'>('wave');
  const [startOffset, setStartOffset] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'basic' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;text&gt; 基础文本
        </button>
        <button 
          onClick={() => setActiveTab('tspan')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'tspan' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;tspan&gt; 多行与样式
        </button>
        <button 
          onClick={() => setActiveTab('textPath')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'textPath' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          &lt;textPath&gt; 路径文字
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4">
          {activeTab === 'basic' && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">内容</label>
                  <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full p-2 bg-background border rounded-md" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-20 text-sm">字号</label>
                  <input type="range" min="12" max="100" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-8 text-right text-sm">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-20 text-sm">对齐方式<br/><span className="text-[10px] text-muted-foreground">(text-anchor)</span></label>
                  <select value={textAnchor} onChange={e => setTextAnchor(e.target.value as any)} className="flex-1 p-2 bg-background border rounded-md">
                    <option value="start">start (左对齐)</option>
                    <option value="middle">middle (居中对齐)</option>
                    <option value="end">end (右对齐)</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <label className="w-20 text-sm">描边宽度</label>
                  <input type="range" min="0" max="5" step="0.5" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="w-8 text-right text-sm">{strokeWidth}</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg border font-mono text-xs text-primary overflow-x-auto whitespace-pre">
{`<text x="150" y="100" 
  font-size="${fontSize}" 
  text-anchor="${textAnchor}"
  fill="${fill}"${strokeWidth > 0 ? `\n  stroke="black" stroke-width="${strokeWidth}"` : ''}
>
  ${text}
</text>`}
              </div>
            </>
          )}

          {activeTab === 'tspan' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                SVG 的 <code>&lt;text&gt;</code> <strong>不支持自动换行！</strong> <br/>
                你需要使用 <code>&lt;tspan&gt;</code> 并结合 <code>dx/dy</code> 或 <code>x/y</code> 来手动控制换行，或者给部分文字单独设置样式。
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg border font-mono text-xs text-primary overflow-x-auto whitespace-pre">
{`<text x="20" y="50" font-size="24">
  <tspan fill="#ef4444">红色文字</tspan>
  
  <!-- 使用 dy="1.2em" 实现换行 -->
  <tspan x="20" dy="1.2em" fill="#10b981">
    这是第二行
  </tspan>
  
  <tspan x="20" dy="1.2em" font-weight="bold">
    这是<tspan fill="#3b82f6" font-size="32">第三行</tspan>的加粗部分
  </tspan>
</text>`}
              </div>
            </div>
          )}

          {activeTab === 'textPath' && (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="w-20 text-sm">路径形状</label>
                  <select value={pathType} onChange={e => setPathType(e.target.value as any)} className="flex-1 p-2 bg-background border rounded-md">
                    <option value="wave">波浪线</option>
                    <option value="circle">圆形</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-20 text-sm">起始偏移<br/><span className="text-[10px] text-muted-foreground">(startOffset)</span></label>
                  <input type="range" min="0" max="100" value={startOffset} onChange={e => setStartOffset(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="w-10 text-right text-sm">{startOffset}%</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg border font-mono text-xs text-primary overflow-x-auto whitespace-pre">
{`<path id="myPath" d="..." />
<text font-size="20">
  <textPath href="#myPath" startOffset="${startOffset}%">
    乘坐过山车一样排版的 SVG 文本！
  </textPath>
</text>`}
              </div>
            </>
          )}
        </div>

        {/* Canvas Display */}
        <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[250px] overflow-hidden bg-background">
          <svg width="100%" height="100%" viewBox="0 0 300 200" className="absolute inset-0">
            {/* Grid */}
            <defs>
              <pattern id="grid3" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.1" />
              </pattern>
              
              {/* Paths for textPath */}
              <path id="path-wave" d="M 20,100 Q 80,20 150,100 T 280,100" fill="none" />
              {/* Note: drawing a circle with path so text can flow along it properly */}
              <path id="path-circle" d="M 150,150 a 50,50 0 1,1 0,-100 a 50,50 0 1,1 0,100" fill="none" />
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3)" />

            {/* Rendering Shape */}
            {activeTab === 'basic' && (
              <>
                {/* Reference lines */}
                <line x1="150" y1="0" x2="150" y2="200" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4" />
                <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4" />
                <circle cx="150" cy="100" r="4" fill="red" />
                
                <text 
                  x="150" 
                  y="100" 
                  fontSize={fontSize} 
                  textAnchor={textAnchor}
                  fill={fill}
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fontWeight="bold"
                >
                  {text}
                </text>
              </>
            )}

            {activeTab === 'tspan' && (
              <text x="20" y="50" fontSize="24" fill="currentColor">
                <tspan fill="#ef4444">红色文字</tspan>
                <tspan x="20" dy="1.2em" fill="#10b981">这是第二行 (使用 dy 换行)</tspan>
                <tspan x="20" dy="1.2em" fontWeight="bold">
                  这是<tspan fill="#3b82f6" fontSize="32">第三行</tspan>的加粗部分
                </tspan>
              </text>
            )}

            {activeTab === 'textPath' && (
              <>
                {/* Visualize the path */}
                <use href={`#path-${pathType}`} stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4" fill="none" />
                
                <text fontSize="20" fill="#f59e0b" fontWeight="bold">
                  <textPath href={`#path-${pathType}`} startOffset={`${startOffset}%`}>
                    乘坐过山车一样排版的 SVG 文本！
                  </textPath>
                </text>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

export function EcosystemMatrix() {
  const [activeCategory, setActiveCategory] = useState<'d3' | 'react' | 'animation' | 'handdrawn'>('d3');

  const categories = {
    d3: {
      title: 'D3.js (可视化之王)',
      desc: '数据可视化领域的底层统治者，强大的数学与几何计算引擎。',
      pros: ['极致的定制化能力', '强大的比例尺和布局算法', '庞大的生态系统'],
      cons: ['学习曲线极其陡峭', '直接操作 DOM，与 React/Vue 理念冲突'],
      code: `d3.select("svg")
  .selectAll("circle")
  .data([10, 20, 30])
  .enter()
  .append("circle")
  .attr("r", d => d)`
    },
    react: {
      title: 'React 图表库',
      desc: '结合 D3 计算能力与 React 渲染能力，开箱即用的声明式组件。',
      pros: ['完美契合 React 生态', '开发速度极快', '开箱即用的图表类型'],
      cons: ['高度定制化较难', '包体积较大'],
      code: `<LineChart data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="uv" />
</LineChart>`
    },
    animation: {
      title: 'GSAP (动画霸主)',
      desc: '处理复杂 SVG 动画（如路径变形、沿路径运动）的行业标准。',
      pros: ['无敌的性能和时间轴控制', '专用的 SVG 变形插件', '解决所有浏览器兼容性'],
      cons: ['高级插件需要付费', '增加包体积'],
      code: `// Morphing Animation
gsap.to("#circle", {
  duration: 2, 
  morphSVG: "#hippo",
  ease: "power2.inOut"
});`
    },
    handdrawn: {
      title: 'Rough.js',
      desc: '通过算法将规整的 SVG 转换为带有手绘风格、涂鸦效果的图形。',
      pros: ['独特的手绘视觉风格', '支持 SVG 和 Canvas', '配置项丰富'],
      cons: ['计算开销较大', '不适合严肃的商业数据图表'],
      code: `const rc = rough.svg(svgElement);
const node = rc.rectangle(10, 10, 200, 200, {
  fill: 'red',
  hachureAngle: 60,
  hachureGap: 8
});
svgElement.appendChild(node);`
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border bg-card my-6">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        ▶ 点击左侧分类，了解不同 SVG 库的定位、优缺点与代码风格。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 左侧：分类导航 */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveCategory('d3')}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${activeCategory === 'd3' ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-background hover:bg-muted'}`}
          >
            <div className="font-bold text-sm">D3.js</div>
            <div className="text-xs text-muted-foreground mt-1">底层计算与可视化构建</div>
          </button>
          
          <button 
            onClick={() => setActiveCategory('react')}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${activeCategory === 'react' ? 'border-[#61dafb] bg-[#61dafb]/10 shadow-sm' : 'border-border bg-background hover:bg-muted'}`}
          >
            <div className="font-bold text-sm">Recharts / Visx</div>
            <div className="text-xs text-muted-foreground mt-1">React 声明式图表组件</div>
          </button>

          <button 
            onClick={() => setActiveCategory('animation')}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${activeCategory === 'animation' ? 'border-[#88ce02] bg-[#88ce02]/10 shadow-sm' : 'border-border bg-background hover:bg-muted'}`}
          >
            <div className="font-bold text-sm">GSAP</div>
            <div className="text-xs text-muted-foreground mt-1">复杂动画与路径变形</div>
          </button>

          <button 
            onClick={() => setActiveCategory('handdrawn')}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${activeCategory === 'handdrawn' ? 'border-[#ff5722] bg-[#ff5722]/10 shadow-sm' : 'border-border bg-background hover:bg-muted'}`}
          >
            <div className="font-bold text-sm">Rough.js</div>
            <div className="text-xs text-muted-foreground mt-1">手绘涂鸦风格引擎</div>
          </button>
        </div>

        {/* 右侧：详情面板 */}
        <div className="md:col-span-8 bg-muted/30 rounded-lg border border-border p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{categories[activeCategory].title}</h3>
          <p className="text-sm text-muted-foreground mb-6">{categories[activeCategory].desc}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-background rounded-md border border-border p-4">
              <h4 className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg> 优势
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {categories[activeCategory].pros.map((pro, i) => <li key={i}>• {pro}</li>)}
              </ul>
            </div>
            
            <div className="bg-background rounded-md border border-border p-4">
              <h4 className="text-xs font-bold text-destructive mb-2 uppercase tracking-wider flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg> 局限
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {categories[activeCategory].cons.map((con, i) => <li key={i}>• {con}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-bold mb-2 text-muted-foreground uppercase tracking-wider">代码示例</h4>
            <pre className="text-xs font-mono bg-background p-4 rounded-md border border-border overflow-x-auto text-foreground">
              {categories[activeCategory].code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

export function EcosystemCards() {
  const ecosystems = [
    {
      title: '图标系统 (Icons)',
      icon: '🎨',
      desc: '现代前端项目图标管理事实标准',
      details: '取代了容易产生对齐和跨浏览器问题的 Icon Font，SVG 提供了完美的多色支持，更易于访问和通过 CSS/JS 控制（如 SVGR）。',
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500'
    },
    {
      title: '数据可视化 (Data Viz)',
      icon: '📊',
      desc: '构建交互式图表的核心基石',
      details: 'D3.js、Recharts 等图表库的底层依赖。SVG DOM 节点的特性让数据绑定、交互事件监听（悬停、点击）和动画过渡变得极其自然。',
      color: 'bg-green-500/10 border-green-500/20 text-green-500'
    },
    {
      title: '复杂动画 (Animations)',
      icon: '🎬',
      desc: 'Web 端矢量动画的终极解决方案',
      details: '结合 Lottie 等工具，能够完美还原 AE 制作的复杂动画；或者通过 GSAP、CSS 动画让 SVG 内的几何图形灵动起来，体积极小。',
      color: 'bg-purple-500/10 border-purple-500/20 text-purple-500'
    },
    {
      title: '交互地图 (Maps)',
      icon: '🗺️',
      desc: '实现可缩放国家/世界地图',
      details: '由于天然具备无损缩放和 DOM 交互能力，非常适合绘制区域高亮、点击跳转的数据统计地图或大屏地图组件。',
      color: 'bg-orange-500/10 border-orange-500/20 text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {ecosystems.map((eco, idx) => (
        <div key={idx} className={`p-5 rounded-xl border bg-card hover:shadow-md transition-shadow relative overflow-hidden group`}>
          <div className="flex items-start gap-4 mb-2">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${eco.color}`}>
              {eco.icon}
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{eco.title}</h4>
              <p className="text-sm font-medium text-muted-foreground">{eco.desc}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {eco.details}
          </p>
        </div>
      ))}
    </div>
  );
}

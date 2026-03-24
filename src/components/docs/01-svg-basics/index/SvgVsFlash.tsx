'use client';

export function SvgVsFlash() {
  const comparison = [
    {
      aspect: '核心本质',
      svg: { title: '开放标准 (W3C)', desc: '纯文本 XML，任何人都可以免费使用、解析和修改，无版权限制。', icon: '🌍' },
      flash: { title: '私有技术 (Adobe)', desc: '编译后的二进制 .swf 文件，依赖 Adobe 专有播放器插件。', icon: '🔒' },
    },
    {
      aspect: '平台与性能',
      svg: { title: '原生渲染', desc: '浏览器引擎直接渲染，利用现代硬件加速，对移动端设备极度友好。', icon: '⚡' },
      flash: { title: '插件运行', desc: '需要安装第三方插件，性能低下，极其耗电（尤其在移动设备上）。', icon: '🔋' },
    },
    {
      aspect: '生态集成',
      svg: { title: '无缝集成 Web', desc: '与 HTML、CSS、JavaScript 深度结合，DOM 可直接操作，支持响应式设计。', icon: '🧩' },
      flash: { title: '黑盒隔离', desc: '网页中的一块孤岛，无法被 CSS 控制，无法被搜索引擎爬虫解析（SEO 差）。', icon: '📦' },
    }
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6 overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-4">
          <span className="text-primary">SVG</span>
          <span className="text-muted-foreground text-sm font-normal px-2 py-1 bg-secondary rounded-full">VS</span>
          <span className="text-red-500">Flash</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-2">一场开放标准与私有插件的较量，最终以 Web 标准的胜利告终。</p>
      </div>

      <div className="flex flex-col gap-4">
        {comparison.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border bg-background hover:shadow-md transition-shadow relative overflow-hidden">
            {/* Aspect Label */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary to-red-500"></div>
            
            <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center border-b md:border-b-0 md:border-r border-border pb-2 md:pb-0">
              <span className="font-semibold text-foreground/80">{item.aspect}</span>
            </div>
            
            <div className="w-full md:w-[37.5%] flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.svg.icon}</span>
                <span className="font-bold text-primary">{item.svg.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.svg.desc}</p>
            </div>

            <div className="hidden md:flex items-center justify-center w-px bg-border my-2"></div>

            <div className="w-full md:w-[37.5%] flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.flash.icon}</span>
                <span className="font-bold text-red-500">{item.flash.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.flash.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

const events = [
  { year: 1999, title: 'W3C 成立工作组', desc: 'W3C 成立 SVG 工作组，致力于统一基于 XML 的矢量图形标准，吸收了当时微软的 VML 和 Adobe 的 PGML 的优点。' },
  { year: 2001, title: 'SVG 1.0 正式推荐', desc: 'W3C 正式发布 SVG 1.0 标准，为矢量图形在 Web 上的应用奠定了基础。' },
  { year: 2003, title: 'SVG 1.1 发布', desc: '将 SVG 标准模块化，同时推出了面向移动设备的 SVG Basic 和 SVG Tiny。' },
  { year: 2011, title: '浏览器全面支持', desc: '随着 IE9 引入对 SVG 的原生支持，开发者终于摆脱了对 Adobe SVG Viewer 等第三方插件的依赖，SVG 开始被广泛使用。' },
  { year: 2016, title: 'SVG 2.0 候选推荐', desc: '进一步整合了 CSS3 和 HTML5 的新特性，废弃了不常用的模块，使得 SVG 更加现代化和易于使用。' },
];

export function HistoryTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 点击年份，查看 SVG 发展史中的关键节点
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:min-w-[150px]">
          {events.map((evt, idx) => (
            <button
              key={evt.year}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 text-left rounded-lg transition-colors whitespace-nowrap ${
                activeIdx === idx
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {evt.year}
            </button>
          ))}
        </div>
        <div className="flex-1 p-6 border rounded-lg bg-background flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2 text-foreground">{events[activeIdx].year} - {events[activeIdx].title}</h3>
          <p className="text-muted-foreground leading-relaxed">{events[activeIdx].desc}</p>
        </div>
      </div>
    </div>
  );
}
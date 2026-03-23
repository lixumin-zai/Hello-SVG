'use client';

import { useState } from 'react';
import { MousePointer2, Scaling, Code2, MoveRight } from 'lucide-react';

export function SvgDefinition() {
  const [hovered, setHovered] = useState<string | null>(null);

  const words = [
    {
      id: 'scalable',
      word: 'Scalable',
      cn: '可缩放',
      icon: <Scaling className="w-8 h-8 text-blue-500" />,
      desc: '基于数学公式，无论放大多少倍都不会失真（无马赛克）。完美适配从手表到 8K 显示器的任何屏幕。'
    },
    {
      id: 'vector',
      word: 'Vector',
      cn: '矢量',
      icon: <MoveRight className="w-8 h-8 text-green-500" />,
      desc: '由点、线、多边形等几何图形构成，而不是由像素网格（光栅）构成。非常适合绘制简单且清晰的图形。'
    },
    {
      id: 'graphics',
      word: 'Graphics',
      cn: '图形',
      icon: <MousePointer2 className="w-8 h-8 text-purple-500" />,
      desc: '最终呈现给用户的视觉内容，可以是图标、插画、图表，甚至是复杂的交互式动画。'
    }
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 将鼠标悬停在单词上，了解 SVG 每个字母的含义
      </p>
      
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex gap-4 md:gap-8 justify-center">
          {words.map((item) => (
            <div 
              key={item.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                hovered === item.id ? 'scale-110' : hovered ? 'opacity-40 scale-95' : 'scale-100'
              }`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-2">
                <span className={hovered === item.id ? 'text-primary' : ''}>
                  {item.word[0]}
                </span>
                {item.word.slice(1)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">{item.cn}</div>
            </div>
          ))}
        </div>

        <div className="relative h-32 w-full max-w-xl">
          {words.map((item) => (
            <div 
              key={`desc-${item.id}`}
              className={`absolute left-1/2 -translate-x-1/2 w-full max-w-xl transition-all duration-300 ${
                hovered === item.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="bg-muted rounded-xl p-6 flex gap-4 items-start shadow-sm border border-border">
                <div className="shrink-0 p-3 bg-background rounded-lg shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.word} ({item.cn})</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {!hovered && (
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl text-center text-muted-foreground pt-12 animate-pulse">
              Hover over a word to reveal its power
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
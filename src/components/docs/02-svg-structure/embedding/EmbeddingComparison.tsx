'use client';

import { CheckCircle2, XCircle, AlertCircle, Image as ImageIcon, Code, Palette, Globe, Link2 } from 'lucide-react';

export function EmbeddingComparison() {
  const features = [
    {
      title: '内联 SVG (Inline)',
      icon: <Code className="w-6 h-6 text-blue-500" />,
      method: '<svg>...</svg>',
      pros: ['最强大，完全成为 DOM 的一部分', '外部 CSS 可控', 'JS 事件全支持'],
      cons: ['无法作为独立文件缓存', '大文件会导致 HTML 臃肿'],
      scenario: 'UI 图标、数据可视化 (D3.js)、复杂交互动画',
      bgClass: 'bg-blue-500/5',
      iconBgClass: 'bg-blue-500/10'
    },
    {
      title: '<img> 标签',
      icon: <ImageIcon className="w-6 h-6 text-green-500" />,
      method: '<img src="image.svg" />',
      pros: ['最简单，语义明确', '支持浏览器强缓存', 'A11y 友好'],
      cons: ['外部 CSS 无法穿透', '主页面 JS 无法交互', '内部脚本不执行'],
      scenario: '纯静态插图、Logo、照片占位符',
      bgClass: 'bg-green-500/5',
      iconBgClass: 'bg-green-500/10'
    },
    {
      title: 'CSS 背景图',
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      method: 'background-image: url(...)',
      pros: ['适合纯装饰', '支持缓存', '不污染 DOM'],
      cons: ['无语义 (屏幕阅读器忽略)', '外部 CSS 无法穿透修改颜色'],
      scenario: '网页背景纹理、纯装饰性小图标',
      bgClass: 'bg-purple-500/5',
      iconBgClass: 'bg-purple-500/10'
    },
    {
      title: '<object> 标签',
      icon: <Globe className="w-6 h-6 text-orange-500" />,
      method: '<object data="image.svg">',
      pros: ['支持缓存', '同源下 JS 可通过 contentDocument 操作内部 DOM'],
      cons: ['语法古老', '处理跨域 (CORS) 麻烦'],
      scenario: '体积巨大需缓存的交互式地图',
      bgClass: 'bg-orange-500/5',
      iconBgClass: 'bg-orange-500/10'
    },
    {
      title: 'Data URI',
      icon: <Link2 className="w-6 h-6 text-pink-500" />,
      method: 'src="data:image/svg+xml..."',
      pros: ['减少小图标的 HTTP 请求', '体积比 Base64 编码小 (直接 URL 编码)'],
      cons: ['无法单独缓存', '增加 CSS 或 HTML 文件体积'],
      scenario: 'CSS 中的极小图标、极简 Loading 动画',
      bgClass: 'bg-pink-500/5',
      iconBgClass: 'bg-pink-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {features.map((feature, i) => (
        <div 
          key={i} 
          className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Background decoration */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 ${feature.bgClass}`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${feature.iconBgClass}`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg m-0">{feature.title}</h3>
            </div>
            
            <div className="mb-4 text-sm font-mono bg-muted/50 p-2 rounded text-muted-foreground break-all">
              {feature.method}
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="flex items-center gap-1.5 font-semibold text-green-600/80 mb-1">
                  <CheckCircle2 className="w-4 h-4" /> 优点
                </h4>
                <ul className="list-disc list-inside text-muted-foreground ml-1">
                  {feature.pros.map((pro, j) => <li key={j}>{pro}</li>)}
                </ul>
              </div>
              
              <div>
                <h4 className="flex items-center gap-1.5 font-semibold text-red-600/80 mb-1">
                  <XCircle className="w-4 h-4" /> 缺点
                </h4>
                <ul className="list-disc list-inside text-muted-foreground ml-1">
                  {feature.cons.map((con, j) => <li key={j}>{con}</li>)}
                </ul>
              </div>

              <div className="pt-2 border-t border-border">
                <h4 className="flex items-center gap-1.5 font-semibold text-blue-600/80 mb-1">
                  <AlertCircle className="w-4 h-4" /> 适用场景
                </h4>
                <p className="text-muted-foreground ml-1">{feature.scenario}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
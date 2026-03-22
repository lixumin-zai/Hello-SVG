'use client';

import { useState } from 'react';

export function ColorMorphPlayground() {
  const [activeTab, setActiveTab] = useState<'colormatrix' | 'morphology' | 'displacement'>('colormatrix');

  // ColorMatrix States
  const [cmType, setCmType] = useState<'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha'>('hueRotate');
  const [cmValue, setCmValue] = useState(180);

  // Morphology States
  const [operator, setOperator] = useState<'erode' | 'dilate'>('dilate');
  const [radius, setRadius] = useState(3);

  // Displacement States
  const [scale, setScale] = useState(20);
  const [baseFrequency, setBaseFrequency] = useState(0.05);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('colormatrix')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'colormatrix' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          颜色矩阵 (feColorMatrix)
        </button>
        <button 
          onClick={() => setActiveTab('morphology')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'morphology' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          形态学 (feMorphology)
        </button>
        <button 
          onClick={() => setActiveTab('displacement')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'displacement' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          置换形变 (feDisplacementMap)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {activeTab === 'colormatrix' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">转换类型 (type)</label>
                <select 
                  value={cmType} 
                  onChange={e => {
                    setCmType(e.target.value as any);
                    if (e.target.value === 'hueRotate') setCmValue(180);
                    if (e.target.value === 'saturate') setCmValue(0); // grayscale
                  }}
                  className="w-full p-2 bg-background border rounded text-sm"
                >
                  <option value="hueRotate">hueRotate (色相旋转)</option>
                  <option value="saturate">saturate (饱和度)</option>
                  <option value="luminanceToAlpha">luminanceToAlpha (亮度转透明度)</option>
                </select>
              </div>

              {(cmType === 'hueRotate' || cmType === 'saturate') && (
                <div className="space-y-2">
                  <label className="text-sm font-bold">值 (values)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min={cmType === 'hueRotate' ? "0" : "0"} 
                      max={cmType === 'hueRotate' ? "360" : "3"} 
                      step={cmType === 'hueRotate' ? "1" : "0.1"} 
                      value={cmValue} 
                      onChange={e => setCmValue(Number(e.target.value))} 
                      className="flex-1 accent-primary" 
                    />
                    <span className="text-xs w-8 text-right">
                      {cmValue}{cmType === 'hueRotate' ? '°' : ''}
                    </span>
                  </div>
                  {cmType === 'saturate' && cmValue === 0 && <p className="text-[10px] text-muted-foreground">0 = 完全灰度图</p>}
                  {cmType === 'saturate' && cmValue > 1 && <p className="text-[10px] text-muted-foreground">&gt;1 = 增加饱和度</p>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'morphology' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                形态学滤镜用于让图形"变胖"或"变瘦"，常用于给没有文字轮廓属性的文字加粗。
              </p>
              <div className="space-y-2">
                <label className="text-sm font-bold">操作 (operator)</label>
                <div className="flex gap-2">
                  <button onClick={() => setOperator('dilate')} className={`flex-1 py-1.5 text-xs rounded border ${operator === 'dilate' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background'}`}>
                    dilate (膨胀/变胖)
                  </button>
                  <button onClick={() => setOperator('erode')} className={`flex-1 py-1.5 text-xs rounded border ${operator === 'erode' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background'}`}>
                    erode (腐蚀/变瘦)
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-bold">半径 (radius)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="10" step="0.5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-xs w-8 text-right">{radius}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'displacement' && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                置换滤镜是 SVG 最酷的特效。我们先用 <code>feTurbulence</code> 生成柏林噪声(像云彩一样的随机纹理)，然后根据这个纹理的明暗，把原图的像素向四面八方推挤，形成水波纹或扭曲效果！
              </p>
              
              <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
                <label className="text-xs font-bold text-blue-600">1. 噪声频率 (baseFrequency)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0.01" max="0.2" step="0.01" value={baseFrequency} onChange={e => setBaseFrequency(Number(e.target.value))} className="flex-1 accent-blue-500" />
                  <span className="text-[10px] w-8 text-right">{baseFrequency.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">控制水波的密集程度。值越大波纹越细碎。</p>
              </div>

              <div className="space-y-2 p-3 border rounded-lg bg-orange-500/10 border-orange-500/30">
                <label className="text-xs font-bold text-orange-600">2. 扭曲力度 (scale)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="100" value={scale} onChange={e => setScale(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <span className="text-[10px] w-8 text-right">{scale}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">控制像素被推挤的距离。值越大扭曲越严重。</p>
              </div>
            </div>
          )}
        </div>

        {/* Display */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-3 bg-muted rounded-lg border font-mono text-[11px] text-primary whitespace-pre overflow-x-auto h-36">
{activeTab === 'colormatrix' ? `<filter id="colorFilter">
  <feColorMatrix 
    type="${cmType}" 
    ${cmType !== 'luminanceToAlpha' ? `values="${cmValue}" ` : ''}/>
</filter>` : ''}

{activeTab === 'morphology' ? `<filter id="morphFilter">
  <feMorphology 
    operator="${operator}" 
    radius="${radius}" />
</filter>` : ''}

{activeTab === 'displacement' ? `<filter id="distortFilter">
  <!-- 生成噪声图 -->
  <feTurbulence 
    type="turbulence" 
    baseFrequency="${baseFrequency}" 
    result="NOISE" />
  <!-- 将原图按噪声图的通道进行扭曲 -->
  <feDisplacementMap 
    in="SourceGraphic" in2="NOISE" 
    scale="${scale}" 
    xChannelSelector="R" yChannelSelector="G" />
</filter>` : ''}
          </div>

          <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern flex-1 min-h-[300px] flex items-center justify-center bg-background overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              <defs>
                {/* Color Matrix */}
                <filter id="cmFilter">
                  <feColorMatrix type={cmType} values={cmType !== 'luminanceToAlpha' ? cmValue.toString() : undefined} />
                </filter>

                {/* Morphology */}
                <filter id="morphFilter">
                  <feMorphology operator={operator} radius={radius} />
                </filter>

                {/* Displacement */}
                <filter id="distortFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              <g transform="translate(200, 150)">
                {activeTab === 'colormatrix' && (
                  <image 
                    href="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop" 
                    x="-150" y="-100" width="300" height="200" 
                    filter="url(#cmFilter)"
                  />
                )}

                {activeTab === 'morphology' && (
                  <text 
                    x="0" y="0" 
                    fontSize="60" 
                    fontWeight="bold" 
                    fontFamily="serif"
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="#3b82f6"
                    filter="url(#morphFilter)"
                  >
                    SVG Magic
                  </text>
                )}

                {activeTab === 'displacement' && (
                  <>
                    <text x="0" y="-30" fontSize="80" fontWeight="900" textAnchor="middle" fill="#f97316" filter="url(#distortFilter)">
                      DISTORT
                    </text>
                    <circle cx="0" cy="50" r="50" fill="#3b82f6" filter="url(#distortFilter)" />
                  </>
                )}
              </g>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
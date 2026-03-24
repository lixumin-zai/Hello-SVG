'use client';
import { useState } from 'react';

const STEPS = [
  { id: 0, title: '初始状态', desc: '画布和元素的默认坐标系', color: 'slate', code: '<g>\n  <rect x="50" y="50" ... />\n</g>' },
  { id: 1, title: '坐标系放大', desc: '执行 transform="scale(2)"，局部坐标轴被拉伸', color: 'blue', code: '<g transform="scale(2)">\n  ...\n</g>' },
  { id: 2, title: '寻找坐标点', desc: '在被拉伸的坐标系中，寻找 x=50, y=50 的位置', color: 'amber', code: '<g transform="scale(2)">\n  <rect x="50" y="50" ... />\n</g>' },
  { id: 3, title: '换算真实屏幕', desc: '换算回真实屏幕，它实际被画在 100 像素的位置', color: 'emerald', code: '<!-- 实际视觉效果：宽100，高100，位置(100,100) -->' },
];

export function LocalCoordinateStep() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  
  const colorCls: Record<string, string> = {
    slate: 'bg-slate-500/10 border-slate-500/40 text-slate-600 dark:text-slate-400',
    blue: 'bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
        <span>▶</span> 点击「下一步」观察局部坐标系的变化规律
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 左侧：步骤与代码 */}
        <div className="flex flex-col h-full">
          <div className={`rounded-lg border p-4 mb-4 transition-all duration-500 ${colorCls[current.color]}`}>
            <h4 className="font-semibold text-lg">
              Step {step + 1}/{STEPS.length}：{current.title}
            </h4>
            <p className="text-sm mt-2 opacity-90">{current.desc}</p>
          </div>

          <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto border border-border flex-grow">
            {current.code}
          </pre>

          {/* 控制按钮 */}
          <div className="flex gap-2 mt-4">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-accent transition-colors">
              ← 上一步
            </button>
            <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-30 hover:opacity-90 transition-opacity">
              下一步 →
            </button>
            <button onClick={() => setStep(0)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors ml-auto text-muted-foreground">
              重置
            </button>
          </div>
          
          {/* 进度条 */}
          <div className="flex gap-1 mt-4">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        {/* 右侧：可视化演示 */}
        <div className="rounded-lg border border-border bg-background overflow-hidden relative h-64 md:h-auto flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="-20 -20 200 200" className="overflow-visible">
            {/* 绝对坐标系 (黑色/灰色) */}
            <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
              {Array.from({length: 10}).map((_, i) => (
                <line key={`v${i}`} x1={i * 25} y1={-100} x2={i * 25} y2={200} />
              ))}
              {Array.from({length: 10}).map((_, i) => (
                <line key={`h${i}`} x1={-100} y1={i * 25} x2={200} y2={i * 25} />
              ))}
            </g>
            <text x="-15" y="-5" fontSize="8" fill="currentColor" opacity="0.5">绝对(0,0)</text>

            {/* 局部坐标系组 */}
            <g transform={`scale(${step >= 1 ? 2 : 1})`} className="transition-all duration-700 origin-top-left">
              
              {/* 局部坐标轴 (蓝色) */}
              <g className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                {/* 局部网格 */}
                <g stroke="#3b82f6" strokeOpacity="0.2" strokeWidth="0.5">
                  {Array.from({length: 5}).map((_, i) => (
                    <line key={`lv${i}`} x1={i * 25} y1={-100} x2={i * 25} y2={200} />
                  ))}
                  {Array.from({length: 5}).map((_, i) => (
                    <line key={`lh${i}`} x1={-100} y1={i * 25} x2={200} y2={i * 25} />
                  ))}
                </g>
                {/* 坐标轴强调 */}
                <line x1="0" y1="0" x2="200" y2="0" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="0" y2="200" stroke="#3b82f6" strokeWidth="1.5" />
              </g>

              {/* 目标图形 */}
              <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : step === 0 ? 'opacity-100' : 'opacity-30'}`}>
                <rect 
                  x="50" y="50" width="25" height="25" 
                  fill={step >= 3 ? "rgba(16, 185, 129, 0.5)" : "rgba(245, 158, 11, 0.5)"} 
                  stroke={step >= 3 ? "#10b981" : "#f59e0b"} 
                  strokeWidth="1" 
                  className="transition-colors duration-500"
                />
                
                {/* 辅助线指示位置 */}
                {step === 2 && (
                  <>
                    <line x1="0" y1="50" x2="50" y2="50" stroke="#f59e0b" strokeDasharray="2" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="50" stroke="#f59e0b" strokeDasharray="2" strokeWidth="0.5" />
                    <text x="5" y="45" fontSize="6" fill="#f59e0b">y=50</text>
                    <text x="40" y="10" fontSize="6" fill="#f59e0b">x=50</text>
                  </>
                )}
              </g>
            </g>
            
            {/* 步骤 3 的真实屏幕标注 */}
            {step === 3 && (
              <g className="animate-in fade-in zoom-in duration-500">
                <line x1="0" y1="100" x2="100" y2="100" stroke="#10b981" strokeDasharray="4" strokeWidth="1" />
                <line x1="100" y1="0" x2="100" y2="100" stroke="#10b981" strokeDasharray="4" strokeWidth="1" />
                <text x="10" y="95" fontSize="10" fill="#10b981" fontWeight="bold">真实距离: 100px</text>
                <text x="105" y="20" fontSize="10" fill="#10b981" fontWeight="bold">真实距离: 100px</text>
              </g>
            )}

          </svg>
        </div>
      </div>
    </div>
  );
}

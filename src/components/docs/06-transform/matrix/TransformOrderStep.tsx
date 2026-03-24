'use client';
import { useState } from 'react';

const CASES = [
  { id: 'a', label: '情况 A', code: 'rotate(45) translate(100, 0)' },
  { id: 'b', label: '情况 B', code: 'translate(100, 0) rotate(45)' },
];

export function TransformOrderStep() {
  const [activeCase, setActiveCase] = useState('a');
  const [step, setStep] = useState(0);

  // 动画状态：0: 初始，1: 第一步执行，2: 第二步执行
  const runStep = () => {
    if (step < 2) setStep(s => s + 1);
    else setStep(0);
  };

  const reset = () => setStep(0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
        <span>▶</span> 观察从右向左执行的变换顺序，点击「执行下一步」
      </p>

      {/* 切换情况 */}
      <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
        {CASES.map(c => (
          <button key={c.id}
            onClick={() => { setActiveCase(c.id); setStep(0); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCase === c.id
                ? 'bg-card shadow text-foreground scale-105'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {c.label}：{c.code}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 左侧说明 */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <h4 className="font-semibold text-sm mb-3">执行顺序 (从右向左)：</h4>
            
            <div className="space-y-3 relative">
              {/* 连接线 */}
              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-border z-0" />
              
              {/* Step 1 */}
              <div className={`relative z-10 flex gap-3 p-3 rounded-lg transition-all duration-300 ${step >= 1 ? 'bg-background shadow-sm border border-primary/30' : 'opacity-50 grayscale'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted-foreground'}`}>1</div>
                <div>
                  <div className="font-mono text-sm text-primary">
                    {activeCase === 'a' ? 'translate(100, 0)' : 'rotate(45)'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {activeCase === 'a' 
                      ? '图形沿当前 X 轴向右平移 100 像素。' 
                      : '图形原地旋转 45 度（此时它的局部坐标系也倾斜了 45 度！）。'}
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className={`relative z-10 flex gap-3 p-3 rounded-lg transition-all duration-300 ${step >= 2 ? 'bg-background shadow-sm border border-orange-500/30' : 'opacity-50 grayscale'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors ${step >= 2 ? 'bg-orange-500' : 'bg-muted-foreground'}`}>2</div>
                <div>
                  <div className="font-mono text-sm text-orange-600">
                    {activeCase === 'a' ? 'rotate(45)' : 'translate(100, 0)'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {activeCase === 'a' 
                      ? '图形连同它的坐标系以原点 (0,0) 为中心旋转 45 度。像被绳子拴着甩过去一样。' 
                      : '图形沿着已经倾斜了 45 度的新 X 轴，平移 100 像素。'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={runStep} disabled={step >= 2}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex-1 font-medium">
              {step === 0 ? '▶ 开始演示' : step === 1 ? '▶ 执行下一步' : '演示完成'}
            </button>
            <button onClick={reset}
              className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors">
              重置
            </button>
          </div>
        </div>

        {/* 右侧可视化 */}
        <div className="rounded-lg border border-border bg-background overflow-hidden relative h-64 md:h-auto flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="-50 -50 200 200" className="overflow-visible">
            {/* 绝对网格 */}
            <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
              <line x1="-1000" y1="0" x2="1000" y2="0" />
              <line x1="0" y1="-1000" x2="0" y2="1000" />
            </g>
            <circle cx="0" cy="0" r="3" fill="#ef4444" />
            <text x="5" y="-5" fontSize="10" fill="#ef4444">(0,0)</text>

            {/* 虚线初始轮廓 */}
            <rect x="0" y="-15" width="30" height="30" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2" />

            {/* 情况 A: rotate(45) translate(100,0) -> 实际是 translate先，rotate后 */}
            {activeCase === 'a' && (
              <g 
                transform={`rotate(${step >= 2 ? 45 : 0})`} 
                className="transition-transform duration-700 ease-in-out origin-top-left"
              >
                {/* 辅助线：连接原点和图形 */}
                <line x1="0" y1="0" x2="100" y2="0" stroke="#f97316" strokeDasharray="4" strokeWidth="1" opacity={step >= 1 ? 0.5 : 0} className="transition-opacity duration-300" />
                
                <g 
                  transform={`translate(${step >= 1 ? 100 : 0}, 0)`}
                  className="transition-transform duration-700 ease-in-out"
                >
                  <rect x="0" y="-15" width="30" height="30" fill="rgba(59, 130, 246, 0.8)" />
                  <circle cx="0" cy="0" r="2" fill="white" />
                  {/* 局部坐标轴 */}
                  <g stroke="white" strokeWidth="1" opacity="0.8">
                    <line x1="-10" y1="0" x2="40" y2="0" markerEnd="url(#arrow-w)" />
                    <line x1="0" y1="-25" x2="0" y2="25" markerEnd="url(#arrow-w)" />
                  </g>
                </g>
              </g>
            )}

            {/* 情况 B: translate(100,0) rotate(45) -> 实际是 rotate先，translate后 */}
            {activeCase === 'b' && (
              <g 
                transform={`translate(${step >= 2 ? 100 : 0}, 0)`} 
                className="transition-transform duration-700 ease-in-out"
              >
                <g 
                  transform={`rotate(${step >= 1 ? 45 : 0})`}
                  className="transition-transform duration-700 ease-in-out origin-top-left"
                >
                  <rect x="0" y="-15" width="30" height="30" fill="rgba(249, 115, 22, 0.8)" />
                  <circle cx="0" cy="0" r="2" fill="white" />
                  {/* 局部坐标轴 */}
                  <g stroke="white" strokeWidth="1" opacity="0.8">
                    <line x1="-10" y1="0" x2="40" y2="0" markerEnd="url(#arrow-w)" />
                    <line x1="0" y1="-25" x2="0" y2="25" markerEnd="url(#arrow-w)" />
                  </g>
                </g>
              </g>
            )}
            
            {/* 轨迹标注 */}
            {activeCase === 'a' && step >= 2 && (
              <path d="M 100 0 A 100 100 0 0 1 70.7 70.7" fill="none" stroke="#f97316" strokeDasharray="4" markerEnd="url(#arrow-o)" className="animate-in fade-in duration-500 delay-500" />
            )}

            <defs>
              <marker id="arrow-w" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
              </marker>
              <marker id="arrow-o" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

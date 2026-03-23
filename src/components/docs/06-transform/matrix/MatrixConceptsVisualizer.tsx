'use client';

import React, { useState } from 'react';
import { Table, Shuffle } from 'lucide-react';

export function MatrixConceptsVisualizer() {
  const [activeTab, setActiveTab] = useState<'params' | 'order'>('params');

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('params')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'params' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Table className="w-4 h-4" />
          矩阵参数
        </button>
        <button
          onClick={() => setActiveTab('order')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'order' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
        >
          <Shuffle className="w-4 h-4" />
          顺序决定命运
        </button>
      </div>

      <div className="p-6 min-h-[400px]">
        {activeTab === 'params' && <MatrixParamsTab />}
        {activeTab === 'order' && <OrderTab />}
      </div>
    </div>
  );
}

function MatrixParamsTab() {
  const params = [
    { name: 'a', label: 'Scale X', desc: 'X轴缩放', default: 1 },
    { name: 'b', label: 'Skew Y', desc: 'Y轴倾斜', default: 0 },
    { name: 'c', label: 'Skew X', desc: 'X轴倾斜', default: 0 },
    { name: 'd', label: 'Scale Y', desc: 'Y轴缩放', default: 1 },
    { name: 'e', label: 'Translate X', desc: 'X轴平移', default: 0 },
    { name: 'f', label: 'Translate Y', desc: 'Y轴平移', default: 0 },
  ];

  const [hoveredParam, setHoveredParam] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center h-full">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-semibold m-0">矩阵 6 参数</h3>
        <p className="text-muted-foreground text-sm m-0">
          所有的基础变换最终都会转换成这 6 个数字：<code>matrix(a, b, c, d, e, f)</code>。将鼠标悬停在参数上查看对应效果。
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {params.map((p) => (
            <div 
              key={p.name}
              onMouseEnter={() => setHoveredParam(p.name)}
              onMouseLeave={() => setHoveredParam(null)}
              className={`p-3 rounded-lg border cursor-default transition-colors ${hoveredParam === p.name ? 'border-primary bg-primary/10' : 'border-border bg-muted/20'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <strong className="text-lg font-mono text-primary">{p.name}</strong>
                <span className="text-xs text-muted-foreground font-mono">{p.default}</span>
              </div>
              <div className="text-sm font-medium">{p.label}</div>
              <div className="text-xs text-muted-foreground">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-64 aspect-square rounded-xl border border-border bg-muted/20 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="-100 -100 200 200" className="w-full h-full">
          {/* Axis */}
          <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1" className="text-border" />
          <line x1="0" y1="-100" x2="0" y2="100" stroke="currentColor" strokeWidth="1" className="text-border" />
          
          <g 
            className="transition-all duration-500 ease-in-out"
            transform={
              hoveredParam === 'a' ? 'matrix(1.5, 0, 0, 1, 0, 0)' :
              hoveredParam === 'b' ? 'matrix(1, 0.5, 0, 1, 0, 0)' :
              hoveredParam === 'c' ? 'matrix(1, 0, 0.5, 1, 0, 0)' :
              hoveredParam === 'd' ? 'matrix(1, 0, 0, 1.5, 0, 0)' :
              hoveredParam === 'e' ? 'matrix(1, 0, 0, 1, 40, 0)' :
              hoveredParam === 'f' ? 'matrix(1, 0, 0, 1, 0, 40)' :
              'matrix(1, 0, 0, 1, 0, 0)'
            }
          >
            <rect x="-30" y="-30" width="60" height="60" rx="4" fill="currentColor" className="text-primary opacity-80" />
            <circle cx="0" cy="0" r="3" fill="white" />
            <text x="5" y="-5" fontSize="10" fill="white">F</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function OrderTab() {
  const [step, setStep] = useState(0);

  const getTransformA = () => {
    if (step === 0) return '';
    if (step === 1) return 'translate(100, 0)';
    return 'rotate(45) translate(100, 0)'; // DOM execution is right to left
  };

  const getTransformB = () => {
    if (step === 0) return '';
    if (step === 1) return 'rotate(45)';
    return 'translate(100, 0) rotate(45)';
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h3 className="text-lg font-semibold m-0">从右向左执行</h3>
        <p className="text-muted-foreground text-sm m-0 mt-2">
          多个变换写在一起时（如 <code>transform="translate(100) rotate(45)"</code>），浏览器是从右向左执行的！这会导致组合结果大不相同。
        </p>
      </div>
      
      <div className="flex gap-2">
        <button onClick={() => setStep(0)} className={`px-3 py-1 rounded text-xs ${step === 0 ? 'bg-primary text-white' : 'bg-muted'}`}>初始状态</button>
        <button onClick={() => setStep(1)} className={`px-3 py-1 rounded text-xs ${step === 1 ? 'bg-primary text-white' : 'bg-muted'}`}>执行第一步</button>
        <button onClick={() => setStep(2)} className={`px-3 py-1 rounded text-xs ${step === 2 ? 'bg-primary text-white' : 'bg-muted'}`}>执行第二步</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-border bg-muted/10">
          <code className="text-xs mb-2 block font-bold text-primary">A: rotate(45) translate(100)</code>
          <div className="text-xs text-muted-foreground mb-4 h-10">
            {step === 0 && '等待执行...'}
            {step === 1 && '1. 先向右平移 100'}
            {step === 2 && '2. 然后绕原点 (0,0) 旋转 45°'}
          </div>
          <div className="w-full aspect-square bg-muted/30 border border-border rounded overflow-hidden relative">
            <svg viewBox="-50 -50 200 200" className="w-full h-full overflow-visible">
              <line x1="-50" y1="0" x2="200" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              <line x1="0" y1="-50" x2="0" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              
              <rect x="0" y="-15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-primary opacity-30" />
              
              <g transform={getTransformA()} className="transition-transform duration-700 ease-in-out">
                <rect x="0" y="-15" width="30" height="30" fill="currentColor" className="text-primary" />
                <line x1="0" y1="0" x2="40" y2="0" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
              </g>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/10">
          <code className="text-xs mb-2 block font-bold text-blue-500">B: translate(100) rotate(45)</code>
          <div className="text-xs text-muted-foreground mb-4 h-10">
            {step === 0 && '等待执行...'}
            {step === 1 && '1. 先原地旋转 45°（坐标系倾斜了）'}
            {step === 2 && '2. 沿着倾斜的 X 轴平移 100'}
          </div>
          <div className="w-full aspect-square bg-muted/30 border border-border rounded overflow-hidden relative">
            <svg viewBox="-50 -50 200 200" className="w-full h-full overflow-visible">
              <line x1="-50" y1="0" x2="200" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              <line x1="0" y1="-50" x2="0" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              
              <rect x="0" y="-15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-blue-500 opacity-30" />
              
              <g transform={getTransformB()} className="transition-transform duration-700 ease-in-out">
                <rect x="0" y="-15" width="30" height="30" fill="currentColor" className="text-blue-500" />
                <line x1="0" y1="0" x2="40" y2="0" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

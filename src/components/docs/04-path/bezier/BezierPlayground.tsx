'use client';

import { useState, useRef, useEffect } from 'react';

export function BezierPlayground() {
  const [activeTab, setActiveTab] = useState<'quadratic' | 'cubic'>('quadratic');

  // Point dragging logic
  const [draggingPoint, setDraggingPoint] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Quadratic Points (Q)
  const [qP0, setQP0] = useState({ x: 50, y: 250 });  // Start
  const [qP1, setQP1] = useState({ x: 150, y: 50 });  // Control
  const [qP2, setQP2] = useState({ x: 250, y: 250 }); // End

  // Cubic Points (C)
  const [cP0, setCP0] = useState({ x: 50, y: 250 });  // Start
  const [cP1, setCP1] = useState({ x: 100, y: 50 });  // Control 1
  const [cP2, setCP2] = useState({ x: 200, y: 50 });  // Control 2
  const [cP3, setCP3] = useState({ x: 250, y: 250 }); // End

  const handlePointerDown = (pointId: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    setDraggingPoint(pointId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingPoint || !svgRef.current) return;
    
    // Convert screen coordinates to SVG coordinates
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return;
    
    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    // Constrain within viewBox (0 0 300 300)
    const constrainedX = Math.max(0, Math.min(300, x));
    const constrainedY = Math.max(0, Math.min(300, y));

    const newPos = { x: Math.round(constrainedX), y: Math.round(constrainedY) };

    if (activeTab === 'quadratic') {
      if (draggingPoint === 'qP0') setQP0(newPos);
      if (draggingPoint === 'qP1') setQP1(newPos);
      if (draggingPoint === 'qP2') setQP2(newPos);
    } else {
      if (draggingPoint === 'cP0') setCP0(newPos);
      if (draggingPoint === 'cP1') setCP1(newPos);
      if (draggingPoint === 'cP2') setCP2(newPos);
      if (draggingPoint === 'cP3') setCP3(newPos);
    }
  };

  const handlePointerUp = () => {
    setDraggingPoint(null);
  };

  // Prevent scrolling while dragging on touch devices
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (draggingPoint) e.preventDefault();
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [draggingPoint]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex gap-2 mb-6 border-b pb-4">
        <button 
          onClick={() => setActiveTab('quadratic')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'quadratic' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          二次贝塞尔 (Q)
        </button>
        <button 
          onClick={() => setActiveTab('cubic')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'cubic' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          三次贝塞尔 (C)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Information Panel */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-bold text-foreground mb-2">
              {activeTab === 'quadratic' ? 'Q (Quadratic Bezier)' : 'C (Cubic Bezier)'}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {activeTab === 'quadratic' 
                ? '只需要 1 个控制点。曲线会向着控制点的方向弯曲，但不会碰到它。' 
                : '需要 2 个控制点。分别控制曲线出发时的切线方向和到达时的切线方向，可以画出 S 型曲线。'}
            </p>
            
            <div className="p-3 bg-background border rounded font-mono text-sm text-primary break-all">
              {activeTab === 'quadratic' 
                ? `M ${qP0.x} ${qP0.y} Q ${qP1.x} ${qP1.y}, ${qP2.x} ${qP2.y}`
                : `M ${cP0.x} ${cP0.y} C ${cP1.x} ${cP1.y}, ${cP2.x} ${cP2.y}, ${cP3.x} ${cP3.y}`
              }
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-semibold">▶ 提示：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>拖动右侧画布中的 <span className="text-orange-500 font-bold">橙色点</span> (控制点) 和 <span className="text-blue-500 font-bold">蓝色点</span> (端点)。</li>
              <li>注意观察虚线（切线）是如何影响曲线走向的。</li>
              {activeTab === 'cubic' && <li>尝试把两个控制点拉向相反方向，画出一个"S"型。</li>}
            </ul>
          </div>
        </div>

        {/* Interactive Canvas */}
        <div className="relative border-2 border-dashed border-border rounded-lg bg-grid-pattern h-[300px] overflow-hidden bg-background touch-none">
          <svg 
            ref={svgRef}
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            className="absolute inset-0 cursor-crosshair"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {activeTab === 'quadratic' ? (
              <>
                {/* Tangent Lines */}
                <line x1={qP0.x} y1={qP0.y} x2={qP1.x} y2={qP1.y} stroke="#f97316" strokeDasharray="4" strokeOpacity="0.5" />
                <line x1={qP1.x} y1={qP1.y} x2={qP2.x} y2={qP2.y} stroke="#f97316" strokeDasharray="4" strokeOpacity="0.5" />
                
                {/* The Bezier Curve */}
                <path 
                  d={`M ${qP0.x} ${qP0.y} Q ${qP1.x} ${qP1.y} ${qP2.x} ${qP2.y}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />

                {/* Draggable Points */}
                <g className="cursor-grab active:cursor-grabbing">
                  <circle cx={qP0.x} cy={qP0.y} r="8" fill="#3b82f6" onPointerDown={handlePointerDown('qP0')} />
                  <circle cx={qP2.x} cy={qP2.y} r="8" fill="#3b82f6" onPointerDown={handlePointerDown('qP2')} />
                  <circle cx={qP1.x} cy={qP1.y} r="8" fill="#f97316" onPointerDown={handlePointerDown('qP1')} />
                </g>
                <text x={qP1.x} y={qP1.y - 15} fontSize="12" textAnchor="middle" fill="#f97316">控制点</text>
              </>
            ) : (
              <>
                {/* Tangent Lines */}
                <line x1={cP0.x} y1={cP0.y} x2={cP1.x} y2={cP1.y} stroke="#f97316" strokeDasharray="4" strokeOpacity="0.5" />
                <line x1={cP3.x} y1={cP3.y} x2={cP2.x} y2={cP2.y} stroke="#f97316" strokeDasharray="4" strokeOpacity="0.5" />
                
                {/* The Bezier Curve */}
                <path 
                  d={`M ${cP0.x} ${cP0.y} C ${cP1.x} ${cP1.y} ${cP2.x} ${cP2.y} ${cP3.x} ${cP3.y}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />

                {/* Draggable Points */}
                <g className="cursor-grab active:cursor-grabbing">
                  <circle cx={cP0.x} cy={cP0.y} r="8" fill="#3b82f6" onPointerDown={handlePointerDown('cP0')} />
                  <circle cx={cP3.x} cy={cP3.y} r="8" fill="#3b82f6" onPointerDown={handlePointerDown('cP3')} />
                  <circle cx={cP1.x} cy={cP1.y} r="8" fill="#f97316" onPointerDown={handlePointerDown('cP1')} />
                  <circle cx={cP2.x} cy={cP2.y} r="8" fill="#f97316" onPointerDown={handlePointerDown('cP2')} />
                </g>
                <text x={cP1.x} y={cP1.y - 15} fontSize="12" textAnchor="middle" fill="#f97316">控制点1</text>
                <text x={cP2.x} y={cP2.y - 15} fontSize="12" textAnchor="middle" fill="#f97316">控制点2</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
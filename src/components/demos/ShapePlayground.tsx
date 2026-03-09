"use client";

import React, { useState } from 'react';

type ShapeType = 'line' | 'rect' | 'circle' | 'ellipse' | 'polygon' | 'polyline' | 'text';

interface ShapeAttribute {
  name: string;
  type: 'number' | 'text' | 'color' | 'range';
  label: string;
  min?: number;
  max?: number;
  defaultValue: any;
  description?: string;
}

const SHAPE_CONFIGS: Record<ShapeType, ShapeAttribute[]> = {
  line: [
    { name: 'x1', type: 'range', min: 0, max: 300, label: 'x1', defaultValue: 50 },
    { name: 'y1', type: 'range', min: 0, max: 200, label: 'y1', defaultValue: 50 },
    { name: 'x2', type: 'range', min: 0, max: 300, label: 'x2', defaultValue: 250 },
    { name: 'y2', type: 'range', min: 0, max: 200, label: 'y2', defaultValue: 150 },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#3b82f6' },
    { name: 'strokeWidth', type: 'range', min: 1, max: 20, label: 'Width', defaultValue: 4 },
  ],
  rect: [
    { name: 'x', type: 'range', min: 0, max: 300, label: 'x', defaultValue: 50 },
    { name: 'y', type: 'range', min: 0, max: 200, label: 'y', defaultValue: 50 },
    { name: 'width', type: 'range', min: 10, max: 200, label: 'Width', defaultValue: 100 },
    { name: 'height', type: 'range', min: 10, max: 150, label: 'Height', defaultValue: 80 },
    { name: 'rx', type: 'range', min: 0, max: 50, label: 'rx (Corner Radius)', defaultValue: 0 },
    { name: 'ry', type: 'range', min: 0, max: 50, label: 'ry (Corner Radius)', defaultValue: 0 },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: '#3b82f6' },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#1e3a8a' },
    { name: 'strokeWidth', type: 'range', min: 0, max: 10, label: 'Stroke Width', defaultValue: 2 },
  ],
  circle: [
    { name: 'cx', type: 'range', min: 0, max: 300, label: 'cx', defaultValue: 150 },
    { name: 'cy', type: 'range', min: 0, max: 200, label: 'cy', defaultValue: 100 },
    { name: 'r', type: 'range', min: 5, max: 100, label: 'r (Radius)', defaultValue: 50 },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: '#ef4444' },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#991b1b' },
    { name: 'strokeWidth', type: 'range', min: 0, max: 10, label: 'Stroke Width', defaultValue: 2 },
  ],
  ellipse: [
    { name: 'cx', type: 'range', min: 0, max: 300, label: 'cx', defaultValue: 150 },
    { name: 'cy', type: 'range', min: 0, max: 200, label: 'cy', defaultValue: 100 },
    { name: 'rx', type: 'range', min: 5, max: 150, label: 'rx (X Radius)', defaultValue: 80 },
    { name: 'ry', type: 'range', min: 5, max: 100, label: 'ry (Y Radius)', defaultValue: 50 },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: '#10b981' },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#065f46' },
    { name: 'strokeWidth', type: 'range', min: 0, max: 10, label: 'Stroke Width', defaultValue: 2 },
  ],
  polyline: [
    { name: 'points', type: 'text', label: 'Points', defaultValue: '50,150 100,50 150,150 200,50 250,150' },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: 'none' },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#f59e0b' },
    { name: 'strokeWidth', type: 'range', min: 1, max: 10, label: 'Stroke Width', defaultValue: 4 },
  ],
  polygon: [
    { name: 'points', type: 'text', label: 'Points', defaultValue: '150,20 200,180 50,60 250,60 100,180' },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: '#8b5cf6' },
    { name: 'fillRule', type: 'text', label: 'Fill Rule', defaultValue: 'evenodd' }, // simplified as text for now
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#5b21b6' },
    { name: 'strokeWidth', type: 'range', min: 1, max: 10, label: 'Stroke Width', defaultValue: 2 },
  ],
  text: [
    { name: 'x', type: 'range', min: 0, max: 300, label: 'x', defaultValue: 50 },
    { name: 'y', type: 'range', min: 0, max: 200, label: 'y', defaultValue: 100 },
    { name: 'content', type: 'text', label: 'Content', defaultValue: 'Hello SVG!' },
    { name: 'fontSize', type: 'range', min: 10, max: 80, label: 'Font Size', defaultValue: 40 },
    { name: 'fill', type: 'color', label: 'Fill', defaultValue: '#ec4899' },
    { name: 'stroke', type: 'color', label: 'Stroke', defaultValue: '#831843' },
    { name: 'strokeWidth', type: 'range', min: 0, max: 5, label: 'Stroke Width', defaultValue: 1 },
    { name: 'fontWeight', type: 'text', label: 'Font Weight', defaultValue: 'bold' },
  ],
};

export function ShapePlayground({ initialType = 'rect' }: { initialType?: ShapeType }) {
  const [type, setType] = useState<ShapeType>(initialType);
  
  // Manage state for all possible attributes across all shapes
  // This is a bit lazy but effective for a playground
  const [attributes, setAttributes] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    Object.values(SHAPE_CONFIGS).flat().forEach(attr => {
      if (!(attr.name in defaults)) {
        defaults[attr.name] = attr.defaultValue;
      }
    });
    return defaults;
  });

  const currentConfig = SHAPE_CONFIGS[type];

  const handleAttrChange = (name: string, value: any) => {
    setAttributes(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (newType: ShapeType) => {
    setType(newType);
    // Optional: Reset attributes to defaults for the new type?
    // For now, let's keep shared attributes (like fill/stroke) and reset others if needed.
    // Actually, getting defaults for the new type is better for UX
    const newDefaults: Record<string, any> = {};
    SHAPE_CONFIGS[newType].forEach(attr => {
      newDefaults[attr.name] = attr.defaultValue;
    });
    setAttributes(prev => ({ ...prev, ...newDefaults }));
  };

  // Construct the SVG element string for display
  const getElementCode = () => {
    const attrStrings = currentConfig
      .filter(attr => attr.name !== 'content')
      .map(attr => {
        // Skip default values if we wanted to be cleaner, but explicit is good for learning
        return `${attr.name}="${attributes[attr.name]}"`;
      })
      .join(' ');

    if (type === 'text') {
      return `<text ${attrStrings}>${attributes.content}</text>`;
    }
    return `<${type} ${attrStrings} />`;
  };

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
      {/* Type Selector */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {Object.keys(SHAPE_CONFIGS).map((t) => (
          <button
            key={t}
            onClick={() => handleTypeChange(t as ShapeType)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              type === t 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">预览 (Preview)</h3>
          <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden flex items-center justify-center p-4 h-[300px]">
             <svg width="300" height="200" viewBox="0 0 300 200" className="bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <defs>
                  <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.05" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" className="text-zinc-500" />
                
                {/* Render the active shape */}
                {type === 'line' && (
                  <line 
                    x1={attributes.x1} y1={attributes.y1} 
                    x2={attributes.x2} y2={attributes.y2} 
                    stroke={attributes.stroke} strokeWidth={attributes.strokeWidth} 
                    strokeLinecap="round"
                  />
                )}
                {type === 'rect' && (
                  <rect 
                    x={attributes.x} y={attributes.y} 
                    width={attributes.width} height={attributes.height} 
                    rx={attributes.rx} ry={attributes.ry}
                    fill={attributes.fill} stroke={attributes.stroke} strokeWidth={attributes.strokeWidth} 
                  />
                )}
                {type === 'circle' && (
                  <circle 
                    cx={attributes.cx} cy={attributes.cy} r={attributes.r} 
                    fill={attributes.fill} stroke={attributes.stroke} strokeWidth={attributes.strokeWidth} 
                  />
                )}
                {type === 'ellipse' && (
                  <ellipse 
                    cx={attributes.cx} cy={attributes.cy} rx={attributes.rx} ry={attributes.ry} 
                    fill={attributes.fill} stroke={attributes.stroke} strokeWidth={attributes.strokeWidth} 
                  />
                )}
                {type === 'polyline' && (
                  <polyline 
                    points={attributes.points} 
                    fill={attributes.fill} stroke={attributes.stroke} strokeWidth={attributes.strokeWidth}
                    strokeLinejoin="round" strokeLinecap="round"
                  />
                )}
                {type === 'polygon' && (
                  <polygon 
                    points={attributes.points} 
                    fill={attributes.fill} fillRule={attributes.fillRule}
                    stroke={attributes.stroke} strokeWidth={attributes.strokeWidth}
                    strokeLinejoin="round"
                  />
                )}
                {type === 'text' && (
                  <text 
                    x={attributes.x} y={attributes.y} 
                    fontSize={attributes.fontSize} fontWeight={attributes.fontWeight}
                    fill={attributes.fill} stroke={attributes.stroke} strokeWidth={attributes.strokeWidth}
                    dominantBaseline="middle" textAnchor="middle"
                  >
                    {attributes.content}
                  </text>
                )}
             </svg>
             <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono">300x200 Canvas</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
          <div className="space-y-4">
             {currentConfig.map((attr) => (
               <div key={attr.name} className="space-y-1">
                 <div className="flex justify-between items-center">
                   <label className="text-xs font-medium text-zinc-500">{attr.label} <code className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{attr.name}</code></label>
                   {attr.type === 'range' && <span className="text-xs font-mono">{attributes[attr.name]}</span>}
                 </div>
                 
                 {attr.type === 'range' && (
                   <input 
                     type="range" 
                     min={attr.min} max={attr.max} 
                     value={attributes[attr.name]} 
                     onChange={(e) => handleAttrChange(attr.name, Number(e.target.value))}
                     className="w-full accent-blue-500"
                   />
                 )}
                 
                 {attr.type === 'color' && (
                   <div className="flex gap-2 items-center">
                     <input 
                       type="color" 
                       value={attributes[attr.name] === 'none' ? '#ffffff' : attributes[attr.name]} 
                       onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                       className="h-8 w-12 cursor-pointer border border-zinc-200 dark:border-zinc-700 rounded"
                     />
                     <input 
                        type="text"
                        value={attributes[attr.name]}
                        onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                        className="flex-1 px-2 py-1 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded"
                     />
                   </div>
                 )}
                 
                 {(attr.type === 'text') && (
                   <input 
                     type="text" 
                     value={attributes[attr.name]} 
                     onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                     className="w-full px-2 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded"
                   />
                 )}
               </div>
             ))}
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
             <h4 className="text-xs font-semibold mb-2 text-zinc-500">Generated Code</h4>
             <div className="bg-zinc-900 rounded-md p-3 overflow-x-auto">
               <code className="text-xs text-zinc-300 font-mono whitespace-pre">
                 {`<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n  ${getElementCode()}\n</svg>`}
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

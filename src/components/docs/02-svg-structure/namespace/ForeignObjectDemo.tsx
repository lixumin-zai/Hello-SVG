'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function ForeignObjectDemo() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 在下方的 SVG 中直接与 HTML 表单交互，这在纯 SVG 节点中是无法做到的
      </p>

      <div className="flex flex-col items-center justify-center p-8 bg-grid-pattern border rounded-lg bg-background relative overflow-hidden">
        {/* SVG Container */}
        <svg 
          width="400" 
          height="300" 
          viewBox="0 0 400 300" 
          className="shadow-xl rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          {/* Pure SVG Elements */}
          <circle cx="50" cy="50" r="150" fill="white" fillOpacity="0.1" />
          <circle cx="350" cy="250" r="100" fill="white" fillOpacity="0.1" />
          <path d="M 0 300 Q 200 200 400 300 Z" fill="white" fillOpacity="0.2" />

          <text x="200" y="50" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" className="drop-shadow-md">
            订阅我们的 SVG 教程
          </text>

          {/* foreignObject containing HTML */}
          <foreignObject x="50" y="90" width="300" height="180">
            {/* xmlns is implicitly handled by React/HTML5, but we represent the HTML context here */}
            <div className="h-full flex flex-col justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white">
              {submitted ? (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">订阅成功!</h3>
                  <p className="text-sm opacity-80 mt-1">{email}</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if(email) setSubmitted(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium opacity-90">电子邮箱</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2 bg-white text-indigo-600 font-bold rounded-md hover:bg-opacity-90 transition-colors shadow-lg"
                  >
                    立即订阅
                  </button>
                </form>
              )}
            </div>
          </foreignObject>
        </svg>
        
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded backdrop-blur">
          虚线框内为 &lt;foreignObject&gt; 嵌入的真实 HTML &lt;div&gt;
        </div>
      </div>
    </div>
  );
}
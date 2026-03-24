'use client';

export function TextWrapComparison() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SVG <text> without wrapping */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-lg">纯 SVG 文本</h3>
          </div>
          <p className="text-sm text-muted-foreground">无论文本多长，直接冲出画布边界，不换行。</p>
          
          <div className="border bg-background rounded-lg p-4 h-[180px] overflow-hidden relative">
            <svg viewBox="0 0 200 150" className="w-full h-full">
              <rect width="200" height="150" fill="currentColor" className="text-muted/20" />
              <text x="10" y="30" fontSize="14" className="fill-foreground font-medium">
                这是一段非常非常长的文字，如果只使用 SVG 的基础 text 标签，它是绝对不会自动换行的，直接超出了画布的右侧边缘！
              </text>
            </svg>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* SVG <foreignObject> with wrapping */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-lg">使用 foreignObject</h3>
          </div>
          <p className="text-sm text-muted-foreground">嵌入 HTML 元素，利用浏览器的排版引擎完美实现自动换行。</p>
          
          <div className="border bg-background rounded-lg p-4 h-[180px] relative">
            <svg viewBox="0 0 200 150" className="w-full h-full">
              <rect width="200" height="150" fill="currentColor" className="text-muted/20" />
              <foreignObject x="10" y="10" width="180" height="130">
                <div className="text-sm text-foreground/80 leading-relaxed">
                  这是一段非常非常长的文字，但因为使用了 <code>foreignObject</code> 包裹 <code>&lt;div&gt;</code>，所以它能够优雅地在容器内自动换行。
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

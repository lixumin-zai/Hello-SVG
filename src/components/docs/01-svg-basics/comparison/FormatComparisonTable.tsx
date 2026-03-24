'use client';

export function FormatComparisonTable() {
  const formats = [
    {
      name: 'SVG',
      type: '矢量图',
      pros: '无损缩放、体积小、DOM 可控、CSS 样式化、文本可搜索',
      cons: '不适合复杂照片，元素过多时性能下降',
      useCase: '图标、Logo、数据图表、UI 插画',
      badge: 'bg-green-500/20 text-green-600 border-green-500/30'
    },
    {
      name: 'PNG',
      type: '光栅图 (无损)',
      pros: '支持透明通道（Alpha），图像边缘清晰不模糊',
      cons: '放大后有锯齿，文件体积通常较大',
      useCase: '需透明背景的复杂图、屏幕截图',
      badge: 'bg-blue-500/20 text-blue-600 border-blue-500/30'
    },
    {
      name: 'JPEG',
      type: '光栅图 (有损)',
      pros: '极高的压缩率，非常适合色彩丰富的真实世界照片',
      cons: '不支持透明度，有压缩伪影，文字和锐利边缘会模糊',
      useCase: '摄影照片、复杂的渐变背景',
      badge: 'bg-orange-500/20 text-orange-600 border-orange-500/30'
    },
    {
      name: 'WebP',
      type: '现代光栅图',
      pros: '兼具 JPEG 的压缩率和 PNG 的透明度，体积通常小 25%-34%',
      cons: '极少数老旧浏览器（如旧版 Safari）不支持',
      useCase: '替代 PNG/JPEG 的全能格式',
      badge: 'bg-purple-500/20 text-purple-600 border-purple-500/30'
    }
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 border-b border-border">
              <th className="p-4 font-semibold text-foreground">格式</th>
              <th className="p-4 font-semibold text-foreground">类型</th>
              <th className="p-4 font-semibold text-foreground">优点</th>
              <th className="p-4 font-semibold text-foreground">缺点</th>
              <th className="p-4 font-semibold text-foreground">适用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {formats.map((format, idx) => (
              <tr key={idx} className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-bold">
                  <span className={`px-2 py-1 rounded border text-xs ${format.badge}`}>
                    {format.name}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{format.type}</td>
                <td className="p-4 text-sm text-foreground">{format.pros}</td>
                <td className="p-4 text-sm text-muted-foreground">{format.cons}</td>
                <td className="p-4 text-sm font-medium text-foreground">{format.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

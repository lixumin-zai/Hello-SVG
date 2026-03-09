# Hello-SVG: A Full Panorama Survey of SVG Vector Graphics
## 超详细大纲

---

## 第一部分：SVG 基础与历史

### 1.1 SVG 的起源与发展史
- 1.1.1 矢量图形的历史背景（PostScript、EPS 时代）
- 1.1.2 W3C 的 SVG 标准化历程（1999 年至今）
- 1.1.3 SVG 各版本演进：1.0 → 1.1 → 1.2 → 2.0
- 1.1.4 浏览器支持历史与现状（IE6 的噩梦到全面支持）
- 1.1.5 SVG vs. Flash：一场时代之战

### 1.2 SVG 的本质与定位
- 1.2.1 什么是矢量图形？栅格 vs. 矢量的根本区别
- 1.2.2 SVG 是 XML —— 文本、可读、可搜索
- 1.2.3 分辨率无关性：Retina 屏的救星
- 1.2.4 SVG 在现代 Web 生态中的角色
- 1.2.5 SVG 的使用场景全景图（图标、插图、图表、动画、地图…）

### 1.3 SVG 与其他图形技术对比
- 1.3.1 SVG vs. Canvas（声明式 vs. 命令式）
- 1.3.2 SVG vs. WebGL（2D vs. 3D，CPU vs. GPU）
- 1.3.3 SVG vs. CSS shapes & clip-path
- 1.3.4 SVG vs. PNG/JPEG/WebP（何时该用哪个？）
- 1.3.5 SVG vs. PDF（共同祖先，不同归宿）

---

## 第二部分：SVG 文档结构

### 2.1 SVG 文件剖析
- 2.1.1 XML 声明与文档类型
- 2.1.2 `<svg>` 根元素详解
  - `xmlns` 命名空间
  - `viewBox`、`width`、`height` 三者关系
  - `preserveAspectRatio` 属性全解析
- 2.1.3 SVG 坐标系统：原点、X/Y 轴方向
- 2.1.4 用户坐标系 vs. 视口坐标系
- 2.1.5 嵌套 `<svg>` 与子坐标系

### 2.2 SVG 嵌入方式大全
- 2.2.1 内联 SVG（Inline SVG）——最强大的方式
- 2.2.2 `<img src="*.svg">` ——最简单但限制最多
- 2.2.3 CSS `background-image: url(*.svg)`
- 2.2.4 `<object>` 与 `<embed>` 标签
- 2.2.5 `<iframe>` 嵌入
- 2.2.6 Data URI（Base64 编码内联）
- 2.2.7 各方式的能力对比表（脚本、样式、交互、CORS）

### 2.3 SVG 命名空间与扩展
- 2.3.1 SVG 命名空间 `http://www.w3.org/2000/svg`
- 2.3.2 XLink 命名空间（历史遗留）
- 2.3.3 MathML 与 SVG 混用
- 2.3.4 自定义数据属性 `data-*` 在 SVG 中的应用

---

## 第三部分：基础图形元素

### 3.1 直线与折线
- 3.1.1 `<line>`：x1, y1, x2, y2 属性详解
- 3.1.2 `<polyline>`：points 属性格式，开放路径
- 3.1.3 描边（stroke）的重要性：没有 stroke 就看不见！

### 3.2 矩形
- 3.2.1 `<rect>`：x, y, width, height
- 3.2.2 圆角矩形：rx 与 ry 的微妙差异
- 3.2.3 实战：用矩形绘制图表、卡片、进度条

### 3.3 圆与椭圆
- 3.3.1 `<circle>`：cx, cy, r
- 3.3.2 `<ellipse>`：cx, cy, rx, ry
- 3.3.3 实战：甜甜圈图、气泡图、头像占位符

### 3.4 多边形
- 3.4.1 `<polygon>`：与 polyline 的区别（自动闭合）
- 3.4.2 绘制正多边形的数学公式
- 3.4.3 实战：星形、六边形网格、雷达图

### 3.5 文本
- 3.5.1 `<text>` 元素：x, y, 基线对齐
- 3.5.2 `<tspan>`：行内文本分组与定位
- 3.5.3 `<textPath>`：文字沿路径排列
- 3.5.4 文本属性：font-family, font-size, text-anchor, dominant-baseline
- 3.5.5 多行文本的挑战与解决方案（foreignObject 方案）
- 3.5.6 字体嵌入：`@font-face` 在 SVG 中的使用
- 3.5.7 文本可访问性（screen reader 支持）

---

## 第四部分：路径（Path）——SVG 的核心

### 4.1 `<path>` 元素与 d 属性
- 4.1.1 路径的本质：一系列命令的序列
- 4.1.2 绝对命令（大写）vs. 相对命令（小写）
- 4.1.3 路径数据的压缩格式

### 4.2 直线命令
- 4.2.1 `M/m`：MoveTo（移动画笔，不画线）
- 4.2.2 `L/l`：LineTo（画直线）
- 4.2.3 `H/h`：水平线
- 4.2.4 `V/v`：垂直线
- 4.2.5 `Z/z`：ClosePath（闭合路径）

### 4.3 贝塞尔曲线命令
- 4.3.1 贝塞尔曲线数学基础（伯恩斯坦多项式）
- 4.3.2 `Q/q`：二次贝塞尔曲线（1个控制点）
- 4.3.3 `T/t`：平滑二次贝塞尔（自动镜像控制点）
- 4.3.4 `C/c`：三次贝塞尔曲线（2个控制点）
- 4.3.5 `S/s`：平滑三次贝塞尔
- 4.3.6 控制点可视化理解

### 4.4 弧线命令
- 4.4.1 `A/a`：椭圆弧——SVG 中最复杂的命令
  - rx, ry：椭圆半径
  - x-axis-rotation：旋转角度
  - large-arc-flag：大弧 vs. 小弧
  - sweep-flag：顺时针 vs. 逆时针
  - x, y：终点坐标
- 4.4.2 弧线的 4 种可能情况图解
- 4.4.3 实战：绘制饼图扇形、圆角、进度环

### 4.5 路径的填充规则
- 4.5.1 `fill-rule: nonzero`（非零缠绕规则）
- 4.5.2 `fill-rule: evenodd`（奇偶规则）
- 4.5.3 复合路径与镂空效果（甜甜圈形状）
- 4.5.4 `clip-rule` vs. `fill-rule`

### 4.6 路径工具与优化
- 4.6.1 Inkscape、Illustrator 导出路径
- 4.6.2 SVGO 路径优化原理
- 4.6.3 路径简化算法（Ramer-Douglas-Peucker）

---

## 第五部分：样式与外观

### 5.1 SVG 样式的三种方式
- 5.1.1 Presentation Attributes（表现属性）
- 5.1.2 内联 style 属性
- 5.1.3 CSS 样式表（内部 `<style>` 或外部 CSS）
- 5.1.4 三种方式的优先级与继承规则

### 5.2 填充（Fill）
- 5.2.1 `fill` 颜色值：关键词、hex、rgb、hsl、oklch
- 5.2.2 `fill-opacity`：透明度
- 5.2.3 `fill: none` 的用途
- 5.2.4 `fill: currentColor`——SVG 与 CSS 主题联动的关键

### 5.3 描边（Stroke）
- 5.3.1 `stroke`：描边颜色
- 5.3.2 `stroke-width`：线宽（注意：以坐标单位为准）
- 5.3.3 `stroke-opacity`：描边透明度
- 5.3.4 `stroke-linecap`：线端形状（butt / round / square）
- 5.3.5 `stroke-linejoin`：转角形状（miter / round / bevel）
- 5.3.6 `stroke-miterlimit`：斜接限制
- 5.3.7 `stroke-dasharray`：虚线模式
- 5.3.8 `stroke-dashoffset`：虚线偏移（动画神器！）
- 5.3.9 `stroke-alignment`（SVG 2.0 新特性，争议中）
- 5.3.10 `vector-effect: non-scaling-stroke`：缩放不变线宽

### 5.4 透明度与混合
- 5.4.1 `opacity` vs. `fill-opacity` + `stroke-opacity` 的区别
- 5.4.2 `mix-blend-mode` 在 SVG 中的使用
- 5.4.3 `isolation: isolate` 创建隔离的混合上下文

### 5.5 SVG 中的 CSS 特性
- 5.5.1 CSS 变量（Custom Properties）在 SVG 中的应用
- 5.5.2 CSS 伪类（`:hover`, `:focus`, `:nth-child`）
- 5.5.3 CSS Transitions 在 SVG 属性上的应用
- 5.5.4 哪些 SVG 属性可以用 CSS 动画，哪些不行

---

## 第六部分：变换（Transforms）

### 6.1 SVG transform 属性
- 6.1.1 `translate(tx, ty)`：平移
- 6.1.2 `rotate(angle, cx, cy)`：旋转（注意中心点！）
- 6.1.3 `scale(sx, sy)`：缩放（负值镜像）
- 6.1.4 `skewX(angle)` / `skewY(angle)`：倾斜
- 6.1.5 `matrix(a, b, c, d, e, f)`：2D 变换矩阵完全控制

### 6.2 变换的数学基础
- 6.2.1 齐次坐标系与矩阵乘法
- 6.2.2 变换顺序的重要性（先旋转后平移 ≠ 先平移后旋转）
- 6.2.3 组合变换的矩阵推导

### 6.3 CSS Transform vs. SVG transform
- 6.3.1 `transform-origin` 在 SVG 中的行为差异（历史 bug）
- 6.3.2 SVG 2.0 与 CSS Transforms Level 2 的统一
- 6.3.3 `transform-box: fill-box` 修复 transform-origin 问题

### 6.4 坐标系变换高级话题
- 6.4.1 `<g>` 分组与变换继承
- 6.4.2 嵌套变换的累积效果
- 6.4.3 `getCTM()` 与 `getScreenCTM()`：JavaScript 中获取变换矩阵

---

## 第七部分：渐变与图案

### 7.1 线性渐变
- 7.1.1 `<linearGradient>` 完整语法
- 7.1.2 x1, y1, x2, y2 坐标系（objectBoundingBox vs. userSpaceOnUse）
- 7.1.3 `<stop>` 元素：offset, stop-color, stop-opacity
- 7.1.4 渐变的扩展方式：spreadMethod（pad / reflect / repeat）
- 7.1.5 渐变继承与复用（`xlink:href` / `href`）
- 7.1.6 实战：金属质感、天空渐变

### 7.2 径向渐变
- 7.2.1 `<radialGradient>` 完整语法
- 7.2.2 cx, cy（中心点）vs. fx, fy（焦点）
- 7.2.3 制作球体光照效果
- 7.2.4 椭圆径向渐变

### 7.3 网格渐变（SVG 2.0）
- 7.3.1 `<meshgradient>` 介绍（实验性）
- 7.3.2 真正的二维渐变控制

### 7.4 图案填充
- 7.4.1 `<pattern>` 元素完整语法
- 7.4.2 patternUnits vs. patternContentUnits
- 7.4.3 patternTransform：图案变换
- 7.4.4 实战：斜线填充、波点、棋盘格、碳纤维纹理
- 7.4.5 图案嵌套图案

---

## 第八部分：滤镜（Filters）

### 8.1 SVG 滤镜系统概述
- 8.1.1 `<filter>` 元素与滤镜图（Filter Primitive Graph）
- 8.1.2 x, y, width, height：滤镜作用区域
- 8.1.3 `result` 与 `in`：滤镜原语的连接
- 8.1.4 特殊输入：`SourceGraphic`、`SourceAlpha`、`BackgroundImage`

### 8.2 颜色与亮度类滤镜原语
- 8.2.1 `<feColorMatrix>`：颜色矩阵变换（灰度、反色、色相旋转）
- 8.2.2 `<feComponentTransfer>`：分通道调整（gamma、线性、阶梯）
- 8.2.3 `<feFlood>`：纯色填充
- 8.2.4 `<feTurbulence>`：柏林噪声（Perlin Noise）与湍流

### 8.3 模糊类滤镜原语
- 8.3.1 `<feGaussianBlur>`：高斯模糊（stdDeviation 参数）
- 8.3.2 `edgeMode`：边缘处理（duplicate / wrap / none）
- 8.3.3 性能考虑：GPU 加速 blur

### 8.4 合成与混合类滤镜原语
- 8.4.1 `<feBlend>`：图层混合模式（multiply, screen, overlay…）
- 8.4.2 `<feComposite>`：图像合成（Porter-Duff 运算）
- 8.4.3 `<feMerge>`：多图层合并

### 8.5 形变类滤镜原语
- 8.5.1 `<feDisplacementMap>`：置换贴图（水波纹效果！）
- 8.5.2 `<feMorphology>`：形态学（erode 腐蚀 / dilate 膨胀）
- 8.5.3 `<feOffset>`：偏移

### 8.6 光照类滤镜原语
- 8.6.1 `<feDiffuseLighting>` + `<fePointLight>`：漫反射点光源
- 8.6.2 `<feSpecularLighting>` + `<feSpotLight>`：镜面反射聚光灯
- 8.6.3 `<feDistantLight>`：平行光（太阳光）
- 8.6.4 实战：浮雕效果、立体按钮

### 8.7 卷积类滤镜原语
- 8.7.1 `<feConvolveMatrix>`：矩阵卷积（锐化、浮雕、边缘检测）

### 8.8 滤镜实战食谱
- 8.8.1 投影（Drop Shadow）：`feDropShadow` 或手工合成
- 8.8.2 发光效果（Glow）
- 8.8.3 纸张纹理
- 8.8.4 玻璃/毛玻璃效果
- 8.8.5 SVG 滤镜 + CSS backdrop-filter 协同

---

## 第九部分：裁剪与蒙版

### 9.1 裁剪路径（Clip Path）
- 9.1.1 `<clipPath>` 元素：定义裁剪区域
- 9.1.2 `clip-path` 属性：应用到元素
- 9.1.3 `clipPathUnits`：userSpaceOnUse vs. objectBoundingBox
- 9.1.4 任何 SVG 元素都可以做 clipPath（文字裁剪！）
- 9.1.5 CSS `clip-path` 与 SVG `clipPath` 的关系
- 9.1.6 实战：图片裁剪为异形、文字填充图片

### 9.2 蒙版（Mask）
- 9.2.1 `<mask>` 元素：Alpha 蒙版 vs. 亮度蒙版
- 9.2.2 `mask-mode`：alpha vs. luminance
- 9.2.3 `maskUnits` 与 `maskContentUnits`
- 9.2.4 渐变蒙版：实现淡出效果
- 9.2.5 Clip Path vs. Mask：性能与能力对比
- 9.2.6 实战：照片渐隐、轮廓光效

---

## 第十部分：复用与组合

### 10.1 定义与复用
- 10.1.1 `<defs>`：定义不渲染的资源
- 10.1.2 `<use>`：复用元素（Shadow DOM）
  - href vs. xlink:href（废弃警告！）
  - `<use>` 的样式继承与覆盖
  - `<use>` 中的 CSS 变量技巧
- 10.1.3 `<symbol>`：可复用组件（自带 viewBox）
  - Symbol vs. Group 的区别
  - SVG Sprite 技术原理

### 10.2 SVG Sprite 系统
- 10.2.1 传统 CSS Sprite vs. SVG Sprite
- 10.2.2 构建 SVG Icon System
- 10.2.3 External SVG Sprite（跨文件引用）
- 10.2.4 工具链：svg-sprite, svgstore, SVGR

### 10.3 分组
- 10.3.1 `<g>` 元素：逻辑分组，继承属性
- 10.3.2 `<g>` 的变换与样式传播
- 10.3.3 `<g>` 与 CSS 动画的配合

### 10.4 图像嵌入
- 10.4.1 `<image>` 元素：嵌入光栅图像
- 10.4.2 `preserveAspectRatio` 在 `<image>` 中的行为
- 10.4.3 SVG 内嵌 SVG（`<image>` 嵌 SVG 隔离 vs. 内联 `<svg>` 嵌套）

---

## 第十一部分：标记（Markers）

### 11.1 `<marker>` 元素
- 11.1.1 marker 的定义语法
- 11.1.2 `markerWidth`, `markerHeight`, `refX`, `refY`
- 11.1.3 `markerUnits`：strokeWidth vs. userSpaceOnUse
- 11.1.4 `orient`：auto（跟随路径方向）vs. 固定角度

### 11.2 Marker 应用属性
- 11.2.1 `marker-start`：路径起点
- 11.2.2 `marker-mid`：路径中间点
- 11.2.3 `marker-end`：路径终点
- 11.2.4 `marker`：简写（同时设置三者）

### 11.3 Marker 实战
- 11.3.1 箭头制作（经典三角形 marker）
- 11.3.2 折线图上的数据点标记
- 11.3.3 流程图连线箭头

---

## 第十二部分：动画

### 12.1 SMIL 动画（SVG 原生动画）
- 12.1.1 SMIL 的历史与现状（Chrome 曾宣布废弃又撤回）
- 12.1.2 `<animate>`：属性值动画
  - attributeName, from, to, dur, repeatCount
  - values + keyTimes：关键帧
  - calcMode：离散/线性/样条/步进
- 12.1.3 `<animateTransform>`：变换动画
- 12.1.4 `<animateMotion>`：路径运动动画
  - `<mpath>` 元素引用路径
  - rotate="auto"：自动跟随方向
- 12.1.5 `<set>`：属性值跳变
- 12.1.6 动画同步：begin, end 事件链
- 12.1.7 SMIL 与 CSS 动画的互操作

### 12.2 CSS 动画驱动 SVG
- 12.2.1 Transitions：悬停效果
- 12.2.2 `@keyframes` + `animation`
- 12.2.3 可动画的 SVG 属性列表
- 12.2.4 `stroke-dasharray` + `stroke-dashoffset` 画线动画（经典！）
- 12.2.5 `transform` 动画注意事项（transform-origin 坑）
- 12.2.6 CSS 自定义属性（变量）动画（Houdini）

### 12.3 JavaScript 动画
- 12.3.1 直接操作 DOM 属性
- 12.3.2 `requestAnimationFrame` 驱动动画循环
- 12.3.3 Web Animations API (WAAPI) 在 SVG 中的使用

### 12.4 动画库生态
- 12.4.1 **GreenSock (GSAP)**
  - SVGPlugin
  - DrawSVG Plugin（路径描边动画）
  - MotionPathPlugin（沿路径运动）
  - MorphSVG Plugin（路径变形）
- 12.4.2 **Framer Motion**（React 生态）
- 12.4.3 **Anime.js**：轻量动画库
- 12.4.4 **Lottie**：AE 动画导出 SVG/Canvas 播放
- 12.4.5 **Motion One**：Web Animations API 封装
- 12.4.6 **Vivus**：SVG 描边动画专用库

### 12.5 路径变形动画（Morphing）
- 12.5.1 路径变形的数学基础（点数必须匹配！）
- 12.5.2 手动路径对齐技巧
- 12.5.3 GSAP MorphSVG 自动对齐算法
- 12.5.4 Flubber：路径变形开源库

---

## 第十三部分：SVG 与 JavaScript

### 13.1 SVG DOM API
- 13.1.1 SVG DOM vs. HTML DOM 的差异
- 13.1.2 `document.createElementNS()`：正确创建 SVG 元素
- 13.1.3 SVGElement 接口层次结构
- 13.1.4 获取与设置属性：`getAttribute` / `setAttribute`
- 13.1.5 SVG 专有 DOM 接口概览

### 13.2 几何计算 API
- 13.2.1 `getBBox()`：获取元素包围盒
- 13.2.2 `getCTM()` / `getScreenCTM()`：坐标变换矩阵
- 13.2.3 `getPointAtLength()`：路径上指定长度处的点
- 13.2.4 `getTotalLength()`：路径总长度
- 13.2.5 `isPointInFill()` / `isPointInStroke()`：点击检测
- 13.2.6 `SVGPoint`、`SVGMatrix`、`SVGRect` 接口

### 13.3 坐标转换实战
- 13.3.1 屏幕坐标 → SVG 用户坐标的转换
- 13.3.2 处理缩放、pan 后的坐标映射
- 13.3.3 触摸事件与 SVG 坐标系

### 13.4 SVG 事件处理
- 13.4.1 标准鼠标/触摸/键盘事件
- 13.4.2 `pointer-events` 属性：控制事件捕获区域
  - none / visiblePainted / fill / stroke / all…
- 13.4.3 SVG 元素的焦点管理（tabindex）
- 13.4.4 事件委托在 SVG 中的应用

### 13.5 SVG 数据可视化库
- 13.5.1 **D3.js**：数据驱动文档，SVG 可视化之王
  - 选择器、数据绑定、进入/更新/退出模式
  - 比例尺、坐标轴、形状生成器
- 13.5.2 **Chart.js**（Canvas 为主，SVG 模式）
- 13.5.3 **Recharts**（React + D3 + SVG）
- 13.5.4 **Vega / Vega-Lite**：声明式可视化语法
- 13.5.5 **Observable Plot**：现代数据可视化
- 13.5.6 **Rough.js**：手绘风格 SVG

---

## 第十四部分：SVG 图标系统

### 14.1 图标设计规范
- 14.1.1 viewBox 标准化（24x24, 16x16, 20x20）
- 14.1.2 路径清理与简化原则
- 14.1.3 单色 vs. 多色图标设计策略
- 14.1.4 `currentColor` 技巧实现主题适配

### 14.2 图标库架构
- 14.2.1 SVG Sprite 方案（`<symbol>` + `<use>`）
- 14.2.2 React/Vue 组件化图标
- 14.2.3 外部 SVG 文件 + CSS background
- 14.2.4 Data URI 方案

### 14.3 主流图标库分析
- 14.3.1 Heroicons（Tailwind 官方）
- 14.3.2 Feather Icons
- 14.3.3 Lucide（Feather 的继任者）
- 14.3.4 Phosphor Icons
- 14.3.5 Material Symbols
- 14.3.6 Font Awesome（SVG 模式）
- 14.3.7 Iconify（统一接口聚合 100+ 图标库）

### 14.4 工具链与自动化
- 14.4.1 SVGR：SVG → React 组件
- 14.4.2 svg-sprite-loader（Webpack）
- 14.4.3 Vite SVG 插件生态
- 14.4.4 自动化优化流水线（SVGO + Sprite 生成）

---

## 第十五部分：SVG 优化

### 15.1 手动优化策略
- 15.1.1 减少锚点数量
- 15.1.2 合并路径（减少 DOM 节点）
- 15.1.3 删除冗余分组与属性
- 15.1.4 简化变换（合并为 matrix）
- 15.1.5 使用形状代替路径（能用 `<circle>` 就别用 `<path>`）

### 15.2 SVGO 自动化优化
- 15.2.1 SVGO 的插件体系结构
- 15.2.2 常用插件解析：
  - removeComments, removeMetadata
  - removeEmptyGroups, collapseGroups
  - convertPathData（路径数据精简）
  - convertTransform（变换合并）
  - mergePaths（路径合并）
  - cleanupIds（ID 简化）
- 15.2.3 SVGO 配置文件编写
- 15.2.4 危险插件：什么不该删除

### 15.3 压缩与传输优化
- 15.3.1 SVG 是文本：gzip/brotli 压缩效果极佳
- 15.3.2 HTTP/2 与 SVG 资源加载
- 15.3.3 内联 vs. 外链：HTTP 缓存权衡

### 15.4 渲染性能优化
- 15.4.1 减少滤镜使用（滤镜是性能杀手）
- 15.4.2 `will-change` 提示浏览器 GPU 合成
- 15.4.3 避免过度使用 `<use>` shadow DOM
- 15.4.4 大型 SVG 的虚拟化（只渲染可见部分）
- 15.4.5 用 Canvas 代替 SVG 的时机（>1000 个元素）

---

## 第十六部分：响应式 SVG

### 16.1 SVG 尺寸响应式
- 16.1.1 不设置 width/height，只设 viewBox
- 16.1.2 CSS 控制 SVG 尺寸
- 16.1.3 `preserveAspectRatio` 在响应式中的作用

### 16.2 SVG 内容响应式
- 16.2.1 SVG 内部使用 `<style>` + `@media` 查询
- 16.2.2 根据容器尺寸切换复杂度（详图 vs. 简图）
- 16.2.3 Container Queries 在 SVG 中的应用（实验性）

### 16.3 响应式 SVG 图表
- 16.3.1 动态重新计算布局
- 16.3.2 坐标轴标签自适应
- 16.3.3 移动端手势：Pan、Zoom、Pinch

---

## 第十七部分：交互式 SVG

### 17.1 鼠标交互
- 17.1.1 Hover 效果（CSS :hover）
- 17.1.2 点击事件与状态管理
- 17.1.3 拖拽（Drag & Drop）实现
- 17.1.4 Tooltip 实现方案

### 17.2 Pan & Zoom 实现
- 17.2.1 通过 `viewBox` 实现 Pan/Zoom
- 17.2.2 鼠标滚轮缩放的坐标计算
- 17.2.3 触摸屏 Pinch-to-zoom
- 17.2.4 现成库：panzoom, svg-pan-zoom

### 17.3 SVG 地图
- 17.3.1 SVG 世界地图、国家地图的数据来源
- 17.3.2 GeoJSON → SVG path 转换（D3 地理投影）
- 17.3.3 Choropleth 地图（分级统计图）
- 17.3.4 交互式地图：点击高亮、Tooltip、Zoom

### 17.4 SVG 编辑器实现
- 17.4.1 选择、移动元素
- 17.4.2 缩放控制点（Handle）
- 17.4.3 路径编辑（贝塞尔控制点拖拽）
- 17.4.4 历史记录（Undo/Redo）

---

## 第十八部分：可访问性（Accessibility）

### 18.1 SVG 可访问性基础
- 18.1.1 `<title>`：SVG 标题（相当于 img 的 alt）
- 18.1.2 `<desc>`：SVG 详细描述
- 18.1.3 `role` 属性：`img`, `presentation`, `graphics-document`
- 18.1.4 `aria-label`, `aria-labelledby`, `aria-describedby`

### 18.2 不同嵌入方式的可访问性差异
- 18.2.1 内联 SVG 的可访问性最强
- 18.2.2 `<img>` + SVG 的 alt 文字
- 18.2.3 CSS background SVG：纯装饰，无语义

### 18.3 交互式 SVG 可访问性
- 18.3.1 键盘导航（tabindex, focusable）
- 18.3.2 焦点可见性（focus-visible）
- 18.3.3 动画的可访问性：`prefers-reduced-motion`

### 18.4 屏幕阅读器测试
- 18.4.1 VoiceOver (macOS/iOS)
- 18.4.2 NVDA + Firefox (Windows)
- 18.4.3 常见陷阱与解决方案

---

## 第十九部分：SVG 在框架中的使用

### 19.1 SVG in React
- 19.1.1 JSX 中的 SVG 属性差异（className, strokeWidth vs stroke-width）
- 19.1.2 SVG 组件化模式
- 19.1.3 SVGR：自动转换为 React 组件
- 19.1.4 动态 SVG：props 驱动颜色、尺寸
- 19.1.5 React + D3 的整合策略（React 管 DOM, D3 管计算）

### 19.2 SVG in Vue
- 19.2.1 Vue 模板中直接写 SVG
- 19.2.2 vue-svg-loader
- 19.2.3 动态 SVG 组件

### 19.3 SVG in Angular
- 19.3.1 Angular SVG 绑定注意事项
- 19.3.2 DomSanitizer 安全问题

### 19.4 SVG in Next.js / Nuxt
- 19.4.1 SSR 中的 SVG 渲染
- 19.4.2 Static 导出优化

---

## 第二十部分：SVG 工具生态

### 20.1 设计工具
- 20.1.1 **Inkscape**：开源 SVG 编辑器
- 20.1.2 **Adobe Illustrator**：行业标准，SVG 导出优化
- 20.1.3 **Figma**：现代设计工具，SVG 导出技巧
- 20.1.4 **Affinity Designer**：性价比选择
- 20.1.5 **Sketch**：macOS 设计工具
- 20.1.6 **Vectornator / Linearity Curve**：移动端

### 20.2 在线工具
- 20.2.1 SVG Editor (svgeditoronline.com)
- 20.2.2 SVGOMG（SVGO 在线界面）
- 20.2.3 SVG Path Editor（路径可视化编辑）
- 20.2.4 Boxy SVG（Chrome App）
- 20.2.5 Method Draw
- 20.2.6 Vectorpea（在线 AI 替代）

### 20.3 开发工具
- 20.3.1 浏览器 DevTools 中的 SVG 调试
- 20.3.2 VS Code SVG 扩展
- 20.3.3 SVG Preview 插件
- 20.3.4 Storybook + SVG 组件开发

### 20.4 构建工具插件
- 20.4.1 vite-plugin-svgr
- 20.4.2 @svgr/webpack
- 20.4.3 rollup-plugin-svg
- 20.4.4 grunt-svgmin / gulp-svgmin

---

## 第二十一部分：高级与前沿话题

### 21.1 SVG 中的 `<foreignObject>`
- 21.1.1 在 SVG 中嵌入 HTML（强大又危险）
- 21.1.2 使用场景：多行文本、HTML 表单、MathML
- 21.1.3 跨浏览器兼容问题
- 21.1.4 用 foreignObject 截图（html2canvas 原理）

### 21.2 SVG 与 Web Components
- 21.2.1 自定义 SVG 元素
- 21.2.2 Shadow DOM 与 SVG 样式隔离

### 21.3 SVG 生成艺术（Generative Art）
- 21.3.1 用算法生成 SVG 图形
- 21.3.2 L-System（林登迈尔系统）绘制植物
- 21.3.3 分形与递归 SVG
- 21.3.4 噪声函数（Perlin/Simplex）生成有机形状
- 21.3.5 工具：p5.js, Processing, Paper.js

### 21.4 SVG 与 AI
- 21.4.1 AI 生成 SVG（GPT-4、Claude 直接输出 SVG 代码）
- 21.4.2 Vectorizer：光栅图 → SVG（Potrace, Adobe AI）
- 21.4.3 SVG 作为 AI 训练数据

### 21.5 SVG 2.0 新特性展望
- 21.5.1 SVG 2.0 当前状态（W3C Working Draft）
- 21.5.2 新增几何属性（`d` 属性用于 CSS）
- 21.5.3 Mesh Gradient
- 21.5.4 连接元素（Connector）
- 21.5.5 非矩形文本排布

### 21.6 SVG 的边界挑战
- 21.6.1 SVG 打印（印刷出版流程）
- 21.6.2 SVG 在 Native App 中的使用（iOS/Android）
- 21.6.3 SVG 转 Canvas（为了性能或截图）
- 21.6.4 服务端渲染 SVG（Node.js + Sharp/Resvg）
- 21.6.5 SVG 转 PDF（服务端报告生成）

---

## 第二十二部分：安全性

### 22.1 SVG 安全威胁
- 22.1.1 SVG XSS（内联 `<script>`、事件处理器）
- 22.1.2 `<foreignObject>` 的安全风险
- 22.1.3 SVG 中的外部资源加载（SSRF 风险）
- 22.1.4 CSS 注入通过 SVG

### 22.2 SVG 消毒（Sanitization）
- 22.2.1 DOMPurify 对 SVG 的支持
- 22.2.2 服务端 SVG 消毒
- 22.2.3 白名单策略：允许哪些元素和属性
- 22.2.4 Content Security Policy (CSP) 与 SVG

### 22.3 安全使用 SVG 的最佳实践
- 22.3.1 用户上传 SVG 的处理流程
- 22.3.2 `<img>` 嵌入隔离脚本执行
- 22.3.3 Sandboxed iframe 显示不受信任 SVG

---

## 第二十三部分：实战项目案例

### 23.1 案例一：交互式数据大屏
- SVG 折线图、柱状图、饼图
- 实时数据更新动画
- 响应式布局

### 23.2 案例二：SVG 图标系统搭建
- 设计规范制定
- 构建流水线
- React 组件集成

### 23.3 案例三：可视化地图
- 中国省份地图 SVG
- 数据绑定与颜色映射
- 交互式钻取（Drill-down）

### 23.4 案例四：SVG 动画 Logo
- SMIL + CSS 混合动画
- 路径描边动画
- 路径变形动画

### 23.5 案例五：SVG 画板编辑器
- 基础绘图工具
- 元素选择与变换
- 导出为文件

---

## 附录

### 附录 A：SVG 属性速查表
- 几何属性、外观属性、变换属性、动画属性

### 附录 B：浏览器兼容性表
- 各特性在主流浏览器的支持情况

### 附录 C：SVG 学习资源
- 官方规范、书籍、教程、社区

### 附录 D：SVG 代码片段库
- 常用形状、效果的即用代码

### 附录 E：术语表
- 中英文对照

---

> **章节统计**：23 大章 + 5 附录，约 **180+ 个小节**，覆盖从入门到前沿的 SVG 全景知识图谱。
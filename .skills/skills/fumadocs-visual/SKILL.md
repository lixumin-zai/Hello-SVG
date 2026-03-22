---
name: fumadocs-visual
description: "编写基于 Fumadocs 框架的知识点可视化交互文档（MDX）。当用户想要为某个知识点或工具创建可视化文档、交互式教学页面、带动画的技术文档时，必须使用此 skill。触发词包括：fumadocs、可视化文档、知识点可视化、交互式文档、技术知识文档、工具介绍文档、带动画的文档、可视化组件、MDX 可视化等。即使用户只说\"帮我写个关于 X 的文档\"或\"介绍一下 X\"并期待可视化效果，也应使用此 skill。重点是通过可视化组件（动画、交互图表、状态演示器）加深读者对知识点的理解，而不是出题考试。文档结构为多 MDX 文件 + 独立组件文件（src/components/docs/）。"
---

# Fumadocs 知识点可视化文档 Skill

本 skill 指导 Claude 使用 **Fumadocs** 框架创建以**可视化为核心**的知识点介绍文档。
文档产出为：**多个 MDX 页面** ＋ **独立 React 组件文件**（存放在 `src/components/docs/<topic>/`）。

---

## 核心理念

> **"理解 > 记忆"**：好的可视化文档让读者在交互中自然理解，而不是读完后做题验证。

三类核心组件：
1. **动画演示组件** —— 用动画展示过程（算法步骤、数据流向、状态变化）
2. **交互探索组件** —— 让读者调节参数、观察变化（滑块、开关、输入框）
3. **对比展示组件** —— 并排/切换展示不同方案（Before/After、A/B 对比）

组件**不是练习题**，而是让读者"把手放上去感受"的可视化工具。

---

## 完整创作流程

### Step 1：查阅官方文档，校验内容

在写任何内容之前，先通过 **web_search** 查阅目标知识点或工具的官方文档：

```
搜索：<工具名> official documentation site:docs.<xxx>.com
搜索：<工具名> <核心概念> how it works
```

**必须校验的内容**：
- 核心概念定义是否准确
- API / 配置项名称是否正确（最容易出错）
- 版本兼容性与最新特性
- 官方给出的最佳实践

> ⚠️ 不要凭记忆写技术细节，用 `web_fetch` 读官方文档页面原文，确认后再写进文档。

---

### Step 2：分析知识点，规划可视化点

拿到知识点或工具名称后，先思考：

- **核心概念是什么？** 哪些是抽象的、容易误解的？
- **有哪些状态变化？** 比如算法的每一步、协议的握手过程
- **有哪些可调参数？** 读者改变参数后能看到什么不同效果
- **有哪些容易混淆的对比？** 需要并排展示的两种方案

**经验法则**：每个主要章节至少配一个可视化组件，优先级：
1. 交互探索组件（最有价值，用户能动手）
2. 动画演示组件（过程类知识）
3. 静态图示组件（结构类知识）

---

### Step 3：制定文档大纲（多文件结构）

文档**必须**按大纲拆分为多个 MDX 文件，存放在同一文件夹下。

**标准大纲模板**：

```
content/docs/<topic>/
├── index.mdx          ← 概览：是什么 / 核心价值 / 适用场景
├── core-concepts.mdx  ← 核心概念：原理、架构、关键术语
├── how-it-works.mdx   ← 工作原理：流程、状态机、数据流
├── api-reference.mdx  ← API / 配置项（工具类文档必须有）
└── best-practices.mdx ← 最佳实践与常见陷阱
```

根据知识点性质灵活调整（算法类可能有 `complexity.mdx`，协议类可能有 `lifecycle.mdx`）。

**组件文件夹与大纲对应**：

```
src/components/docs/<topic>/
├── index/             ← index.mdx 用到的组件
│   ├── OverviewAnimation.tsx
│   └── FeatureCards.tsx
├── core-concepts/     ← core-concepts.mdx 用到的组件
│   ├── ConceptDiagram.tsx
│   └── TermExplorer.tsx
├── how-it-works/      ← how-it-works.mdx 用到的组件
│   ├── FlowSimulator.tsx
│   └── StateVisualizer.tsx
└── shared/            ← 多页面共用的组件
    └── AnimatedArrow.tsx
```

---

### Step 4：逐文件创建（MDX ＋ 组件）

每次处理一个页面，按以下顺序：

1. **先创建组件文件**（`src/components/docs/<topic>/<page>/ComponentName.tsx`）
2. **再创建 MDX 文件**，在 MDX 中 import 组件

**在 MDX 中 import 组件**：

```mdx
import { FlowSimulator } from '@/components/docs/redis/how-it-works/FlowSimulator';
import { StateVisualizer } from '@/components/docs/redis/how-it-works/StateVisualizer';
```

> 不要在 MDX 里内联 `export function`，所有组件独立成 `.tsx` 文件。

---

### Step 5：每个页面的内容结构

```
1. Frontmatter（title / description / icon 可选）
2. 概览卡片（用 Cards 展示本页核心要点，≤4 条）
3. 核心章节（每章：文字引入 → 可视化组件 → 小结）
4. 小结 / 延伸阅读（Callout 或 Cards 链接到相邻页面）
```

---

### Step 6：完成检查

- [ ] 每个 MDX 文件的 frontmatter 完整（title、description 必填）
- [ ] 每个主章节都有至少一个可视化组件
- [ ] 组件文件放在正确路径（`src/components/docs/<topic>/<page>/`）
- [ ] MDX 中的 import 路径正确（使用 `@/` alias）
- [ ] 所有技术细节已通过官方文档校验
- [ ] 组件内有引导文字（告诉读者怎么互动）
- [ ] 组件使用 Fumadocs CSS 变量，支持暗色模式

---

## 组件文件规范

### 文件结构

```tsx
'use client';

import { useState } from 'react';

// Props 类型（如有）
interface FlowSimulatorProps {
  initialStep?: number;
}

export function FlowSimulator({ initialStep = 0 }: FlowSimulatorProps) {
  const [step, setStep] = useState(initialStep);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      {/* 引导文字 */}
      <p className="text-sm text-muted-foreground mb-4">
        ▶ 点击「下一步」逐步观察数据流向
      </p>
      {/* 组件主体 */}
      ...
    </div>
  );
}
```

**必须的文件头**：`'use client';`（因为有交互，必须是 Client Component）

---

## MDX 文件规范

```mdx
---
title: '工作原理'
description: '深入了解 Redis 的单线程事件循环模型'
icon: 'Cpu'
---

import { Callout } from 'fumadocs-ui/components/callout';
import { Cards, Card } from 'fumadocs-ui/components/card';
import { FlowSimulator } from '@/components/docs/redis/how-it-works/FlowSimulator';
import { StateVisualizer } from '@/components/docs/redis/how-it-works/StateVisualizer';

## 事件循环模型

Redis 采用**单线程 + I/O 多路复用**的设计，每秒可处理数十万次请求。

<Callout type="info" title="为什么单线程反而快？">
  避免了锁竞争和上下文切换开销，CPU 缓存命中率更高。
</Callout>

试着模拟多个并发请求的处理过程 👇

<FlowSimulator />

...
```

---

## 可视化组件设计指南

详细组件模式见 `references/component-patterns.md`，包含：
- 步进演示器（Step-through）
- 参数调节器（Playground）
- 状态机可视化（State Machine）
- 对比滑块（Before/After Slider）
- 流程动画（Flow Animation）
- 数据结构可视化（Data Structure）
- 时序图（Timeline）
- 网络拓扑图（Network Graph）

## Fumadocs 内置组件参考

详见 `references/fumadocs-components.md`，包含所有内置组件的导入路径和用法。

---

## meta.json —— 多文件文档导航配置

每个文档文件夹需要一个 `meta.json`，控制侧边栏顺序和标题：

```json
{
  "title": "Redis 深度解析",
  "pages": [
    "index",
    "core-concepts",
    "how-it-works",
    "api-reference",
    "best-practices"
  ]
}
```

放在文档文件夹根目录：`content/docs/<topic>/meta.json`

---

## 官方文档参考链接

- Fumadocs 官网：https://fumadocs.vercel.app/
- Fumadocs UI 组件：https://fumadocs.vercel.app/docs/ui/components
- Fumadocs MDX：https://fumadocs.vercel.app/docs/mdx
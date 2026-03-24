---
name: fumadocs-mdx-enricher
description: 升级和优化现有的 Fumadocs MDX 文档，将纯文本变成可交互的可视化组件。当用户说"优化文档"、"丰富内容"、"让文档更好看"、"用组件替换文字"、"增加交互"、"文档太枯燥"、"加动画"、"改进现有文档"，或者提供了一个已有的 .mdx 文件路径并希望改善时，必须使用此 skill。与 fumadocs-visual（从零创建文档）不同，本 skill 专门处理**已有内容的升级**：识别可视化机会 → 创建 React 组件 → 重写 MDX，让静态文本变成对比卡片、交互演示器、动画步进器等。即使用户只说"帮我把这段文字做成好看的组件"也应触发此 skill。
---

# Fumadocs MDX 文档升级 Skill（Enricher）

> **本 skill 的定位**：处理**已有文档**的视觉升级。  
> 如需**从零创建**文档，请改用 `fumadocs-visual` skill。

---

## 工作流：四步完成升级

### Step 1：读取并诊断现有文档

读取目标 `.mdx` 文件，按以下框架逐段分析，标记可视化机会：

| 原始内容形式 | 推荐组件替换方案 |
|---|---|
| A vs B 的比较列表 | 对比卡片 / Tab 切换器 |
| 步骤 1→2→3 的流程描述 | 步进动画演示器 |
| 多个特性/优点的罗列 | Feature Grid（悬停卡片） |
| 参数说明（可调节的值）| 参数模拟器（滑块） |
| 代码块 + 对应效果说明 | 代码与结果联动组件 |
| ⚠️ 警告 / 💡 提示 / 📝 注意 | Fumadocs `<Callout>` |
| 相关文章 / 延伸阅读 | Fumadocs `<Cards>` |

诊断后，列出改造计划再动手，例如：
```
诊断结果：
- 第2节"优缺点对比"→ 替换为 <ProConCards />
- 第3节"工作流程"（5个步骤）→ 替换为 <StepAnimator />
- 第4节 3个警告提示 → 替换为 <Callout type="warn">
```

---

### Step 2：创建独立 React 组件

每个可视化点对应一个独立 `.tsx` 文件，路径：
```
src/components/docs/<topic>/<ComponentName>.tsx
```

**⚠️ 组件必须遵守以下规范（违反则组件无法工作）：**
- 文件首行必须是 `'use client';`
- 所有颜色使用 Tailwind / Fumadocs CSS 变量（支持暗色模式）
- 容器统一：`className="rounded-xl border border-border bg-card p-6 my-6"`
- 组件顶部必须有一行引导文字，告知用户如何互动

**四种最常用的组件骨架，直接复用：**

#### 骨架 A：对比卡片（ProCon / A vs B）
```tsx
'use client';
import { useState } from 'react';

export function ComparisonCards() {
  const [active, setActive] = useState<'a' | 'b'>('a');
  const items = {
    a: { label: '方案 A', color: 'blue', points: ['优点1', '优点2'] },
    b: { label: '方案 B', color: 'green', points: ['优点1', '优点2'] },
  };
  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">▶ 点击标签切换方案对比</p>
      <div className="flex gap-2 mb-4">
        {(['a', 'b'] as const).map(k => (
          <button key={k} onClick={() => setActive(k)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${active === k ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {items[k].label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {items[active].points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 text-primary">✓</span>{p}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 骨架 B：步进动画演示器
```tsx
'use client';
import { useState } from 'react';

const STEPS = [
  { title: '步骤一', desc: '...', highlight: '...' },
  { title: '步骤二', desc: '...', highlight: '...' },
];

export function StepAnimator() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">▶ 点击「下一步」逐步观察流程</p>
      {/* 进度指示器 */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500
            ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
      {/* 内容区 */}
      <div className="min-h-[80px] transition-all duration-300">
        <p className="font-semibold mb-1">{s.title}</p>
        <p className="text-sm text-muted-foreground">{s.desc}</p>
      </div>
      {/* 控制按钮 */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1 text-sm rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 transition-all">
          ← 上一步
        </button>
        <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          className="px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all">
          下一步 →
        </button>
      </div>
    </div>
  );
}
```

#### 骨架 C：Feature Grid（特性网格）
```tsx
'use client';

const FEATURES = [
  { icon: '⚡', title: '特性一', desc: '描述...' },
  { icon: '🔒', title: '特性二', desc: '描述...' },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {FEATURES.map(f => (
        <div key={f.title}
          className="rounded-xl border border-border bg-card p-5
            hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default">
          <div className="text-2xl mb-3">{f.icon}</div>
          <p className="font-semibold mb-1">{f.title}</p>
          <p className="text-sm text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
```

#### 骨架 D：参数模拟器（Playground）
```tsx
'use client';
import { useState } from 'react';

export function ParamPlayground() {
  const [value, setValue] = useState(50);
  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <p className="text-sm text-muted-foreground mb-4">▶ 拖动滑块，观察效果变化</p>
      <div className="flex items-center gap-4 mb-6">
        <input type="range" min={0} max={100} value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="flex-1 accent-primary" />
        <span className="text-sm font-mono w-10 text-center">{value}</span>
      </div>
      {/* 根据 value 渲染可视化结果 */}
      <div className="h-20 rounded-lg bg-primary/10 transition-all duration-300"
        style={{ opacity: value / 100 }}>
        <p className="text-center text-sm text-muted-foreground pt-8">效果预览</p>
      </div>
    </div>
  );
}
```

---

### Step 3：重写 MDX 文件

**MDX 文件头部标准 import 块：**
```mdx
import { Callout } from 'fumadocs-ui/components/callout';
import { Cards, Card } from 'fumadocs-ui/components/card';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { ComparisonCards } from '@/components/docs/<topic>/ComparisonCards';
import { StepAnimator } from '@/components/docs/<topic>/StepAnimator';
```

**重写原则：**
- 把大段"特性罗列"段落替换为 `<FeatureGrid />`
- 把步骤说明替换为 `<StepAnimator />`
- 把警告/提示用 `<Callout type="info|warn|tip">` 包裹
- 文章末尾加 `<Cards>` 引导延伸阅读
- 不要只做 1:1 替换——主动补充背景知识、使用场景、边界条件

**Callout 用法：**
```mdx
<Callout type="warn" title="注意">
  这里写需要特别提醒读者的内容。
</Callout>

<Callout type="info" title="延伸">
  这里可以补充不在主线流程中的背景知识。
</Callout>
```

**Cards 延伸阅读用法（放在页面末尾）：**
```mdx
<Cards>
  <Card title="下一节：配置详解" href="/docs/topic/config" />
  <Card title="相关概念：XXX" href="/docs/topic/related" />
</Cards>
```

---

### Step 4：完成检查

交付前逐项确认：

- [ ] 每个主要章节都有至少一个可视化组件（不是纯文字）
- [ ] 所有组件文件首行是 `'use client';`
- [ ] 组件内有引导文字（告知用户怎么互动）
- [ ] 组件颜色全部使用 Tailwind CSS 变量，无硬编码颜色值
- [ ] MDX import 路径使用 `@/` alias，路径正确
- [ ] ⚠️警告 / 💡提示 / 📝注意 类内容已换成 `<Callout>`
- [ ] 页面末尾有 `<Cards>` 延伸阅读（如有关联页面）
- [ ] 内容不只是替换，还主动**补充了**使用场景或边界知识

---

## 常见错误与修复

| 错误 | 原因 | 修复 |
|---|---|---|
| 组件报 `useState is not a function` | 缺少 `'use client';` | 在文件第一行加上 |
| 暗色模式颜色异常 | 使用了硬编码颜色 `#fff` | 改用 `bg-card`, `text-foreground` |
| MDX import 报路径错误 | 使用了相对路径 `./` | 改用 `@/` alias |
| 组件内联在 MDX 中 | JSX 复杂度超过 MDX 限制 | 抽离为独立 `.tsx` 文件 |

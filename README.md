# 旧日典籍 · Olden Era Guide

《英雄无敌：旧日纪元》(Heroes of Might and Magic: Olden Era) 中文社区攻略站。

技术栈：Astro 5 · Content Collections · 静态生成 · 零 JS 默认。

---

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（http://localhost:4321）
npm run dev

# 构建静态站
npm run build

# 本地预览构建产物
npm run preview
```

要求 Node.js 18.17+ 或 20.3+。

---

## 项目结构

```
src/
├── content/              # 所有"数据"内容，frontmatter 严格校验
│   ├── config.ts         # ★ 内容 schema，改字段就在这里改
│   ├── factions/         # 阵营（六个）
│   ├── units/            # 兵种（目标 80+）
│   ├── heroes/           # 英雄（目标 36 个）
│   ├── spells/           # 法术（目标 90+）
│   └── guides/           # 攻略文章
│
├── pages/                # 路由页（文件即 URL）
│   ├── index.astro       # 首页
│   ├── factions/
│   │   ├── index.astro   # 阵营列表
│   │   └── [slug].astro  # 阵营详情（动态）
│   ├── units/            # 同上结构
│   ├── heroes/
│   ├── spells/
│   ├── guides/
│   └── tier-list/        # Tier 榜（从兵种聚合）
│
├── components/           # 复用组件
│   ├── Header.astro
│   ├── Footer.astro
│   ├── FactionCard.astro
│   ├── UnitCard.astro
│   └── TierRow.astro
│
├── layouts/
│   └── BaseLayout.astro  # 基础页面框架（SEO meta 在这里）
│
└── styles/
    └── global.css        # 全局样式 + 设计 token（CSS 变量）
```

---

## 添加新内容

### 加一个兵种

1. 在 `src/content/units/` 下新建一个 `.md` 文件，文件名是 URL slug
2. 复制 `troglodyte.md` 或 `black-dragon.md` 当模板
3. frontmatter 严格按 `src/content/config.ts` 里的 schema 来填
4. 正文用 Markdown 写攻略
5. `npm run dev`，刷新浏览器即可看到

页面会自动出现在 `/units/your-slug/`，列表页和阵营详情页也会自动收录。

### 加一个英雄

同上，在 `src/content/heroes/` 下新建文件，参考 `shakti.md`。

### 加一篇攻略

`src/content/guides/` 下新建 `.md`，参考 `h3-veteran.md`。

**草稿模式**：frontmatter 加 `draft: true`，本地能看到，构建时会跳过不上线。写完改成 `false`。

**精选**：`featured: true` 会在攻略列表页的"精选"区显示。

### 加一个阵营 / 法术

参考 `src/content/factions/dungeon.md` 和 `spells/magic-arrow.md`。

---

## 数据 schema 在哪改

所有内容字段都在 `src/content/config.ts`。新增 / 修改字段都改这一个文件，schema 改完后旧文件如果不符合会构建报错——这是好事，确保数据一致。

---

## 设计 token

颜色、字体、间距统一在 `src/styles/global.css` 顶部的 `:root` CSS 变量里。要改主色调，改 `--gold` 那几个就行。

---

## 部署到 Cloudflare Pages

1. 把仓库 push 到 GitHub
2. 登录 Cloudflare Pages → Create project → 连接 GitHub
3. 选这个仓库
4. 构建配置：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: 20
5. 部署完后绑定域名

之后每次 `git push` 到 main 自动部署。

### 部署到 Vercel（备选）

同样选 Astro，一键部署，配置默认。

---

## SEO 待办

构建上线之后：

- [ ] 改 `astro.config.mjs` 里的 `site` 为你的实际域名
- [ ] 改 `src/layouts/BaseLayout.astro` 里的 og:image 默认值
- [ ] 把生成的 `sitemap-index.xml` 提交到 Google Search Console / 百度站长
- [ ] favicon.svg 替换成你自己的版本

---

## 内容生产节奏（给自己定的）

- 每天：1-2 个数据页（兵种 / 英雄 / 法术）
- 每周：1 篇长文（流派 / 战役 / 机制）
- 每月：Tier List 更新 + 补丁追踪

节奏比爆发重要。

---

## 后续可加的东西（按需）

- [ ] 客户端搜索（用 Pagefind，零后端，build 时自动生成索引）
- [ ] 站内全文搜索框
- [ ] RSS feed
- [ ] 暗黑模式切换（目前是纯暗色站）
- [ ] 评论系统（Giscus / utterances 接 GitHub Discussions）
- [ ] 多语言（中英双语）

---

## 法律 / 声明

游戏内容版权归 Unfrozen Studio、Hooded Horse、Ubisoft。本站为非官方爱好者社区。

代码本身：MIT。

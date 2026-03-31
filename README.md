# Web 安全实验室

[English](./README.en.md)

面向 **浏览器侧 Web 安全** 概念的学习与受控小实验（**教育用途**）。使用 Next.js App Router、MDX 章节与交互实验区，便于个人复习与 GitHub 展示。

## 在线演示

<https://web-security-lab.vercel.app/>

## 技术栈

- Next.js 16（App Router）
- React 19、TypeScript
- Tailwind CSS v4、Biome
- `@next/mdx`、MDX 章节 + React 实验区组件

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

生产构建：

```bash
pnpm build
pnpm start
```

## 章节

| 路径 | 内容 |
|------|------|
| `/learn/same-origin` | 同源与跨域 |
| `/learn/xss` | XSS 与防御思路（受控演示） |
| `/learn/csrf` | CSRF 与同步器令牌（概念演示） |

## 部署（Vercel）

1. 将本目录推送到 GitHub（若仓库根不是 `my-app`，在 Vercel 项目设置 **Root Directory** 为 `my-app`）。
2. 导入仓库并部署；生产地址见上文「在线演示」。

## 安全与合规

- 内容仅供**个人学习与教育演示**，请勿用于未授权测试或攻击任何系统。
- 实验均在**站内/受控**场景说明概念，不引导对真实第三方站点发起攻击。
- 使用本仓库或在线站点即表示你同意遵守当地法律法规与平台规则。

## 许可证

沿用各依赖库的许可证；若你为仓库添加许可证文件，请在此同步说明。

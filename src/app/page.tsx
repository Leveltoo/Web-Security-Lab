import Link from "next/link";

const CHAPTERS = [
  {
    href: "/learn/same-origin",
    title: "同源与跨域",
    blurb: "同源策略、跨域与 CORS 等概念，配合对照演示。",
  },
  {
    href: "/learn/xss",
    title: "XSS 与防御思路",
    blurb: "受控输入下对比文本展示与 HTML 解析，理解防御方向。",
  },
  {
    href: "/learn/csrf",
    title: "CSRF 与同步器令牌",
    blurb: "概念上演示同步器令牌与请求状态，不涉及外站请求。",
  },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Web 安全实验室
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          浏览器侧 Web
          安全概念的学习与受控小实验，兼顾复习与公开展示。内容仅供教育用途，请勿用于未授权测试。
        </p>
      </header>

      <section aria-labelledby="chapters-heading" className="space-y-4">
        <h2
          id="chapters-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          章节
        </h2>
        <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {CHAPTERS.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {c.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {c.blurb}
                </span>
                <span className="mt-4 text-sm font-medium text-zinc-900 underline-offset-4 dark:text-zinc-100">
                  进入章节 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside
        className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
        role="note"
      >
        <p className="font-medium">合规说明</p>
        <p className="mt-1">
          实验均在本地/站内受控环境说明概念，不引导对真实第三方系统的攻击。使用本站内容须遵守法律法规与平台规则。
        </p>
      </aside>
    </main>
  );
}

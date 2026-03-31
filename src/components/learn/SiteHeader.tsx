import Link from "next/link";

const LINKS = [
  { href: "/learn/same-origin", label: "同源与跨域" },
  { href: "/learn/xss", label: "XSS" },
  { href: "/learn/csrf", label: "CSRF" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Web 安全实验室
        </Link>
        <nav aria-label="章节导航" className="flex flex-wrap gap-3 text-sm">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

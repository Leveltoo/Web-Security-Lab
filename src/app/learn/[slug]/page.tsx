import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Csrf from "@/content/learn/csrf.mdx";
import SameOrigin from "@/content/learn/same-origin.mdx";
import Xss from "@/content/learn/xss.mdx";

const SLUGS = ["same-origin", "xss", "csrf"] as const;
type Slug = (typeof SLUGS)[number];

const mdxBySlug: Record<Slug, ComponentType> = {
  "same-origin": SameOrigin,
  xss: Xss,
  csrf: Csrf,
};

const titles: Record<Slug, string> = {
  "same-origin": "同源与跨域",
  xss: "XSS 与防御思路",
  csrf: "CSRF 与同步器令牌",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: Slug }[] {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  return { title: `${titles[slug]} | Web 安全实验室` };
}

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const Content = mdxBySlug[slug];
  return (
    <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-zinc-900 dark:text-zinc-100 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6">
      <Content />
    </article>
  );
}

function isSlug(s: string): s is Slug {
  return (SLUGS as readonly string[]).includes(s);
}

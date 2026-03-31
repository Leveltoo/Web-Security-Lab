"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LabErrorBoundary } from "@/components/learn/LabErrorBoundary";

export function XssLab() {
  const [raw, setRaw] = useState("<em>hello</em>");
  const safeId = useId();
  const parsedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parsedRef.current;
    if (!el) return;
    // 教育演示：受控本地输入，演示将字符串按 HTML 解析的效果（与 dangerouslySetInnerHTML 同类风险）
    el.innerHTML = raw;
  }, [raw]);

  return (
    <LabErrorBoundary title="XSS 实验区出错">
      <section
        aria-labelledby={`${safeId}-title`}
        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h3
          id={`${safeId}-title`}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          教育演示：字符串与 HTML 解析
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          在受控输入中对比「作为文本显示」与「作为 HTML
          解析」的差异；请勿对任何第三方站点尝试类似输入。
        </p>
        <label
          htmlFor={`${safeId}-input`}
          className="mt-3 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          输入内容
        </label>
        <textarea
          id={`${safeId}-input`}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white p-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-zinc-500">
              作为文本（默认安全展示）
            </p>
            <div className="mt-1 rounded-md border border-zinc-200 bg-white p-2 text-sm dark:border-zinc-700 dark:bg-zinc-900">
              {raw}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
              解析为 HTML（仅作演示，生产环境应对用户输入做转义/CSP 等）
            </p>
            <div
              ref={parsedRef}
              className="mt-1 rounded-md border border-amber-200 bg-amber-50 p-2 text-sm dark:border-amber-900 dark:bg-amber-950/40"
            />
          </div>
        </div>
      </section>
    </LabErrorBoundary>
  );
}

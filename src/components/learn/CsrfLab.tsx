"use client";

import { useId, useState } from "react";
import { LabErrorBoundary } from "@/components/learn/LabErrorBoundary";

export function CsrfLab() {
  const id = useId();
  const [withToken, setWithToken] = useState(true);

  return (
    <LabErrorBoundary title="CSRF 实验区出错">
      <section
        aria-labelledby={`${id}-title`}
        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h3
          id={`${id}-title`}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          教育演示：请求是否携带「同步器令牌」
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          本演示不向外站发起请求，仅用本地状态说明「带 Token vs
          不带」在概念上的差异；真实站点应配合 Cookie 策略、SameSite 等。
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            onClick={() => setWithToken((v) => !v)}
            aria-pressed={withToken}
          >
            切换为「{withToken ? "无 Token" : "有 Token"}」状态
          </button>
          <output
            className="font-mono text-sm text-zinc-800 dark:text-zinc-200"
            aria-live="polite"
          >
            {withToken ? "csrfToken=demo" : "（无 csrfToken）"}
          </output>
        </div>
      </section>
    </LabErrorBoundary>
  );
}

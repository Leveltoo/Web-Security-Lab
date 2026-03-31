"use client";

import { useEffect, useState } from "react";
import { LabErrorBoundary } from "@/components/learn/LabErrorBoundary";

export function SameOriginLab() {
  const [origin, setOrigin] = useState("—");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <LabErrorBoundary title="同源实验区出错">
      <section
        aria-labelledby="same-origin-lab-title"
        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h3
          id="same-origin-lab-title"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          教育演示：同源与「跨域」对照
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          以下仅说明概念：当前页面源为{" "}
          <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">
            window.location.origin
          </code>
          ；与「另一源」的通信受浏览器同源策略约束（详见正文）。
        </p>
        <dl className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex flex-wrap gap-2">
            <dt className="font-medium">当前源</dt>
            <dd>
              <output className="rounded bg-white px-2 py-0.5 font-mono text-xs dark:bg-zinc-900">
                {origin}
              </output>
            </dd>
          </div>
        </dl>
      </section>
    </LabErrorBoundary>
  );
}

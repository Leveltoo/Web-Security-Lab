"use client";

import { useId, useMemo, useState } from "react";
import { LabErrorBoundary } from "@/components/learn/LabErrorBoundary";

type SameSiteValue = "strict" | "lax" | "none";
type ScenarioId =
  | "same-site-top"
  | "cross-site-subresource"
  | "cross-site-top-get";

const SCENARIOS: { id: ScenarioId; label: string; hint: string }[] = [
  {
    id: "same-site-top",
    label: "同站顶层导航",
    hint: "用户在同一站点内点击链接导致的顶层导航（概念）。",
  },
  {
    id: "cross-site-subresource",
    label: "跨站子资源请求",
    hint: "从其他站点页面发起的图片/脚本等子资源请求（概念）。",
  },
  {
    id: "cross-site-top-get",
    label: "跨站顶层 GET（如点击外链）",
    hint: "从其他站点跳转到你站点时的顶层 GET（概念上对应 Lax 的典型场景）。",
  },
];

type CookieModelResult = {
  sent: boolean;
  jsReadable: boolean;
  invalid: boolean;
  note?: string;
};

function computeCookieModel(
  scenario: ScenarioId,
  sameSite: SameSiteValue,
  secure: boolean,
  httpOnly: boolean,
): CookieModelResult {
  if (sameSite === "none" && !secure) {
    return {
      sent: false,
      jsReadable: !httpOnly,
      invalid: true,
      note: "规范要求：SameSite=None 时必须同时设置 Secure。",
    };
  }

  let sent = false;
  if (scenario === "same-site-top") {
    sent = true;
  } else if (scenario === "cross-site-subresource") {
    if (sameSite === "strict" || sameSite === "lax") sent = false;
    if (sameSite === "none" && secure) sent = true;
  } else if (scenario === "cross-site-top-get") {
    if (sameSite === "strict") sent = false;
    if (sameSite === "lax") sent = true;
    if (sameSite === "none" && secure) sent = true;
  }

  return {
    sent,
    jsReadable: !httpOnly,
    invalid: false,
  };
}

export function CookieSameSiteLab() {
  const baseId = useId();
  const [scenario, setScenario] = useState<ScenarioId>("same-site-top");
  const [sameSite, setSameSite] = useState<SameSiteValue>("lax");
  const [secure, setSecure] = useState(true);
  const [httpOnly, setHttpOnly] = useState(false);

  const result = useMemo(
    () => computeCookieModel(scenario, sameSite, secure, httpOnly),
    [scenario, sameSite, secure, httpOnly],
  );

  return (
    <LabErrorBoundary title="Cookie / SameSite 实验区出错">
      <section
        aria-labelledby={`${baseId}-title`}
        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h3
          id={`${baseId}-title`}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          教育演示：Cookie 属性 × 请求场景（简化模型）
        </h3>
        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          以下为<strong>教学用简化模型</strong>，用于理解 SameSite / Secure /
          HttpOnly 与「是否携带 Cookie」「JS
          是否可读」的对应关系；真实浏览器版本与边界条件以规范与实测为准，不对外站发起真实请求。
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label
                htmlFor={`${baseId}-scenario`}
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                场景
              </label>
              <select
                id={`${baseId}-scenario`}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                value={scenario}
                onChange={(e) => setScenario(e.target.value as ScenarioId)}
              >
                {SCENARIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {SCENARIOS.find((s) => s.id === scenario)?.hint}
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                SameSite
              </span>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                {(
                  [
                    ["strict", "Strict"],
                    ["lax", "Lax"],
                    ["none", "None"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={`${baseId}-ss`}
                      checked={sameSite === value}
                      onChange={() => setSameSite(value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={secure}
                onChange={(e) => setSecure(e.target.checked)}
              />
              Secure（仅通过 HTTPS 发送）
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={httpOnly}
                onChange={(e) => setHttpOnly(e.target.checked)}
              />
              HttpOnly（禁止 JavaScript 读取）
            </label>
          </div>

          <div
            className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            aria-live="polite"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              模型结论
            </p>
            {result.invalid ? (
              <p className="mt-2 text-red-700 dark:text-red-300">
                {result.note}
              </p>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                <li>
                  是否预期携带 Cookie（模型）：
                  <strong className="ml-1">{result.sent ? "是" : "否"}</strong>
                </li>
                <li>
                  <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
                    document.cookie
                  </code>{" "}
                  是否可读：
                  <strong className="ml-1">
                    {result.jsReadable ? "可读" : "不可读（HttpOnly）"}
                  </strong>
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </LabErrorBoundary>
  );
}

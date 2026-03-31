"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { LabErrorBoundary } from "@/components/learn/LabErrorBoundary";

const CSP_MAX_LEN = 512;

const PRESETS: { id: string; label: string; value: string }[] = [
  {
    id: "self-only",
    label: "仅允许同源（默认）",
    value: "default-src 'self'",
  },
  {
    id: "unsafe-inline",
    label: "允许内联脚本（演示用）",
    value: "default-src 'self' 'unsafe-inline'",
  },
  {
    id: "no-script",
    label: "禁止脚本",
    value: "script-src 'none'",
  },
];

type InlineStatus = "idle" | "allowed" | "blocked" | "error";

function sanitizeCspInput(raw: string): string {
  return raw.replace(/[<>]/g, "").replace(/"/g, "'").slice(0, CSP_MAX_LEN);
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;");
}

function buildSandboxHtml(csp: string): string {
  const safe = sanitizeCspInput(csp);
  const attr = escapeHtmlAttribute(safe);
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${attr}"></head><body>
<script>
try {
  window.parent.postMessage({ source: "csp-lab", kind: "inline", ok: true }, "*");
} catch (e) {
  window.parent.postMessage({ source: "csp-lab", kind: "inline", ok: false }, "*");
}
</script>
</body></html>`;
}

export function CspLab() {
  const baseId = useId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [policy, setPolicy] = useState(PRESETS[0].value);
  const [inlineStatus, setInlineStatus] = useState<InlineStatus>("idle");
  const [iframeKey, setIframeKey] = useState(0);

  const applyPreset = useCallback((id: string) => {
    const p = PRESETS.find((x) => x.id === id);
    if (p) {
      setPreset(id);
      setPolicy(p.value);
    }
  }, []);

  const reloadIframe = useCallback(() => {
    setInlineStatus("idle");
    setIframeKey((k) => k + 1);
  }, []);

  const srcDoc = useMemo(() => buildSandboxHtml(policy), [policy]);

  useEffect(() => {
    const iframe = iframeRef.current;
    const onMessage = (ev: MessageEvent) => {
      const data = ev.data;
      if (!data || data.source !== "csp-lab" || data.kind !== "inline") return;
      if (iframe?.contentWindow && ev.source !== iframe.contentWindow) {
        return;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setInlineStatus(data.ok ? "allowed" : "error");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    void iframeKey;
    void policy;
    setInlineStatus("idle");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setInlineStatus((s) => (s === "idle" ? "blocked" : s));
      timeoutRef.current = null;
    }, 500);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [iframeKey, policy]);

  return (
    <LabErrorBoundary title="CSP 实验区出错">
      <section
        aria-labelledby={`${baseId}-title`}
        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h3
          id={`${baseId}-title`}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          教育演示：CSP 与内联脚本（iframe 隔离文档）
        </h3>
        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          子页面使用{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
            meta
          </code>{" "}
          注入
          CSP。若策略禁止内联脚本，则下方「内联脚本」检测不会收到成功信号（超时视为拦截）。CSP
          是深度防御，不能替代输入转义。
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              预设策略
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`rounded-md border px-2 py-1 text-xs ${
                    preset === p.id
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => applyPreset(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor={`${baseId}-csp`}
              className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              策略字符串（{CSP_MAX_LEN} 字符内，已做基础过滤）
            </label>
            <textarea
              id={`${baseId}-csp`}
              value={policy}
              onChange={(e) => setPolicy(sanitizeCspInput(e.target.value))}
              rows={2}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white p-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
              spellCheck={false}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
                onClick={reloadIframe}
              >
                应用并刷新子页面
              </button>
              <button
                type="button"
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
                onClick={() => applyPreset(PRESETS[0].id)}
              >
                重置为默认预设
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                隔离 iframe（仅演示）
              </p>
              <iframe
                key={iframeKey}
                ref={iframeRef}
                title="CSP 沙箱"
                className="mt-1 h-28 w-full rounded-md border border-zinc-300 bg-white dark:border-zinc-700"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={srcDoc}
              />
            </div>
            <div
              className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              aria-live="polite"
            >
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                内联脚本检测结果
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                {inlineStatus === "idle" && "等待子页面…"}
                {inlineStatus === "allowed" &&
                  "内联脚本已执行（策略允许或包含 unsafe-inline 等）。"}
                {inlineStatus === "blocked" &&
                  "未收到执行信号：可能被 CSP 拦截（或浏览器策略差异）。"}
                {inlineStatus === "error" && "子页面报告错误。"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </LabErrorBoundary>
  );
}

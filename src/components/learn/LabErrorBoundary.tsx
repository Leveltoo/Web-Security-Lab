"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; title?: string };

type State = { error: Error | null };

export class LabErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[LabErrorBoundary]", error, info.componentStack);
  }

  override render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        >
          <p className="font-medium">{this.props.title ?? "实验区加载失败"}</p>
          <p className="mt-1">{this.state.error.message}</p>
          <button
            type="button"
            className="mt-3 rounded-md border border-red-300 px-2 py-1 text-xs hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900/50"
            onClick={() => this.setState({ error: null })}
          >
            重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

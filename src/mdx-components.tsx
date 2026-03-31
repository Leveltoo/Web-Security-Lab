import type { MDXComponents } from "mdx/types";
import { CookieSameSiteLab } from "@/components/learn/CookieSameSiteLab";
import { CspLab } from "@/components/learn/CspLab";
import { CsrfLab } from "@/components/learn/CsrfLab";
import { SameOriginLab } from "@/components/learn/SameOriginLab";
import { XssLab } from "@/components/learn/XssLab";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    SameOriginLab,
    XssLab,
    CsrfLab,
    CookieSameSiteLab,
    CspLab,
  };
}

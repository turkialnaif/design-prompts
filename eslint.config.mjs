import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // standalone Node scripts that build the printed brand kit, not site code
    "brand-kit/**",
  ]),
  {
    // the printed profile is rendered by headless Chrome from plain <img>; next/image adds nothing there
    files: ["components/print/**"],
    rules: { "@next/next/no-img-element": "off" },
  },
]);

export default eslintConfig;

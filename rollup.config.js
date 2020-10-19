import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./src/index.ts", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.browser,
      format: "iife",
      name: "Regaliz",
      globals: {},
    },
    {
      file: "dist/regaliz.iife.min.js",
      format: "iife",
      name: "Regaliz",
      globals: {},
      plugins: [terser()],
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
    // terser(), // minifies generated bundles
  ],
};

import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

export default {
  input: "src/lib/index.tsx",
  output: [
    {
      dir: "dist",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    image(),
    external(),
    postcss({ modules: true }),
    url(),
    svgr(),
    resolve(),
    typescript(),
    commonjs(),
  ],
};

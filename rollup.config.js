import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss-modules";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy-assets";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import bundleScss from "rollup-plugin-bundle-scss";

import pkg from "./package.json";

export default {
  input: "src/lib/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    // postcss({ modules: true }),
    bundleScss(),
    // copy({
    //   assets: ["src/lib/scss/assets"]
    // }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs()
  ]
};

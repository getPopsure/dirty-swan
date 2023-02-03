import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const postcssCustomProperties = require('postcss-custom-properties');

/**
 *
 * We need to decide how to isolate cjs and esm builds
 * For now this totally separates the two builds by defining
 * explicit input/output properties.
 *
 * Need to look into which plugins are needed for each build.
 *
 */
const plugins = [
  external(),
  postcss({
    modules: true,
    plugins: [postcssCustomProperties({ preserve: true })],
  }),
  url(),
  resolve(),
  commonjs(),
];

export default [
  {
    input: 'src/lib/index.tsx',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [...plugins, typescript({ outDir: 'dist/cjs' })],
  },
  {
    input: Object.fromEntries(
      glob
        // we need to look into why adding ts breaks the build
        .sync('src/lib/**/*(*.tsx)')
        .map((file) => [
          path.relative(
            'src/lib',
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [...plugins, typescript({ outDir: 'dist/esm' })],
  },
];

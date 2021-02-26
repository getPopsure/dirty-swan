import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

export default {
  input: 'src/lib/index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({ modules: true }),
    url(),
    resolve(),
    typescript(),
    commonjs(),
  ],
};

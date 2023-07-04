import fs from 'fs/promises';

import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

// https://rollupjs.org/guide/en/#configuration-files
export default async(commandLineArgs)=>{

  await fs.rm('./dist', { recursive: true, force: true });
  
  return [
    {
      input: "src/index.ts",
      plugins: [
        typescript( { tsconfig: './tsconfig.json' })
      ],
      output: [
        // index.esm.js
        // for rollup/webpack to compile together with other
        // or use in <script type="module">
        {
          file: "dist/index.esm.js",
          format: "es",
          exports: "named",
          sourcemap: true,
          // plugins: [
          //   { 
          //     // index.esm.js
          //     // for rollup/webpack to compile together with other, target browser
          //     // same as mjs, webpack 4 don't know mjs, so current we still set esm.js as package.json->browser

          //     // https://rollupjs.org/guide/en/#writebundle
          //     async writeBundle(options, bundle){
          //       await fs.copyFile('./dist/index.mjs', './dist/index.esm.js')
          //     }
          //   },
          // ],
        },
        // index.browser.esm.js
        // for rollup/webpack to compile together with other
        // or use in <script type="module">
        {
          file: "dist/index.browser.esm.js",
          format: "es",
          exports: "named",
          sourcemap: true,
          plugins: [
            replace({
              preventAssignment: true,
              values: {
                'global': 'undefined',
              }
            }),
            terser({ ecma: 6 }),
          ],
        },
        // index.node.esm.js
        // for rollup/webpack to compile together with other
        // or use in <script type="module">
        {
          file: "dist/index.node.esm.js",
          format: "es",
          exports: "named",
          sourcemap: true,
          plugins: [
            replace({
              preventAssignment: false,
              delimiters: ['', ''],
              values: {
                '!!(typeof global=="object"&&global.process&&global.process.release&&global.process.release.name&&typeof HTMLCanvasElement=="undefined")': `false`,
                '!!(typeof global == "object" && global.process && global.process.release && global.process.release.name && typeof HTMLCanvasElement == "undefined")': `false`,
              }
            }),
            terser({ ecma: 6 }),
          ],
        },
      ],
    },
  ]
};
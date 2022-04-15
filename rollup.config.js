import typescript from '@rollup/plugin-typescript';
import fs from 'fs/promises';

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
        // index.mjs
        // for rollup/webpack to compile together with other
        // or use in <script type="module">
        {
          file: "dist/index.mjs",
          format: "es",
          exports: "named",
          sourcemap: true,
          plugins: [
            { 
              // index.esm.js
              // for rollup/webpack to compile together with other, target browser
              // same as mjs, webpack 4 don't know mjs, so current we still set esm.js as package.json->browser

              // https://rollupjs.org/guide/en/#writebundle
              async writeBundle(options, bundle){
                await fs.copyFile('./dist/index.mjs', './dist/index.esm.js')
              }
            },
          ],
        },
      ],
    },
  ]
};
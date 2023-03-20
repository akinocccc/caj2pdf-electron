import react from '@vitejs/plugin-react';
import electron from 'vite-electron-plugin';
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist-electron/renderer',
      target: 'esnext',
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react(),
      svgr(),
      electron({
        include: ['electron'],
        transformOptions: {
          sourcemap: true,
        },
        plugins: [
          ...(process.env.VSCODE_DEBUG
            ? [
                // Will start Electron via VSCode Debug
                customStart(() =>
                  console.log(
                    /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App'
                  )
                ),
              ]
            : []),
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: false,
      }),
    ],
  };
});

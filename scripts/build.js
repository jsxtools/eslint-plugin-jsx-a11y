// @ts-check

import fs from 'node:fs/promises';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as vite from 'vite';

const libURL = new URL('../lib/', import.meta.url);
const srcURL = new URL('../src/', import.meta.url);

const files = /** @type {string[]} */ ([]);

// eslint-disable-next-line no-restricted-syntax
for (const file of await fs.readdir(srcURL, {
  recursive: true,
  encoding: 'utf-8',
  withFileTypes: true,
})) {
  // eslint-disable-next-line no-continue
  if (!file.isFile()) continue;

  const fileURL = new URL(`${file.path.replace(/\/$/, '')}/${file.name}`, srcURL);

  files.push(fileURL.pathname);
}

const defineConfig = (/** @type {Pick<vite.InlineConfig, "outDir" | "entry">} */ { outDir, entry }) => /** @type {vite.InlineConfig} */({
  build: {
    outDir,
    target: 'esnext',
    rollupOptions: {
      external: [
        'aria-query',
        'axe-core',
        'axobject-query',
        'damerau-levenshtein',
        'emoji-regex',
        'es-iterator-helpers',
        'jsx-ast-utils',
        'language-tags',
        'minimatch',
        'safe-regex-test',
      ],
      output: {
        interop: 'esModule',
        strict: false,
      },
    },
    lib: {
      entry,
      formats: ['es', 'cjs'],
      fileName: (format, name) => {
        const ext = format === 'cjs' ? 'cjs' : 'js';
        const fullPath = files.find((file) => file.endsWith(`${name}.ts`));
        const fileName = fullPath ? fullPath.slice(srcURL.pathname.length, -2) + ext : `${name}.${ext}`;

        return fileName;
      },
    },
    assetsInlineLimit: 0,
    minify: false,
    copyPublicDir: false,
    reportCompressedSize: false,
  },
});

await fs.rm(libURL, { recursive: true, force: true });

await vite.build(defineConfig({
  outDir: 'lib/',
  entry: files,
}));

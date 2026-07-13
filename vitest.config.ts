import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  // Mirror the tsconfig path alias (@/* -> ./src/*) so handler tests that pull in
  // `@/lib/*` resolve the same way the app build does. process.cwd() is the repo
  // root when `pnpm test` runs (avoids import.meta, which the tsconfig module
  // target rejects).
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});

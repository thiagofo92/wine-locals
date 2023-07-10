import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
const path = resolve(__dirname)

export default defineConfig({
  test: {
    coverage: {
      functions: 80,
      branches: 80,
      statements: 80,
      lines: 80
    }
  },
  resolve: {
    alias: {
      '@': `${path}/src`
    }
  }
})

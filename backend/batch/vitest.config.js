import { defineConfig } from "vitest/config"

export default defineConfig({
  test: { threads: false, setupFiles: ["test/helper/setup.ts"] }
})

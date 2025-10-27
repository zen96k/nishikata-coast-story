import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"

const filename = fileURLToPath(import.meta.url)
const dirname = import.meta.dirname || path.dirname(filename)

const config = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { languageOptions: { parserOptions: { tsconfigRootDir: dirname } } },
  eslintConfigPrettier
)

export default config

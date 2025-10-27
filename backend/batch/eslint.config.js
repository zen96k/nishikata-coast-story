import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

const config = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { languageOptions: { parserOptions: { tsconfigRootDir: __dirname } } },
  eslintConfigPrettier
)

export default config

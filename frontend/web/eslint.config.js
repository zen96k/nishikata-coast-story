import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

export const config = withNuxt().append(eslintConfigPrettier)

export default config

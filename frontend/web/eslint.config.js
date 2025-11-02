import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt()
  .append(eslintConfigPrettier)
  .append({ ignores: ["**/error.vue"] })

export default config

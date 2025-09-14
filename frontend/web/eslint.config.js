import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

export const config = withNuxt()
  .append(eslintConfigPrettier)
  .override("nuxt/vue/rules", {
    rules: { "vue/static-class-names-order": "warn" }
  })

export default config

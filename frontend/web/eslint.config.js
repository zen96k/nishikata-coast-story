import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt()
  .append(eslintConfigPrettier)
  .append({ ignores: ["**/error.vue"] })
  .append({
    rules: {
      "vue/attributes-order": [
        "error",
        { alphabetical: true, sortLineLength: true }
      ]
    }
  })

export default config

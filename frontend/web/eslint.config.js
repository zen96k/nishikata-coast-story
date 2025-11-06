import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt([
  { ignores: ["**/error.vue"] },
  {
    rules: {
      "vue/attributes-order": [
        "error",
        { alphabetical: true, sortLineLength: true }
      ]
    }
  }
]).append(eslintConfigPrettier)

export default config

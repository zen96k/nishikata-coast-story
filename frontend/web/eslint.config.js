import eslintConfigPrettier from "eslint-config-prettier/flat"
import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt().append(eslintConfigPrettier, {
  languageOptions: { parserOptions: { tsConfigRootDir: __dirname } }
})

export default config

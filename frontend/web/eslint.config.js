import eslintConfigPrettier from "eslint-config-prettier/flat"
import { fileURLToPath } from "url"
import withNuxt from "./.nuxt/eslint.config.mjs"

const filename = fileURLToPath(import.meta.url)
const dirname = import.meta.dirname || path.dirname(filename)

const config = withNuxt().append(eslintConfigPrettier, {
  languageOptions: { parserOptions: { tsConfigRootDir: dirname } }
})

export default config

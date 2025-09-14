// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  modules: ["@nuxt/eslint"]
})

export default config

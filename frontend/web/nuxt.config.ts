// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/ui"]
})

export default config

// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  devtools: { enabled: true },
  app: { head: { title: "西方コーストストーリー", htmlAttrs: { lang: "ja" } } },
  runtimeConfig: { ncsApiBaseUrl: process.env.NUXT_NCS_API_BASE_URL },
  typescript: { typeCheck: "build" },
  css: ["assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@vueuse/nuxt"],
  image: { dir: "assets/image" }
})

export default config

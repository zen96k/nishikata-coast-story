// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  devtools: { enabled: true },
  nitro: { prerender: { autoSubfolderIndex: false } },
  app: { head: { title: "西方コーストストーリー", htmlAttrs: { lang: "ja" } } },
  runtimeConfig: { ncsApiBaseUrl: "" },
  typescript: { typeCheck: "build" },
  css: ["assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "@compodium/nuxt",
    "@vueuse/nuxt"
  ],
  image: { dir: "assets/image" }
})

export default config

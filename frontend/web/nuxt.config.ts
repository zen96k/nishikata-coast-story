// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: { public: { ncsApiBaseUrl: "" } },
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

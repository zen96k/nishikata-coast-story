// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  devtools: { enabled: true },
  app: { head: { title: "西方コーストストーリー", htmlAttrs: { lang: "ja" } } },
  site: {
    url: "https://nishikata-coast-story.vercel.app",
    name: "西方コーストストーリー"
  },
  runtimeConfig: {
    private: { ncsApiBaseUrl: process.env.NUXT_NCS_API_BASE_URL },
    public: { ogpScannerApiBaseUrl: process.env.OGP_SCANNER_API_BASE_URL }
  },
  typescript: { typeCheck: true },
  css: ["assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "nuxt-og-image",
    "@vueuse/nuxt"
  ]
})

export default config

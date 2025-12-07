// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "西方コーストストーリー",
      htmlAttrs: { lang: "ja" },
      meta: [
        { name: "description", content: "技術記事をまとめる学習用アプリ" },
        {
          property: "og:image",
          content: "https://nuxt.com/assets/design-kit/logo-green-white.png"
        }
      ]
    }
  },
  runtimeConfig: {
    private: { ncsApiBaseUrl: process.env.NUXT_NCS_API_BASE_URL },
    public: { ogpScannerApiBaseUrl: process.env.OGP_SCANNER_API_BASE_URL }
  },
  typescript: { typeCheck: true },
  css: ["assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@vueuse/nuxt"]
})

export default config

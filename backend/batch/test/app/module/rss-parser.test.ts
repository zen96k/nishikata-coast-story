import { DateTime as luxon } from "luxon"
import { assert, describe, expect, test } from "vitest"
import RssParser from "../../../app/module/rss-parser.ts"
import QiitaBaseUrl from "../../../constant-variable/qiita.mts"
import ZennBaseUrl from "../../../constant-variable/zenn.mts"

const rssParser = new RssParser()

describe("RssParser", () => {
  describe("parseUrl", () => {
    test.concurrent("Qiita", async () => {
      const url = `${QiitaBaseUrl}/popular-items/feed.atom`
      const { items: items } = await rssParser.parseUrl(url)

      await Promise.all(
        items.map(async (item) => {
          expect(item.title).toBeDefined()
          expect(item.title).not.toBe("")

          expect(item.link).toBeDefined()
          expect(item.link).not.toBe("")
          expect(item.link).toContain(QiitaBaseUrl)

          expect(item.author).toBeDefined()
          expect(item.author).not.toBe("")

          expect(item.pubDate).toBeDefined()
          expect(item.pubDate).not.toBe("")
          assert(luxon.fromISO(item.pubDate!).isValid)

          return void 0
        })
      )
    })

    test.concurrent("Zenn", async () => {
      const url = `${ZennBaseUrl}/feed`
      const { items: items } = await rssParser.parseUrl(url)

      await Promise.all(
        items.map(async (item) => {
          expect(item.title).toBeDefined()
          expect(item.title).not.toBe("")

          expect(item.link).toBeDefined()
          expect(item.link).not.toBe("")
          expect(item.link).toContain(ZennBaseUrl)

          expect(item.author).toBeUndefined()
          expect(item.author).not.toBe("")

          expect(item.creator).toBeDefined()
          expect(item.creator).not.toBe("")

          expect(item.pubDate).toBeDefined()
          expect(item.pubDate).not.toBe("")
          assert(luxon.fromRFC2822(item.pubDate!).isValid)

          return void 0
        })
      )
    })
  })
})

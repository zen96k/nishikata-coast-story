import { DateTime as luxon } from "luxon"
import { assert, describe, expect, expectTypeOf, test } from "vitest"
import { RssParser } from "../../../app/module/RssParser.ts"
import { QiitaBaseUrl } from "../../../constant-variable/qiita.ts"
import { ZennBaseUrl } from "../../../constant-variable/zenn.ts"

const parser = new RssParser()

describe("RssParser", () => {
  describe("parseUrl", () => {
    test.concurrent("Qiita", async () => {
      const url = "https://qiita.com/popular-items/feed.atom"
      const { items: items } = await parser.parseUrl(url)

      await Promise.all(
        items.map((item) => async () => {
          expectTypeOf(item.title).toBeString()
          expect(item.title).not.toBe("")

          expectTypeOf(item.link).toBeString()
          expect(item.link).not.toBe("")
          expect(item.link).toContain(QiitaBaseUrl)

          expectTypeOf(item.author).toBeString()
          expect(item.author).not.toBe("")

          expectTypeOf(item.pubDate).toBeString()
          expect(item.pubDate).not.toBe("")
          assert(luxon.fromISO(item.pubDate).isValid)
        })
      )
    })

    test.concurrent("Zenn", async () => {
      const url = "https://zenn.dev/feed"
      const { items: items } = await parser.parseUrl(url)

      await Promise.all(
        items.map((item) => async () => {
          expectTypeOf(item.title).toBeString()
          expect(item.title).not.toBe("")

          expectTypeOf(item.link).toBeString()
          expect(item.link).not.toBe("")
          expect(item.link).toContain(ZennBaseUrl)

          expect(item.author).toBeUndefined()

          expectTypeOf(item.creator).toBeString()
          expect(item.creator).not.toBe("")

          expectTypeOf(item.pubDate).toBeString()
          expect(item.pubDate).not.toBe("")
          assert(luxon.fromRFC2822(item.pubDate).isValid)
        })
      )
    })
  })
})

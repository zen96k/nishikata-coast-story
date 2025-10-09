import { DateTime as luxon } from "luxon"
import { assert, describe, expect, expectTypeOf, test } from "vitest"
import { RssParser } from "../../../app/module/RssParser.ts"

const parser = new RssParser()

describe("RssParser parseUrl", () => {
  test("Qiita", async () => {
    const url = "https://qiita.com/popular-items/feed.atom"
    const { items: items } = await parser.parseUrl(url)

    items.forEach((item) => {
      expectTypeOf(item.title).toBeString()
      expect(item.title).not.toBe("")

      expectTypeOf(item.link).toBeString()
      expect(item.link).not.toBe("")
      expect(item.link).toContain("https://qiita.com")

      expectTypeOf(item.author).toBeString()
      expect(item.author).not.toBe("")

      expectTypeOf(item.pubDate).toBeString()
      expect(item.pubDate).not.toBe("")
      assert(luxon.fromISO(item.pubDate).isValid)
    })
  })

  test("Zenn", async () => {
    const url = "https://zenn.dev/feed"
    const { items: items } = await parser.parseUrl(url)

    items.forEach((item) => {
      expectTypeOf(item.title).toBeString()
      expect(item.title).not.toBe("")

      expectTypeOf(item.link).toBeString()
      expect(item.link).not.toBe("")
      expect(item.link).toContain("https://zenn.dev")

      expectTypeOf(item.author).toBeString()
      expect(item.author).toBeUndefined()

      expectTypeOf(item.creator).toBeString()
      expect(item.creator).not.toBe("")

      expectTypeOf(item.pubDate).toBeString()
      expect(item.pubDate).not.toBe("")
      assert(luxon.fromRFC2822(item.pubDate).isValid)
    })
  })
})

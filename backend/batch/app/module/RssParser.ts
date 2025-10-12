import Parser from "rss-parser"

type CustomFeed = { items: CustomItem[] }
type CustomItem = {
  title?: string
  link?: string
  author?: string
  creator?: string
  pubDate?: string
}

export class RssParser {
  public async parseUrl(url: string) {
    const parser: Parser<CustomFeed, CustomItem> = new Parser()

    const rssFeed = await parser.parseURL(url)

    return rssFeed
  }
}

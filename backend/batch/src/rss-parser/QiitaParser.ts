import Parser from "rss-parser"

type QiitaFeed = { items: QiitaItem[] }
type QiitaItem = {
  title: string
  link: string
  author: string
  published: string
  updated: string
}

export class QiitaParser {
  public async parseUrl(url: string) {
    const parser: Parser<QiitaFeed, QiitaItem> = new Parser({
      customFields: {
        feed: ["items"],
        item: ["title", "link", "author", "published", "updated"]
      }
    })

    const feed = await parser.parseURL(url)

    return feed
  }
}

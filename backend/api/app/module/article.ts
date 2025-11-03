import { Prisma, PrismaClient } from "../../type/prisma/client.ts"

class Article {
  private dbClient: PrismaClient

  public constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient
  }

  public async count(args?: Prisma.ArticleCountArgs) {
    const count = await this.dbClient.article.count(args)

    return count
  }

  public async readAll(args?: Prisma.ArticleFindManyArgs) {
    const articles = await this.dbClient.article.findMany(args)

    return articles
  }

  public async readAllWithPaging(
    countArgs: Prisma.ArticleCountArgs,
    findManyArgs: Prisma.ArticleFindManyArgs
  ) {
    const [count, articles] = await this.dbClient.$transaction([
      this.dbClient.article.count(countArgs),
      this.dbClient.article.findMany(findManyArgs)
    ])

    return {
      pageLength: Math.ceil(count / findManyArgs.take!),
      articles: articles
    }
  }
}

export default Article

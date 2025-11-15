import { Prisma, PrismaClient } from "../../type/prisma/client.ts"

class Article {
  private dbClient: PrismaClient

  public constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient
  }

  public async readAll(
    countArgs?: Prisma.ArticleCountArgs,
    findManyArgs?: Prisma.ArticleFindManyArgs
  ) {
    const [count, articles] = await this.dbClient.$transaction([
      this.dbClient.article.count(countArgs),
      this.dbClient.article.findMany(findManyArgs)
    ])

    return { count: count, articles: articles }
  }
}

export default Article

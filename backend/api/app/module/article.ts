import { Prisma, PrismaClient } from "../../type/prisma/client.ts"

class Article {
  private dbClient: PrismaClient

  public constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient
  }

  public async readAll(args?: Prisma.ArticleFindManyArgs) {
    const articles = await this.dbClient.article.findMany(args)

    return articles
  }
}

export default Article

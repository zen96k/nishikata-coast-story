import type { Prisma, PrismaClient } from "~~/type/prisma/client"

export class ArticleManager {
  private dbClient: PrismaClient

  public constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient
  }

  public async findMany(args?: Prisma.ArticleFindManyArgs) {
    const articles = await this.dbClient.article.findMany(args)

    return articles
  }
}

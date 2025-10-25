import { Prisma, PrismaClient } from "../../type/prisma/client.ts"

class ArticleDao {
  private dbClient: PrismaClient

  public constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient
  }

  public async findMany(args?: Prisma.ArticleFindManyArgs) {
    const articles = await this.dbClient.article.findMany(args)

    return articles
  }
}

export default ArticleDao

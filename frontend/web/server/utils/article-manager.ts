import type { Prisma } from "../../type/prisma/client"
import { PrismaClient } from "../../type/prisma/client"

export class ArticleManager {
  private client = new PrismaClient()

  public async findMany(transaction?: Prisma.TransactionClient) {
    const client = transaction || this.client

    const articles = await client.article.findMany()

    return articles
  }
}

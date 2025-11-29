import { ofetch } from "ofetch"

interface Article {
  title: string
  path: string
  user: { name: string }
  published_at: string
}

class ZennApi {
  public async fetchArticle(page?: number, count?: number, topic?: string) {
    const zennApiBaseUrl = process.env.ZENN_API_BASE_URL || ""

    const articles = await ofetch<{
      articles: Article[]
      next_page: number | null
    }>(`${zennApiBaseUrl}/articles`, {
      query: { page: page, count: count, topicname: topic }
    })

    return articles
  }
}

export default ZennApi

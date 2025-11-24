import { ofetch } from "ofetch"
import type { Item } from "../../type/qiita/api.ts"

class QiitaApi {
  public async fetchItem(page?: number, perPage?: number, query?: string) {
    const qiitaApiBaseUrl = process.env.QIITA_API_BASE_URL || ""

    const items = await ofetch<Item[]>(`${qiitaApiBaseUrl}/items`, {
      query: { page: page, per_page: perPage, query: query }
    })

    return items
  }
}

export default QiitaApi

import {PagingResponse} from "@/global/api/response.ts";
import SuggestResponse, {ArticleModel, ArticleDetailModel} from "@/article/api/article-response.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {
  ArticleCreateRequest,
  ArticlePagingParams,
  ArticleStatusUpdateRequest,
  ArticleUpdateRequest
} from "@/article/api/article-request.ts";



export async function getArticlePaging(params: ArticlePagingParams): Promise<PagingResponse<ArticleModel>> {
  const res = await axiosClient.get('/api/articles', {
    params: {
      ...params
    }
  });
  return res.data;
}

export async function getArticleDetail(articleId: number): Promise<ArticleDetailModel> {
  const res = await axiosClient.get(`/api/articles/${articleId}`);
  return res.data;
}

export async function createArticle(req: ArticleCreateRequest): Promise<void> {
  await axiosClient.post('/api/articles', req);
  return;
}

export async function updateArticle(articleId: number, req: ArticleUpdateRequest): Promise<void> {
  await axiosClient.put(`/api/articles/${articleId}`, req);
  return;
}


export async function deleteArticle(articleId: number): Promise<void> {
  await axiosClient.delete(`/api/articles/${articleId}`);
  return;
}

export async function updateArticleStatus(articleId:number, req:ArticleStatusUpdateRequest): Promise<void> {
  await axiosClient.patch(`/api/articles/${articleId}`, req);
  return;
}

export async function likeArticle(articleId:number): Promise<void> {
  await axiosClient.post(`/api/articles/${articleId}/likes`);
  return;
}

export async function unlikeArticle(articleId:number): Promise<void> {
  await axiosClient.delete(`/api/articles/${articleId}/likes`);
  return;
}

export async function suggestKeyword(text: string): Promise<SuggestResponse> {
  const res = await axiosClient.get(`/api/translation?text=${text}`);
  return res.data;
}

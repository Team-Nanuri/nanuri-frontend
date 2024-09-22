import {PagingResponse} from "@/global/api/response.ts";
import {ArticleModel, ArticleDetailModel} from "@/article/api/article-response.ts";
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
  // const res = await axiosClient.get(`/api/articles/${articleId}`);
  // return res.data;
  await new Promise(resolve => setTimeout(resolve, 1000));
  const article: ArticleDetailModel = {
    articleId,
    title: `Article ${articleId}`,
    content: `Article content ${articleId}`,
    imageUrls: [`https://picsum.photos/200/300?random=${articleId}`],
    shareType: 'DONATION',
    liked: articleId%7 === 4,
    createdAt: new Date().toISOString(),
    category: 'CATEGORY',
    writer: {
      userType: 'EXCHANGE',
      id: articleId,
      username: `User ${articleId}`,
    },
    status: articleId%3 === 1 ? 'DONE' : 'ONGOING',
    rentalEndDate: new Date().toISOString(),
    rentalStartDate: new Date().toISOString(),
  }
  return article;
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

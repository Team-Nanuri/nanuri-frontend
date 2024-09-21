import {PagingResponse} from "@/global/api/response.ts";
import {ArticleModel} from "@/article/api/article-response.ts";
import {axiosClient} from "@/global/api/axios.ts";
import {
  ArticleCreateRequest,
  ArticlePagingParams,
  ArticleStatusUpdateRequest,
  ArticleUpdateRequest
} from "@/article/api/article-request.ts";


function genArticle(page:number, size: number,keyword:string): PagingResponse<ArticleModel> {
  const articles : ArticleModel[]= [];
  for(let i = page*size; i <page*size+ size; i++) {
    const article: ArticleModel = {
      articleId: i,
      title: `Article ${i}`,
      content: `Article content ${i} ${keyword}`,
      imageUrl: `https://picsum.photos/200/300?random=${i}`,
      createdAt: new Date(),
      shareType: 'DONATE',
      liked: i%7 === 4,
    }
    articles.push(article);
  }

  return {
    totalPages: 10,
    contents: articles,
  }
}


export async function getArticlePaging(params: ArticlePagingParams): Promise<PagingResponse<ArticleModel>> {
  // const res = await axiosClient.get('/api/articles', {
  //   params: {
  //     ...params
  //   }
  // });
  // return res.data;

  const data = genArticle(params.page, params.size,params.keyword);
  console.log('paing api 콜!',params, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data;
}

export async function getArticleDetail(articleId: number): Promise<ArticleModel> {
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

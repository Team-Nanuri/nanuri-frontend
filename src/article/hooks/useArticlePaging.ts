import {QueryKey, useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {ApiError, PagingResponse} from "@/global/api/response.ts";
import {ArticleModel, ArticleStatus, ShareType} from "@/article/api/article-response.ts";
import type {InfiniteData} from "@tanstack/query-core";
import {getArticlePaging, likeArticle, unlikeArticle} from "@/article/api/article-api.ts";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {ArticlePagingParams, ArticleSort} from "@/article/api/article-request.ts";

interface UseUserArticlePagingProps {
  userId?: number;
  shareType?: ShareType;
  keyword?: string;
  status?: ArticleStatus;
  sort?: ArticleSort;
}

interface UseUserArticlePagingReturn {
  data: InfiniteData<PagingResponse<ArticleModel>> | undefined;
  ref: (node?: (Element | null)) => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  likeClick: (articleId: number) => void;
  dislikeClick: (articleId: number) => void;

}

export default function useArticlePaging(
  {
    userId,
    shareType,
    keyword,
    status,
    sort= "CREATED_AT_DESC",
  }: UseUserArticlePagingProps) : UseUserArticlePagingReturn {
  const queryKey: QueryKey = [
    'articles', userId, shareType, keyword, status, sort
  ];


  const {
    data,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<
    PagingResponse<ArticleModel>,
    ApiError,
    InfiniteData<PagingResponse<ArticleModel>>,
    QueryKey,
    ArticlePagingParams
  >({
    queryKey: queryKey,
    initialPageParam: {
      page: 0,
      size: 10,
      writerId: userId,
      shareType,
      keyword,
      status,
      sort
    },
    queryFn: async context => {
      return await getArticlePaging(context.pageParam);
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.totalPages <= lastPageParam.page + 1) return null;
      return {
        ...lastPageParam,
        page: lastPageParam.page + 1,
      };
    },

  });


  const {ref, inView} = useInView({
    threshold: 0,
  });


  useEffect(() => {
    if (inView && !isFetchingNextPage && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, data?.pages.length, isFetching, hasNextPage, fetchNextPage]);

  const queryClient = useQueryClient();
  const updateLikeUiState = async (articleId: number, liked: boolean) => {
    const previousData: InfiniteData<PagingResponse<ArticleModel>> | undefined = queryClient.getQueryData(queryKey);
    if (!previousData) return;

    const updatedPages = previousData.pages.map(page => {
      const articleIndex = page.contents.findIndex(article => article.articleId === articleId);

      // 찾은 경우에만 업데이트
      if (articleIndex !== -1) {
        const updatedContents = page.contents.map(article =>
          article.articleId === articleId ? { ...article, liked } : article
        );
        return { ...page, contents: updatedContents };
      }

      return page;
    });

    queryClient.setQueryData<InfiniteData<PagingResponse<ArticleModel>>>(queryKey, {
      ...previousData,
      pages: updatedPages,
    });
  };

  const likeMutation = useMutation({
    mutationFn: async (articleId: number) => {
      await likeArticle(articleId);
    },
    onMutate: async (articleId: number) => {
      console.log("onMutate", articleId);
      await updateLikeUiState(articleId, true); // liked를 true로 설정
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: async (articleId: number) => {
      await unlikeArticle(articleId);
    },
    onMutate: async (articleId: number) => {
      console.log("onMutate", articleId);
      await updateLikeUiState(articleId, false); // liked를 false로 설정
    }
  });

  return {
    data,
    ref,
    isFetching,
    isFetchingNextPage,
    likeClick: (articleId) => {
      likeMutation.mutate(articleId);
    },
    dislikeClick: (articleId) => {
      unlikeMutation.mutate(articleId);
    }
  }
}
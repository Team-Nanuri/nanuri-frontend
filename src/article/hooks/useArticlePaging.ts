import {QueryKey, useInfiniteQuery} from "@tanstack/react-query";
import {ApiError, PagingResponse} from "@/global/api/response.ts";
import {ArticleModel, ShareType} from "@/article/api/article-response.ts";
import type {InfiniteData} from "@tanstack/query-core";
import {getArticlePaging} from "@/article/api/article-api.ts";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {ArticlePagingParams} from "@/article/api/article-request.ts";

interface UseUserArticlePagingProps {
  userId?: number;
  shareType?: ShareType;
}

export default function useArticlePaging(
  {
    userId,
    shareType,
  }: UseUserArticlePagingProps) {
  const queryKey: QueryKey = [
    'articles', userId, shareType
  ];


  const {
    data,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage
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
      shareType: shareType,
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


  return {
    data,
    ref,
    isFetching,
    isFetchingNextPage
  }
}
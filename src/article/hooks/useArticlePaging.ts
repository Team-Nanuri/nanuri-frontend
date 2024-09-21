import {QueryKey, useInfiniteQuery} from "@tanstack/react-query";
import {ApiError, PagingResponse} from "@/global/api/response.ts";
import {ArticleModel} from "@/article/api/article-response.ts";
import type {InfiniteData} from "@tanstack/query-core";
import {getArticlePaging} from "@/article/api/article-api.ts";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function useArticlePaging() {
  const queryKey: QueryKey = [
    'articles', // 쿼리의 고유한 식별자
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
    InfiniteData<PagingResponse<ArticleModel>>
  >({
    queryKey: queryKey,
    initialPageParam: {page: 0, size: 10},
    queryFn: async context => {
      const p = context.pageParam;
      return await getArticlePaging({
        page: p.page,
        size: p.size,
      });
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if(lastPage.totalPages <= lastPageParam.page + 1) return null;
      return {
        page: lastPageParam.page + 1,
        size: lastPageParam.size,
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
import {QueryKey, useInfiniteQuery} from "@tanstack/react-query";
import {ApiError, PagingResponse} from "@/global/api/response.ts";
import {ChatRoomModel} from "@/chat/api/chat-response.ts";
import type {InfiniteData} from "@tanstack/query-core";
import {getChatRoomPaging} from "@/chat/api/chat-api.ts";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export default function useChatRoomPaging() {
  const queryKey: QueryKey = [
    'chat', // 쿼리의 고유한 식별자
  ];

  const {
    data,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery<
    PagingResponse<ChatRoomModel>,
    ApiError,
    InfiniteData<PagingResponse<ChatRoomModel>>
  >({
    queryKey: queryKey,
    initialPageParam: {page: 0, size: 10},
    queryFn: async context => {
      const p = context.pageParam;
      return await getChatRoomPaging({
        page: p.page,
        size: p.size,
      });
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
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
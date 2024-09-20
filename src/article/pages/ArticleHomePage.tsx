import {ArticleModel, shareTypeToKorean} from "@/article/api/article-response.ts";
import {getArticlePaging} from "@/article/api/article-api.ts";
import {ApiError, PagingResponse} from "@/global/api/response.ts";
import {QueryKey, useInfiniteQuery} from "@tanstack/react-query";
import type {InfiniteData} from "@tanstack/query-core";
import {Fragment, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Heart, Search} from "lucide-react";

export default function ArticleHomePage() {
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


  return (
    <div className="w-full">
      <HomeHeader/>
      <div className="h-[60px]"/>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {
            page.contents.map(article => (
              <ArticleItem key={article.articleId} article={article}/>
            ))
          }
        </Fragment>
      ))}
      <div ref={ref}>
        {isFetchingNextPage && 'Loading more...'}
      </div>
    </div>
  );
}


function HomeHeader() {
  return (
    <div className="
      h-[60px] w-full flex flex-row justify-between items-center fixed
      px-[20px] bg-white border-b
    ">
      <img className="h-[28px] pb-[4px]" src={"src/assets/logo.png"} alt={"#"}/>
      <Search />
    </div>
  );
}

interface ArticleItemProps {
  article: ArticleModel;
}

function ArticleItem({article}: ArticleItemProps) {
  return (
    <div className="h-[130px] flex flex-row justify-center items-center border-b">
      <img className="mx-[12px] w-[96px] h-[96px]" src={article.imageUrl} alt="#"/>

      <div className="h-full flex-grow flex flex-col pr-[12px] py-[12px]">
        <div className="w-full mr-[12px] flex flex-row justify-between">
          <div className="font-semibold text-[14px]">
            {article.title}
          </div>
          <div className="font-normal text-[12px]">
            {shareTypeToKorean(article.shareType)}
          </div>
        </div>
        <div className="flex-[1] font-normal text-[12px]">
          {article.content}
        </div>
        <div className="flex flex-row">
          <div className="flex-grow" />
          {article.liked && <Heart color="#ff0000" fill="#ff0000" />}
          {!article.liked && <Heart />}
        </div>
      </div>
    </div>
  );
}
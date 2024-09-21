import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import {Fragment} from "react";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import LoadingSpinner from "@/global/components/LoadingSpinner.tsx";
import {useTranslation} from "react-i18next";

export default function ArticleLikePage() {
  const {
    data,
    isFetchingNextPage,
    ref,
    likeClick,
    dislikeClick,
  } = useArticlePaging({});

  return (
    <div className="w-full h-full">
      <LikeHeader/>
      <section className="h-[calc(100%-60px)] overflow-auto">
        {!data && <LoadingSpinner/>}
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {
              page.contents.map(article => (
                <ArticleItem
                  key={article.articleId}
                  article={article}
                  likeClick={likeClick}
                  dislikeClick={dislikeClick}
                />
              ))
            }
          </Fragment>
        ))}
        <div ref={ref}>
          {isFetchingNextPage && 'Loading more...'}
        </div>
      </section>
    </div>
  );
}


function LikeHeader() {
  const { t } = useTranslation();
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <h1 className="font-normal text-[20px]">
        {t('좋아요')}
      </h1>

    </header>
  );
}

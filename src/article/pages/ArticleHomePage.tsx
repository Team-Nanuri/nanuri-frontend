import {ArticleModel, shareTypeToKorean} from "@/article/api/article-response.ts";
import {Fragment} from "react";
import {Heart, Search} from "lucide-react";
import useArticlePaging from "@/article/hooks/useArticlePaging.ts";

export default function ArticleHomePage() {
  const {
    data,
    isFetchingNextPage,
    ref,
  } = useArticlePaging();


  return (
    <div className="w-full h-full">
      <HomeHeader/>
      <section className="h-[calc(100%-60px)] overflow-auto">
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
      </section>

    </div>
  );
}


function HomeHeader() {
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <img className="h-[28px] pb-[4px]" src={"src/assets/logo.png"} alt={"#"}/>
      <Search />
    </header>
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
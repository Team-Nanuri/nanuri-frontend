import {Fragment} from "react";
import {Search} from "lucide-react";
import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import logo from "@/assets/logo.svg";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import {Link} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";

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
      <img className="h-[28px] pb-[4px]" src={logo} alt={"#"}/>
      <Link to={ROUTER_PATH.SEARCH}>
        <Search/>
      </Link>

    </header>
  );
}

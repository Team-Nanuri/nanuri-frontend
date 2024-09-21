import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import {useUser} from "@/user/hooks/useUser.ts";
import UserItem from "@/user/components/UserItem.tsx";
import {Fragment} from "react";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import {Link, useParams} from "react-router-dom";
import {ROUTER_PATH} from "@/global/const/const.ts";
import {ChevronLeft} from "lucide-react";

export default function OtherUserArticlePage() {
  const { userId } = useParams<{ userId: string }>();

  const {
    data,
    ref,
    isFetchingNextPage,
  } = useArticlePaging();
  console.log(userId);

  const {user, error} = useUser();

  return (
    <div className="w-full h-full">
      <BackButtonHeader/>
      <UserItem user={user} error={error} />
      <div className="h-[8px] w-full bg-searchBarGrey mt-[8px]"/>
      <ArticleHeader/>
      <section className="h-[calc(100%-196px)] overflow-auto">
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



function BackButtonHeader() {
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white
    ">
      <Link to={ROUTER_PATH.HOME}>
        <ChevronLeft/>
      </Link>
    </header>
  );
}

function ArticleHeader() {
  return (
    <div className="h-[60px] flex flex-row justify-between items-center px-[12px]">
      <h3 className="font-normal text-[24px]">
        나눔 상품
      </h3>
      <h6 className="font-normal text-[16px]">
        나눔 중
      </h6>
    </div>
  );
}


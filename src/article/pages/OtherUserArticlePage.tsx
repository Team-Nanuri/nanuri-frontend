import UserItem from "@/user/components/UserItem.tsx";
import {Fragment} from "react";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getOtherUserInfo} from "@/user/api/user-api.ts";
import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import LoadingSpinner from "@/global/components/LoadingSpinner.tsx";

export default function OtherUserArticlePage() {
  const { userId } = useParams<{ userId: string }>();

  const {
    data,
    ref,
    isFetchingNextPage,
    likeClick,
    dislikeClick
  } = useArticlePaging({
    userId: Number(userId),
  });



  const {data: user, error: userError} = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return await getOtherUserInfo(Number(userId));
    },
  })


  return (
    <div className="w-full h-full">
      <BackButtonHeader/>
      <UserItem user={user} error={userError} />
      <div className="h-[8px] w-full bg-searchBarGrey mt-[8px]"/>
      <ArticleHeader/>
      <section className="h-[calc(100%-196px)] overflow-auto">
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



function BackButtonHeader() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white
    ">
      <button onClick={handleBack}>
        <ChevronLeft/>
      </button>
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


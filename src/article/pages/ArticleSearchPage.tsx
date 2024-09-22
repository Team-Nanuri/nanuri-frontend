import {ChevronDown} from "lucide-react";
import {Fragment, useState} from "react";
import {Badge} from "@/global/components/ui/badge.tsx";
import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/global/components/ui/drawer"
import {ArticleStatus, ShareType} from "@/article/api/article-response.ts";
import ArticleSearchHeader from "@/article/components/ArticleSearchHeader.tsx";
import LoadingSpinner from "@/global/components/LoadingSpinner.tsx";
import {ArticleSort} from "@/article/api/article-request.ts";
import {useTranslation} from "react-i18next";


export default function ArticleSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [apiKeyword, setApiKeyword] = useState<string | undefined>(undefined);
  const [shareType, setShareType] = useState<ShareType | undefined>(undefined);
  const [status, setStatus] = useState<ArticleStatus | undefined>(undefined);
  const [sort, setSort] = useState<ArticleSort | undefined>(undefined);

  const {
    data,
    isFetchingNextPage,
    ref,
    likeClick,
    dislikeClick,
  } = useArticlePaging({
    keyword: apiKeyword,
    shareType,
    status,
    sort,
  });


  const onSearchClicked = () => {
    alert(`검색어: ${searchKeyword}!`);
    setApiKeyword(searchKeyword);
  }


  return (
    <div className="w-full h-full">
      <ArticleSearchHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onSearchClicked={onSearchClicked}
      />
      {
        apiKeyword && data && (
          <ArticleSearchParamBox
            shareType={shareType} setShareType={setShareType}
            status={status} setStatus={setStatus}
            sort={sort} setSort={setSort}
          />
        )
      }
      <section className="h-[calc(100%-100px)] overflow-auto">
        {apiKeyword && !data && <LoadingSpinner/>}

        {apiKeyword &&  data?.pages.map((page, i) => (
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
        {apiKeyword && (
          <div ref={ref}>
            {isFetchingNextPage && 'Loading more...'}
          </div>
        )}
      </section>
    </div>
  );
}

function ArticleSearchParamBox({shareType, setShareType, status, setStatus, sort, setSort}: {
  shareType: ShareType | undefined,
  setShareType: (shareType?: ShareType) => void,
  status: ArticleStatus | undefined,
  setStatus: (status?: ArticleStatus) => void,
  sort: ArticleSort | undefined,
  setSort: (sort: ArticleSort) => void,
}){

  const {  t } = useTranslation();
  return (
    <div
      className="
      h-[40px] flex flex-row justify-start
      items-center px-[20px] gap-[10px]
    ">
      <Badge variant="secondary" className="pr-1">
        <div>
          {t("카테고리")}
        </div>
        <ChevronDown />
      </Badge>
      <DrawerArticleSort sort={sort} setSort={setSort}/>
      <DrawerShareType shareType={shareType} setShareType={setShareType}/>
      <DrawerArticleStatus status={status} setStatus={setStatus}/>
    </div>
  )
}


export function DrawerShareType(
  {shareType, setShareType}: {
    shareType: ShareType | undefined,
    setShareType: (shareType?: ShareType) => void
  }
){
  const {  t } = useTranslation();
  let label = '유형';
  if(shareType){
    label = shareType;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge variant="secondary" className="pr-1">
          <div>
            {t(label)}
          </div>
          <ChevronDown/>
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("유형")}</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setShareType("DONATE")}
                >
                  {t("DONATE")}
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setShareType("RENTAL")}
                >
                  {t("RENTAL")}
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setShareType(undefined)}
              >
                {t("취소")}
              </button>
            </DrawerClose>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerArticleStatus(
  {status, setStatus}: {
    status: ArticleStatus | undefined,
    setStatus: (status?: ArticleStatus) => void
  }
){
  const {  t } = useTranslation();

  let label = '상태';
  if(status==='ONGOING'){
    label = '진행중';
  }else if(status==='DONE'){
    label = '완료';
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge variant="secondary" className="pr-1">
          <div>
            {t(label)}
          </div>
          <ChevronDown/>
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("유형")}</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setStatus("ONGOING")}
                >
                  {t("진행중")}
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setStatus("DONE")}
                >
                  {t("완료")}
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setStatus(undefined)}
              >
                {t("취소")}
              </button>
            </DrawerClose>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


export function DrawerArticleSort(
  {sort, setSort}: {
    sort?: ArticleSort,
    setSort: (sort?: ArticleSort) => void
  }
){
  const {  t } = useTranslation();

  let label = '정렬';
  if(sort==='CREATED_AT_DESC'){
    label = '최신순';
  }else if(sort==='CREATED_AT_ASC'){
    label = '등록일순';
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge variant="secondary" className="pr-1">
          <div>
            {t(label)}
          </div>
          <ChevronDown/>
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("정렬")}</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setSort("CREATED_AT_DESC")}>
                  {t("최신순")}
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setSort("CREATED_AT_ASC")}
                >
                  {t("등록일순")}
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setSort(undefined)}
              >
                {t("취소")}
              </button>
            </DrawerClose>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


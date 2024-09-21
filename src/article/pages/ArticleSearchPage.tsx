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


export default function ArticleSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [apiKeyword, setApiKeyword] = useState<string | undefined>(undefined);
  const [shareType, setShareType] = useState<ShareType | undefined>(undefined);
  const [status, setStatus] = useState<ArticleStatus | undefined>(undefined);

  const {
    data,
    isFetchingNextPage,
    ref,
  } = useArticlePaging({
    keyword: apiKeyword,
    shareType,
    status,
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
      <ArticleSearchParamBox
        shareType={shareType} setShareType={setShareType}
        status={status} setStatus={setStatus}
      />
      <section className="h-[calc(100%-100px)] overflow-auto">

        {apiKeyword &&  data?.pages.map((page, i) => (
          <Fragment key={i}>
            {
              page.contents.map(article => (
                <ArticleItem key={article.articleId} article={article}/>
              ))
            }
          </Fragment>
        ))}
        <div ref={ref}>
          {apiKeyword && isFetchingNextPage && 'Loading more...'}
        </div>
      </section>
    </div>
  );
}

function ArticleSearchParamBox({shareType, setShareType, status, setStatus}: {
  shareType: ShareType | undefined,
  setShareType: (shareType?: ShareType) => void,
  status: ArticleStatus | undefined,
  setStatus: (status?: ArticleStatus) => void,
}){
  return (
    <div
      className="
      h-[40px] flex flex-row justify-start
      items-center px-[20px] gap-[10px]
    ">
      <Badge variant="secondary" className="pr-1">
        <div>
          카테고리
        </div>
        <ChevronDown />
      </Badge>
      <Badge variant="secondary" className="pr-1">
        <div>
          정렬
        </div>
        <ChevronDown />
      </Badge>
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
  let label = '유형';
  if(shareType === 'DONATE'){
    label = '나눔';
  }else if(shareType === 'RENTAL'){
    label = '대여';
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge variant="secondary" className="pr-1">
          <div>
            {label}
          </div>
          <ChevronDown/>
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>유형</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setShareType("DONATE")}
                >
                  나눔
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setShareType("RENTAL")}
                >
                  대여
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setShareType(undefined)}
              >
                취소
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
            {label}
          </div>
          <ChevronDown/>
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>유형</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-row justify-between gap-4">
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setStatus("ONGOING")}
                >
                  진행중
                </button>
              </DrawerClose>
              <DrawerClose asChild>
                <button
                  className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                  onClick={()=>setStatus("DONE")}
                >
                  완료
                </button>
              </DrawerClose>
            </div>

            <DrawerClose asChild>
              <button
                className="flex-[1] bg-[#f0f0f0] p-4 rounded-md"
                onClick={()=>setShareType(undefined)}
              >
                취소
              </button>
            </DrawerClose>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
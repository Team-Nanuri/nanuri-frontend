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
import {ShareType} from "@/article/api/article-response.ts";
import ArticleSearchHeader from "@/article/components/ArticleSearchHeader.tsx";


export default function ArticleSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [apiKeyword, setApiKeyword] = useState<string | undefined>(undefined);
  const [shareType, setShareType] = useState<ShareType | undefined>(undefined);

  const {
    data,
    isFetchingNextPage,
    ref,
  } = useArticlePaging({
    keyword: apiKeyword,
    shareType,
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
      <ArticleSearchParamBox shareType={shareType} setShareType={setShareType}/>
      <section className="h-[calc(100%-100px)] overflow-auto">
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

function ArticleSearchParamBox({shareType, setShareType}: {
  shareType: ShareType | undefined,
  setShareType: (shareType?: ShareType) => void
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
      <DrawerDemo shareType={shareType} setShareType={setShareType}/>
      <Badge variant="secondary" className="pr-1">
        <div>
          상태
        </div>
        <ChevronDown />
      </Badge>
    </div>
  )
}


export function DrawerDemo(
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
                  onClick={()=>setShareType(undefined)}
                >
                  취소
                </button>
              </DrawerClose>
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

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
import {ChevronDown, ChevronLeft, Search} from "lucide-react";
import {Input} from "@/global/components/ui/input.tsx";
import {Fragment, useState} from "react";
import {Badge} from "@/global/components/ui/badge.tsx";
import useArticlePaging from "@/article/hooks/useArticlePaging.ts";
import ArticleItem from "@/article/components/ArticleItem.tsx";
import {useNavigate} from "react-router-dom";

export default function ArticleSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [apiKeyword, setApiKeyword] = useState<string | undefined>(undefined);

  const {
    data,
    isFetchingNextPage,
    ref,
  } = useArticlePaging({
    keyword: apiKeyword,
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
      <ArticleSearchParamBox/>
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


interface SearchHeaderProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  onSearchClicked: () => void;
}

function ArticleSearchHeader({searchKeyword, setSearchKeyword, onSearchClicked}: SearchHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <button onClick={handleBack}>
        <ChevronLeft/>
      </button>
      <Input
        className="mx-[12px] bg-searchBarGrey"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchClicked();
          }
        }}
      />
      <button onClick={onSearchClicked}>
        <Search/>
      </button>
    </header>
  );
}

function ArticleSearchParamBox() {
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
      <Badge variant="secondary" className="pr-1">
        <div>
          유형
        </div>
        <ChevronDown/>
      </Badge>
      <Badge variant="secondary" className="pr-1">
        <div>
          상태
        </div>
        <ChevronDown />
      </Badge>
    </div>
  )
}
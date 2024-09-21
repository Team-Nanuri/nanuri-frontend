import {ChevronLeft, Search} from "lucide-react";
import {Input} from "@/global/components/ui/input.tsx";
import {useState} from "react";

export default function ArticleSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="w-full h-full">
      <ArticleSearchHeader searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>

    </div>
  );
}


interface SearchHeaderProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

function ArticleSearchHeader({searchKeyword, setSearchKeyword}: SearchHeaderProps) {
  return (
    <header className="
      h-[60px] flex flex-row justify-between items-center
      px-[20px] bg-white border-b
    ">
      <ChevronLeft />
      <Input
        className="mx-[12px] bg-searchBarGrey"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Search />
    </header>
  );
}
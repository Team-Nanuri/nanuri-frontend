import {useNavigate} from "react-router-dom";
import {ChevronLeft, Search} from "lucide-react";
import {Input} from "@/global/components/ui/input.tsx";
import {useTranslation} from "react-i18next";


interface SearchHeaderProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  onSearchClicked: () => void;
}

export default function ArticleSearchHeader({searchKeyword, setSearchKeyword, onSearchClicked}: SearchHeaderProps) {
  const navigate = useNavigate();

  const {  t } = useTranslation();

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
        placeholder={t("검색어를 입력하세요.")}
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


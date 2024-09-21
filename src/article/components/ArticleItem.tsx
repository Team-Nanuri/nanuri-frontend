import {ArticleModel, shareTypeToKorean} from "@/article/api/article-response.ts";
import {Heart} from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleItemProps {
  article: ArticleModel;
}

export default function ArticleItem({article}: ArticleItemProps) {
  return (
    <Link
     className="h-[130px] flex flex-row justify-center items-center border-b"
     to={`/article/${article.articleId}`}
     >
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
    </Link>
  );
}
import {ArticleModel} from "@/article/api/article-response.ts";
import {Heart} from "lucide-react";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

interface ArticleItemProps {
  article: ArticleModel;
  likeClick: (articleId: number) => void;
  dislikeClick: (articleId: number) => void;
}

export default function ArticleItem({article, likeClick, dislikeClick}: ArticleItemProps) {
  const {  t } = useTranslation();

  return (
    <Link
      className="h-[130px] flex flex-row justify-center items-center border-b"
      to={`/article/${article.articleId}`}
    >
      {!article.imageUrl && <div
          className="mx-[12px] w-[96px] h-[96px] bg-gray-300"
      />}
      {article.imageUrl &&
        <img className="mx-[12px] w-[96px] h-[96px]" src={article.imageUrl} alt="#"/>
      }

      <div className="h-full flex-grow flex flex-col pr-[12px] py-[12px]">
        <div className="w-full mr-[12px] flex flex-row justify-between">
          <div className="font-semibold text-[14px]">
            {article.title}
          </div>
          <div className="font-normal text-[12px]">
            {t(article.shareType)}
          </div>
        </div>
        <div className="flex-[1] font-normal text-[12px]">
          {article.content}
        </div>
        <div className="flex flex-row">
          <div className="flex-grow" />
          <button
            className="z-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); // prevent Link navigation
              if(article.liked){
                dislikeClick(article.articleId);
              } else {
                likeClick(article.articleId);
              }
            }}
          >
            <Heart
              color={article.liked ? "#ff0000" : undefined}
              fill={article.liked ? "#ff0000" : "#ffffff"}
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
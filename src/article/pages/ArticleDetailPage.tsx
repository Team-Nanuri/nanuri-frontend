import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticleDetail } from "../api/article-api";
import styles from "./ArticleDetailPage.module.css";
import { ChevronLeft, Heart } from "lucide-react";
// import styles from "@/article/pages/ArticleDetailPage.module.css";

export default function ArticleDetailPage() {
    const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const { data: articleDetail } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      return await getArticleDetail(Number(articleId));
    },
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full">
         <header className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>
        <ChevronLeft/>
        </button>

        <button className={styles.heartButton}>
         <Heart />
        </button>
      </header>
      {/* imageUrls 배열을 map으로 순회하여 이미지를 렌더링 */}
      <div className={styles.picturesContainer}>
      {articleDetail?.imageUrls?.map((imageUrl: string, index: number) => (
        <img
          key={index}
          className={styles.pictures}
          src={imageUrl}
          alt={`image-${index}`}
        />
      ))}
      </div>

      <div className={styles.userContainer}>
        <p>{articleDetail?.writer.username}</p>
        <p>{articleDetail?.writer.userType}</p>
        </div>
        <hr className={styles.line}/>
    


      </div>
    
  );
}

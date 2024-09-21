import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticleDetail } from "../api/article-api";
import styles from "./ArticleDetailPage.module.css";
import { ChevronLeft, Heart } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import LoadingSpinner from "@/global/components/LoadingSpinner";
import { ArticleDetailModel } from "../api/article-response";
// import styles from "@/article/pages/ArticleDetailPage.module.css";

export default function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const { data: articleDetail } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      return await getArticleDetail(Number(articleId));
    },
  });

  if (!articleDetail) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full">
      <ArticleDetailHeader />
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
      <ArticleDetailContent articleDetail={articleDetail} />
    </div>
  );
}

function ArticleDetailHeader() {
    
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={goBack}>
        <ChevronLeft />
      </button>
      <button className={styles.heartButton}>
        <Heart />
      </button>
    </header>
  );
}

function ArticleDetailContent({
  articleDetail,
}: {
  articleDetail: ArticleDetailModel;
}) {
  const dateStr = articleDetail.createdAt;
  dayjs.locale("ko");
  const formatDateStr = dayjs(dateStr).format("YYYY/MM/DD HH:mm");

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.userContainer}>
          <p className={styles.username}>{articleDetail?.writer.username}</p>
          <p className={styles.userType}>{articleDetail?.writer.userType}</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.infoContainer}>
          <div className={styles.infoFirstLine}>
            <p className={styles.title}>{articleDetail?.title}</p>
            <p className={styles.category}>{articleDetail?.category}</p>
          </div>
          <p className={styles.createdAt}>{formatDateStr}</p>
          <p className={styles.shareType}>{articleDetail?.shareType}</p>
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.content}>{articleDetail?.content}</p>
        </div>
        <footer>
          <button className={styles.footerButton}>문의</button>
        </footer>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/user/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getArticleDetail } from "../api/article-api";
import styles from "./ArticleDetailPage.module.css";
import { ChevronLeft, EllipsisVertical, Heart } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import LoadingSpinner from "@/global/components/LoadingSpinner";
import { ArticleDetailModel } from "../api/article-response";
import ArticleModify from "@/article/components/ArticleModify";
import rec from "@/assets/rec.png";
import {createChatRoom} from "@/chat/api/chat-api.ts";
// ArticleModify 컴포넌트를 불러옵니다.

export default function ArticleDetailPage() {
  const [isModifyOpen, setModifyOpen] = useState<boolean>(false);

  const openModify = (): void => {
    setModifyOpen(true);
  };
  const closeModify = (): void => {
    setModifyOpen(false);
  };

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
    <div className="w-full h-full overflow-y-auto">
      <ArticleDetailHeader openModify={openModify} />
      {/* imageUrls 배열을 map으로 순회하여 이미지를 렌더링 */}

      {/* 이미지 렌더링 */}
      <div className={styles.picturesContainer}>
        {articleDetail.imageUrls && articleDetail.imageUrls.length > 0 ? (
          articleDetail.imageUrls.map((imageUrl: string, index: number) => (
            <img
              key={index}
              className={styles.pictures}
              src={imageUrl}
              alt={`image-${index}`}
            />
          ))
        ) : (
          <img className={styles.pictures} src={rec} alt="default image" />
        )}
      </div>
      <ArticleDetailContent articleDetail={articleDetail} />
      {/* ArticleModify 모달 */}
      {isModifyOpen && <ArticleModify closeModify={closeModify} />}
    </div>
  );
}

function ArticleDetailHeader({ openModify }: { openModify: () => void }) {
  const navigate = useNavigate();
  const { user, error } = useUser();
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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={goBack}>
        <ChevronLeft />
      </button>
      {user?.id === articleDetail?.writer.id ? (
        <button className={styles.RightButton} onClick={openModify}>
          <EllipsisVertical />
        </button>
      ) : (
        <button className={styles.RightButton}>
          <Heart />
        </button>
      )}
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
  const navigate = useNavigate();

  const createChatClicked = async () => {
    // 채팅 생성 로직
    const chatRoomId = await createChatRoom({
      articleId: articleDetail.articleId,
    })
    await navigate(`/chat/${chatRoomId}`);
  }

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.userContainer}>
          <p className={styles.username}>{articleDetail.writer.username}</p>
          <p className={styles.userType}>{articleDetail.writer.userType}</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.infoContainer}>
          <div className={styles.infoFirstLine}>
            <p className={styles.title}>{articleDetail.title}</p>
            <p className={styles.category}>{articleDetail.category}</p>
          </div>
          <p className={styles.createdAt}>{formatDateStr}</p>
          <p className={styles.shareType}>{articleDetail.shareType}</p>
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.content}>{articleDetail.content}</p>
        </div>
        <footer className={styles.footerWrapper}>
          <button
            className={styles.footerButton}
            onClick={createChatClicked}
          >
            문의
          </button>
        </footer>
      </div>
    </>
  );
}

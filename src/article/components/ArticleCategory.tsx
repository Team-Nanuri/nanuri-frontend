import React, { useState, useEffect } from "react";
import styles from "./ArticleCategory.module.css"; // 스타일 파일 불러오기

interface ArticleCategoryProps {
    closeCategory: () => void;
    }

    
    const ArticleCategory: React.FC<ArticleCategoryProps> = ({ closeCategory }) => {
        const [isActive, setIsActive] = useState(false);
        
        useEffect(() => {
            setTimeout(() => {
              setIsActive(true);
              document.body.classList.add('modal-open'); // 배경 스크롤 방지
            }, 10);
        
            return () => {
              document.body.classList.remove('modal-open'); // 모달 닫힐 때 배경 스크롤 다시 활성화
            };
          }, []);

          const handleClose = () => {
            setIsActive(false);
            setTimeout(() => {
              closeCategory();
            }, 400); // 애니메이션 지속 시간에 맞춤
          };

        return (
    <div>
      <div onClick={handleClose} className={`${styles.modalOverlay} ${isActive ? styles.modalOverlayActive : ''}`}>
      <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`}>
          <h2>카테고리 선택</h2>
            <button onClick={handleClose} className={styles.closeModalButton}>
              닫기
            </button>
          </div>
        </div>
    </div>
  );
};

export default ArticleCategory;

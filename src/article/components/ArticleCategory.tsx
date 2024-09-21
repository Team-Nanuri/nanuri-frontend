import React, { useState } from "react";
import styles from "./ArticleCategory.module.css"; // 스타일 파일 불러오기

interface ArticleCategoryProps {
    closeCategory: () => void;
    }

    const ArticleCategory: React.FC<ArticleCategoryProps> = ({ closeCategory }) => {
  return (
    <div>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
          <h2>카테고리 선택</h2>
    
            <button onClick={closeCategory} className={styles.closeModalButton}>
              닫기
            </button>
          </div>
        </div>
    </div>
  );
};

export default ArticleCategory;

import React, { useState, useEffect } from "react";
import styles from "./ArticleCategory.module.css"; // 스타일 파일 불러오기

interface ArticleCategoryProps {
  closeCategory: () => void;
  onCategorySelect: (category: string) => void; // 선택한 카테고리를 보낼 수 있도록 함
}

// 카테고리 매핑 객체 (한글 -> 영어)
const categoryMap: Record<string, string> = {
  "전자기기": "ELECTRONIC_DEVICES",
  "생활 가전": "HOME_APPLIANCES",
  "가구/인테리어": "FURNITURE_INTERIOR",
  "도서/티켓/음반": "BOOK_TICKET_ALBUM",
  "스포츠": "SPORTS",
  "잡화": "MISCELLANEOUS_GOODS",
  "여성 의류": "WOMEN_CLOTHES",
  "남성 의류": "MEN_CLOTHES",
  "게임/취미": "GAME_HOBBY",
  "뷰티": "BEAUTY",
  "기타": "ETC"
};

const ArticleCategory: React.FC<ArticleCategoryProps> = ({ closeCategory, onCategorySelect }) => {
  const [isActive, setIsActive] = useState(false);
  const categories = Object.keys(categoryMap); // 버튼에 표시될 한글 카테고리

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

  const handleCategoryClick = (categoryLabel: string) => {
    const selectedCategory = categoryMap[categoryLabel]; // 한글 레이블을 영어 값으로 변환
    onCategorySelect(selectedCategory); // 선택한 카테고리를 전달
    handleClose(); // 모달 닫기
  };

  return (
    <div>
      <div onClick={handleClose} className={`${styles.modalOverlay} ${isActive ? styles.modalOverlayActive : ''}`}>
        <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`}>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <CategoryButton key={category} label={category} onClick={handleCategoryClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCategory;

interface CategoryButtonProps {
  label: string;
  onClick: (label: string) => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={() => onClick(label)} className={styles.categoryButton}>
      {label}
    </button>
  );
};

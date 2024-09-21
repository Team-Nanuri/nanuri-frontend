import React, { useState, useEffect } from "react";
import styles from "./ArticleCategory.module.css"; // 스타일 파일 불러오기

interface ArticleCategoryProps {
    closeCategory: () => void;
    onCategorySelect: (category: string) => void; // 선택한 카테고리를 보낼 수 있도록 함
    }


    
    const ArticleCategory: React.FC<ArticleCategoryProps> = ({ closeCategory, onCategorySelect }) => {
        const [isActive, setIsActive] = useState(false);
        const categories = [
          '전자기기', '생활 가전', '가구/인테리어', '도서/티켓/음반', 
          '스포츠', '잡화', '여성 의류', '남성 의류', 
          '게임/취미', '뷰티', '기타'
        ];
      
        
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


  const handleCategoryClick = (category: string) => {
    onCategorySelect(category); // 선택한 카테고리를 전달
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
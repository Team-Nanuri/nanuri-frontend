import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './ArticleModify.module.css';

interface ArticleModifyProps {
  closeModify: () => void;
}


const ArticleModify: React.FC<ArticleModifyProps> = ({ closeModify }) => {
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
      closeModify();
    }, 400); // 애니메이션 지속 시간에 맞춤
  };

  return (
    <div>
   <div onClick={handleClose} className={`${styles.modifyOverlay} ${isActive ? styles.modalOverlayActive : ''}`}>
   <div className={`${styles.modifyContent} ${isActive ? styles.modalContentActive : ''}`}>
        <button className={styles.modifyButton} onClick={handleClose}>나눔 상태</button>
        <button className={styles.modifyButton} onClick={handleClose}>대여로 변경</button>
        <button className={styles.modifyButton} onClick={handleClose}>수정</button>
        <button className={styles.modifyButton} onClick={handleClose}>삭제</button>
      </div>
    </div>
    </div>
  );
};

export default ArticleModify;

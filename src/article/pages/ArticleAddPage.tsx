import React, { ChangeEvent, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Section } from "lucide-react";
import styles from "./ArticleAddPage.module.css";
import chevronright from "@/assets/chevron-right.svg";
import close from "@/assets/close.svg";
import del from "@/assets/delete.svg";
import camera from "@/assets/camera.svg";
import ArticleCategory from "../components/ArticleCategory";
import { createArticle } from "../api/article-api";
import { ArticleCreateRequest, ItemCategory } from "../api/article-request";

export default function ArticleAddPage() {
  const navigate = useNavigate();
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [rentalEndDate, setRentalEndDate] = useState('');
  const [postImg, setPostImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const maxFiles = 5;
  const [titleContent, setTitleContent] = useState<string>(""); // 문자열 상태
  const maxCharacters: number = 20;
  const [isCategoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('카테고리 선택');
  const [textareaContent, setTextareaContent] = useState<string>('');
  const [isRental, setIsRental] = useState(false);
  const [selectedType, setSelectedType] = useState<"나눔" | "대여" | null>(
    null
  );

 // 시작 날짜 변경 핸들러
 const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setRentalStartDate(e.target.value);
};

// 종료 날짜 변경 핸들러
const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setRentalEndDate(e.target.value);
};

    // 타입 버튼 클릭 핸들러
    function handleTypeClick(type: "나눔" | "대여") {
      setSelectedType(type); // 선택한 타입 저장
      if (type === "대여") {
        setIsRental(true);
      } else if (type === "나눔") {
        setIsRental(false);
      }
    }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // 선택한 카테고리를 저장
  };

  const openCategory = (): void => {
    setCategoryOpen(true);
  };

  const closeCategory = (): void => {
    setCategoryOpen(false);
  };

  // textarea의 내용이 변경될 때 상태를 업데이트하는 핸들러
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaContent(e.target.value);
  };

 // 이미지 업로드 핸들러
function uploadFile(e: ChangeEvent<HTMLInputElement>): void {
  const fileArr = e.target.files;
  if (fileArr) {
    let files = Array.from(fileArr);
    
    // 최대 파일 수 초과 처리
    if (files.length + postImg.length > maxFiles) {
      files = files.slice(0, maxFiles - postImg.length);
    }

    setPostImg((prev) => [...prev, ...files]);

    // 파일 읽기를 Promise로 처리하여 모든 파일을 읽은 후 상태 업데이트
    const fileReadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });
    });

    // 모든 파일이 읽힌 후에 미리보기 이미지 상태를 업데이트
    Promise.all(fileReadPromises).then((fileURLs) => {
      setPreviewImg((prev) => [...prev, ...fileURLs]);
    });
  }
}

  // 이미지 삭제 핸들러
  function removeImage(index: number): void {
    // index에 해당하는 이미지를 삭제
    setPostImg((prev) => prev.filter((_, i) => i !== index));
    setPreviewImg((prev) => prev.filter((_, i) => i !== index));
  }

  // input 요소에 접근하기 위해 useRef 사용
  const fileInputRef = useRef<HTMLInputElement>(null);
  // div 클릭 시 파일 선택 창 열기
  function openFileSelector() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }




  // 입력 값 변경 처리 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    if (inputValue.length <= maxCharacters) {
      setTitleContent(inputValue);
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  // category: ItemCategory;
  // shareType: string;
  // rentalStartDate?: string;
  // rentalEndDate?: string;
  // title: string;
  // content: string;
  // images: File[];

  const createArticleClick = async () => {
    // 게시글 생성 요청
    const req :ArticleCreateRequest = {
      category: selectedCategory as ItemCategory,
      shareType: selectedType === "대여" ? "RENTAL" : "DONATION",  
      rentalStartDate: isRental ? rentalStartDate : undefined,
      rentalEndDate: isRental ? rentalEndDate : undefined,
      title: titleContent,
      content: textareaContent,
      images: postImg

    };
    const model = await createArticle(req);
    navigate(`/article/${model.articleId}`);

  }



  return (
    <div className="w-full h-full p-[20px]">
      <header className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>
          <img src={chevronright} alt="back" />
        </button>

        <button className={styles.closeButton} onClick={navigateHome}>
          <img src={close} alt="close" />
        </button>
      </header>

      <div className={styles.uploadContainer}>
        <div className={styles.uploadSection}>
          <div className={styles.filePreviewContainer}>
            {/* div를 클릭하면 파일 선택 창이 열리도록 설정 */}
            <div onClick={openFileSelector} className={styles.cameraContainer}>
              {/* 카메라 아이콘을 사용한 커스터마이즈된 파일 업로드 버튼 */}
              <img src={camera} className={styles.cameraIcon} />
              {/* 파일 업로드 input, 이 input은 안 보이게 함 */}
              <label className={styles.cameraLabel}>
                {postImg.length}/{maxFiles}
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={uploadFile}
                className={styles.hiddenFileInput} // 숨겨진 파일 입력 필드
                disabled={postImg.length >= maxFiles} // 파일이 5개 이상일 경우 업로드 비활성화
              />
            </div>

            <div className={styles.previewContainer}>
              <div className={styles.previewWrapper}>
                {previewImg.map((img, index) => (
                  <div key={index} className={styles.previewItem}>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeImage(index)}
                    >
                      <img src={del} alt="delete" />
                    </button>
                    <img
                      src={img}
                      alt={`preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chevronright}>
          <ChevronRight size={28} />
        </div>
      </div>

      <section className={styles.section}>
<div className={styles.typeContainer}>
      <hr className={styles.line}></hr>
      <label>나눔 유형</label>
      <div className={styles.typeButtonContainer}>
        <TypeButton
          label="나눔"
          isSelected={selectedType === "나눔"}
          onClick={() => handleTypeClick("나눔")}
        />
        <TypeButton
          label="대여"
          isSelected={selectedType === "대여"}
          onClick={() => handleTypeClick("대여")}
        />
      </div>
      {/* Show date inputs if rental is selected */}
      {isRental && (
        <div className={styles.dateContainer}>
          <input type="date"
           placeholder="YYYY/MM/DD" 
           value={rentalStartDate}
           onChange={handleStartDateChange} 
           />
          <span> - </span>
          <input type="date" 
          placeholder="YYYY/MM/DD" 
          value={rentalEndDate}
          onChange={handleEndDateChange} 
          />
        </div>
      )}
    </div>

        <hr className={styles.line}></hr>

        <div className={styles.categoryContainer}>
          <label>카테고리</label>
          <button className={styles.categoryButton} onClick={openCategory}>
            <label>{selectedCategory}</label>
            <ChevronDown size={20} className={styles.chevronDown} />
          </button>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.contentContainer}>
          <label>제목</label>
          <div className={styles.inputTitleWrapper}>
            <input
              type="text"
              className={styles.titleInput}
              value={titleContent}
              onChange={handleInputChange}
            />
            <span
              className={styles.charCount}
            >{`${titleContent.length}/${maxCharacters}`}</span>
          </div>
          <label>본문</label>
          <textarea className={styles.contentInput}  
          value={textareaContent}
        onChange={handleTextareaChange} />
        </div>
      </section>
      {/* 모달 열릴 때 ArticleCategory 컴포넌트 표시 */}
      {isCategoryOpen &&
      ( <ArticleCategory 
        closeCategory={closeCategory}      
        onCategorySelect={handleCategorySelect} />)}

      <footer>
        <button 
        className={styles.uploadButton}
        onClick={createArticleClick}
        >등록하기</button>
      </footer>
    </div>
  );
}

interface TypeButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TypeButton({ label, isSelected, onClick }: TypeButtonProps) {
  return (
    <button
      className={`${styles.typeButton} ${
        isSelected ? styles.activeButton : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// function convertFilesToBase64(postImg: File[]): File[] | PromiseLike<File[]> {
//   throw new Error("Function not implemented.");
// }


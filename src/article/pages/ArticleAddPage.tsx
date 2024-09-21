import React, { ChangeEvent, useState, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Section } from "lucide-react";
import { useUser } from "@/user/hooks/useUser";
import styles from "./ArticleAddPage.module.css";
import profile from "@/assets/profile.png";
import chevronright from "@/assets/chevron-right.svg";
import close from "@/assets/close.svg";
import del from "@/assets/delete.svg";
import camera from "@/assets/camera.svg";

export default function ArticleAddPage() {
  const [postImg, setPostImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const maxFiles = 5;

  //이미지 업로드 핸들러
  function uploadFile(e: ChangeEvent<HTMLInputElement>): void {
    const fileArr = e.target.files;
    if (fileArr) {
      let files = Array.from(fileArr);
      if (files.length + postImg.length > maxFiles) {
        files = files.slice(0, maxFiles - postImg.length);
      }

      setPostImg((prev) => [...prev, ...files]);

      const fileURL: string[] = [];
      files.forEach((file, i) => {
        const fileRead = new FileReader();
        fileRead.onload = function () {
          fileURL[i] = fileRead.result as string;
          // 모든 파일 읽기가 완료된 후 미리보기 이미지 업데이트
          setPreviewImg((prev) => [...prev, ...fileURL]);
        };
        fileRead.readAsDataURL(file);
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

  const [selectedType, setSelectedType] = useState<"나눔" | "대여" | null>(null);

  // 타입 버튼 클릭 핸들러
  function handleTypeClick(type: "나눔" | "대여") {
    setSelectedType(type);  // 선택한 타입 저장
  }

  return (
    <div className="w-full h-full p-[20px]">
      <header className={styles.header}>
        <button className={styles.backButton}>
          <img src={chevronright} alt="back" />
        </button>

        <button className={styles.closeButton}>
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
          <ChevronRight size={28}/>
            </div>
    </div>


    <section className={styles.section}>

    <div className={styles.typeContainer}>
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
    </div>


    <div className={styles.categoryContainer}>
    <label>카테고리</label>
    <button className={styles.categoryButton}>
    <label>카테고리 선택</label>
    <ChevronDown size={20}/>
    </button>
    </div>

    <div className={styles.contentContainer}>         
    <label>제목</label>
    <input className={styles.titleInput}  />
    
    <label>본문</label>
    <textarea className={styles.contentInput} />
     </div>
      </section>

      <footer>
        <button className={styles.uploadButton}>
          등록하기
        </button>
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
    className={`${styles.typeButton} ${isSelected ? styles.activeButton : ""}`}
    onClick={onClick}
  >
      {label}
    </button>
  );
}
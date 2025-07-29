import { useRef, useState, useEffect } from "react";

interface BusinessDocumentUploadProps {
  className?: string;
  onUploaded?: (url: string) => void;
  initialDocument?: string;
}

function BusinessDocumentUpload({
  className = "",
  onUploaded,
  initialDocument,
}: BusinessDocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialDocument || null);

  // initialDocument가 변경되면 preview 업데이트
  useEffect(() => {
    setPreview(initialDocument || null);
  }, [initialDocument]);

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB 제한 체크
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert("파일 크기는 최대 10MB까지 가능합니다.");
      return;
    }

    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const documentUrl = URL.createObjectURL(file);
    setPreview(documentUrl);
    onUploaded?.(documentUrl);
  };

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={handleBoxClick}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview ? (
        <img
          src={preview}
          alt="사업자등록증 미리보기"
          className="w-full h-full object-cover rounded-[12px]"
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-body2 text-ct-gray-300 mb-[8px]">
            불러오기
          </span>
          <img src="/public/assets/setting/plus.svg" alt="파일 추가" />
        </div>
      )}
    </div>
  );
}

export default BusinessDocumentUpload;
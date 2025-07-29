import { useRef, useState, useEffect } from "react";

interface ImageUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onUploaded?: (url: string) => void;
  initialImage?: string; // 외부에서 전달받은 초기 이미지
}

function ImageUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  onUploaded,
  initialImage,
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  
  // initialImage가 변경되면 preview 업데이트
  useEffect(() => {
    setPreview(initialImage || null);
  }, [initialImage]);
  
  const handleBoxClick = () => {
    if (!disabled) inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
    // 로컬 미리보기 URL을 부모 컴포넌트에 전달
    onUploaded?.(imgUrl);
  };

  return (
    <div
      className={`ct-center flex-col whitespace-pre-line ${
        disabled ? `cursor-not-allowed` : `cursor-pointer`
      } ${className}`}
      onClick={handleBoxClick}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-full object-cover rounded-[8px]"
        />
      ) : (
        <>
          <img
            src="/public/assets/common/pluswhite.svg"
            alt="사진 추가 아이콘"
          />
          <div
            className={`mt-[9.29px] text-center leading-normal ${textClassName}`}
          >
            클릭하여 사진을
            <br />
            추가해보세요!
          </div>
        </>
      )}
    </div>
  );
}
export default ImageUploadBox;

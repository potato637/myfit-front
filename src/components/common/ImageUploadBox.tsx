import { useRef, useState } from "react";

interface ImageUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onUploaded?: (url: string) => void;
}

function ImageUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  onUploaded,
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleBoxClick = () => {
    if (!disabled) inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
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

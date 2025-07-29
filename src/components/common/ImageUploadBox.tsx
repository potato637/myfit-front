import { useRef, useState, useEffect } from "react";

interface ImageUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  initialPreview?: string | null;
  onFileSelected?: (base64: string) => void;
}

function ImageUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  initialPreview,
  onFileSelected,
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  const handleBoxClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onFileSelected?.(base64);
    };
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

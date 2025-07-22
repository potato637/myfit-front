import { useRef, useState } from "react";

interface VerfiedUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

function VerfiedUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
}: VerfiedUploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const handleBoxClick = () => {
    if (!disabled) inputref.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
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
        ref={inputref}
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
          <div className={`text-center leading-normal ${textClassName}`}>
            불러오기
          </div>
          <img
            src="/assets/setting/plus.svg"
            alt="plus"
            className="mt-[10px] w-[24px] h-[24px]"
          />
        </>
      )}
    </div>
  );
}
export default VerfiedUploadBox;

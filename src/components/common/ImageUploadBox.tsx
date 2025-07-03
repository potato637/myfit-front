interface ImageUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function ImageUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  onClick,
}: ImageUploadBoxProps) {
  return (
    <div
      className={`ct-center flex-col whitespace-pre-line ${
        disabled ? `cursor-not-allowed` : `cursor-pointer`
      } ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="w-[27px] h-[27px] ct-center bg-ct-white rounded-full text-[24px] text-gray-100">
        +
      </div>
      <div
        className={`mt-[9.29px] text-center leading-normal ${textClassName}`}
      >
        클릭하여 사진을
        <br />
        추가해보세요!
      </div>
    </div>
  );
}
export default ImageUploadBox;

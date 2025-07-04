interface VerfiedUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function VerfiedUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  onClick,
}: VerfiedUploadBoxProps) {
  return (
    <div
      className={`ct-center flex-col whitespace-pre-line ${
        disabled ? `cursor-not-allowed` : `cursor-pointer`
      } ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className={`text-center leading-normal ${textClassName}`}>
        불러오기
      </div>
      <div className="mt-[10px] w-[24px] h-[24px] ct-center bg-ct-white rounded-full text-[24px] text-[#0074ff]">
        +
      </div>
    </div>
  );
}
export default VerfiedUploadBox;

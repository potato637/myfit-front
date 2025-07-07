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
      <img
        src="/assets/setting/plus.svg"
        alt="plus"
        className="mt-[10px] w-[24px] h-[24px]"
      />
    </div>
  );
}
export default VerfiedUploadBox;

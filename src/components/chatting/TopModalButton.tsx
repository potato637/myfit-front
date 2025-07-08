interface TopModalButtonProps {
  label: string;
  color?: "white" | "blue";
  onClick?: () => void;
}

function TopModalButton({
  label,
  color = "white",
  onClick,
}: TopModalButtonProps) {
  const styleMap = {
    white: "bg-ct-white text-ct-black-200",
    blue: " bg-ct-main-blue-200 text-ct-white",
  };
  return (
    <div>
      <button
        className={`mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 ${styleMap[color]}`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
export default TopModalButton;

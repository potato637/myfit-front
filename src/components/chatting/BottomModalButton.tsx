interface BottomModalButtonProps {
  label: string;
  onClick?: () => void;
}

function BottomModalButton({ label, onClick }: BottomModalButtonProps) {
  return (
    <div>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
export default BottomModalButton;

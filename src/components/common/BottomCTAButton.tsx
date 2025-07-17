interface BottomCTAButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit"; // 🔥 추가
}

function BottomCTAButton({
  text,
  onClick,
  disabled = false,
  type = "button", // 🔥 기본값 설정
}: BottomCTAButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type} // 🔥 여기에 반영
      className={`w-full mb-[42px] h-[62px] rounded-[10px] font-sans text-h2 text-ct-white
        ${disabled ? "bg-ct-gray-200" : "bg-ct-main-blue-100"}
      `}
    >
      {text}
    </button>
  );
}

export default BottomCTAButton;

// button 컴포넌트는 BottomCTAButton.tsx로 분리되어 있습니다.
// 이 컴포넌트는 BottomCTAButtonProps 인터페이스를 사용하여
// 버튼의 텍스트, 클릭 이벤트 핸들러, 비활성화 상태를 관리합니다.
// 버튼은 기본적으로 전체 너비를 차지하며, 높이는 62px로 설정되어 있습니다.
// 비활성화 상태일 경우 회색 배경을 사용하고, 활성화 상태일 경우
// 주 색상인 파란색 배경을 사용합니다.

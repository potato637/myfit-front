interface BottomCTAButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

function BottomCTAButton({
  text,
  onClick,
  disabled = false,
}: BottomCTAButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[328px] h-[62px] rounded-[10px] font-sans text-h2 text-ct-white
        ${disabled ? "bg-ct-gray-200" : "bg-ct-main-blue-100"}
      `}
    >
      {text}
    </button>
  );
}

export default BottomCTAButton;

// ✅ BottomCTAButton 사용 방법
// 이 버튼은 화면 하단에 고정된 CTA(Call To Action) 영역에 사용됩니다.
// 일반적으로 폭은 고정되어 있으며, 텍스트와 클릭 핸들러, 비활성화 상태를 prop으로 받습니다.
//
// 사용 예시:
// <BottomCTAButton text="다음 단계로 이동" onClick={handleNextStep} disabled={false} />
//
// ❗ disabled가 true일 경우 회색 버튼으로 비활성화됩니다.
// ❗ navigate 또는 비즈니스 로직은 onClick 핸들러에 래핑하여 전달합니다.
// 📏 디자인 기준 하단 여백(margin-bottom)은 42px입니다.

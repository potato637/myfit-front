import { useModal } from "../../contexts/ui/modalContext";

function LandingModal() {
  const { closeModal } = useModal();

  return (
    <div className="p-[15px] flex flex-col items-center gap-[15px]">
      <span>'홈 화면 추가'를 권장드립니다!</span>
      <img
        src="assets/icon/icon.svg"
        alt="icon"
        className="w-[64px] h-[64px]"
      />
      <span className="whitespace-pre-line text-center">
        {
          "웹사이트를 앱처럼 사용해보세요!\n빠른 실행, 오프라인 지원, 알림 기능 제공 등 \n더 편리한 경험이 될거에요!"
        }
      </span>
      <hr className="w-full my-4" />
      <div className="ct-center flex-col">
        <span className="text-h2 mb-2">{"[ 안드로이드 버전 ]"}</span>
        <span>Chrome 우측 상단 세 점 아이콘 클릭</span>
        <span>{"→ '홈 화면에 추가' 또는 '앱 설치'"}</span>
      </div>
      <div className="ct-center flex-col">
        <span className="text-h2 mb-2">{"[ iOS 버전 ]"}</span>
        <span>Safari 에서 공유 아이콘 클릭</span>
        <span>{"→ '홈 화면에 추가'"}</span>
      </div>
      <button
        className="w-[95%] p-[10px] bg-ct-main-blue-100 text-ct-white rounded-[10px] text-h2 mt-[15px]"
        onClick={() => closeModal()}
      >
        확인했어요!
      </button>
    </div>
  );
}

export default LandingModal;

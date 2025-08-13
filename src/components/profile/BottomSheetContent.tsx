import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBottomSheet } from "../../contexts/ui/bottomSheetContext";
import { useModal } from "../../contexts/ui/modalContext";
import { useItemContext } from "../../contexts/ItemContext";
import ModalContent from "./ModalContent";

function BottomSheetContent({ type }: { type: "feed" | "card" }) {
  const navigate = useNavigate();
  const { setIsBottomSheetOpen } = useBottomSheet();
  const { openModal } = useModal();
  const { itemId } = useItemContext();
  const [how, setHow] = useState<"see" | "hide">("see");

  const handleEdit = () => {
    setIsBottomSheetOpen(false);
    navigate(`/feed/edit/${itemId}`);
  };

  return (
    <div className="w-full h-auto bg-ct-white ct-center flex-col gap-[15px]">
      <div className="w-[265px] flex flex-col items-start gap-[15px]">
        <span className="text-h1 text-ct-black-300">
          {type === "feed" ? "피드 관리" : "카드 관리"}
        </span>
        <p className="text-sub2 text-ct-gray-300">
          프로필에 표시할 {type === "feed" ? "피드" : "카드"}를 자유롭게
          숨기거나 보여줄 수 있어요.
        </p>
      </div>
      <div
        className={`flex items-center w-full h-[60px] px-[9px] py-[13px] bg-ct-white rounded-[10px] border-[1px] border-ct-gray-200 ${
          how === "see" ? "border-ct-main-blue-100" : ""
        }`}
        onClick={() => setHow("see")}
      >
        <img
          src={`${
            how === "see"
              ? "/assets/profile/seeSelect.svg"
              : "/assets/profile/see.svg"
          }`}
          alt="보이기"
          className="w-[34px] h-[34px]"
        />
        <span className="text-sub2 text-ct-black-200 ml-[14px]">보이기</span>
      </div>
      <div
        className={`flex items-center w-full h-[60px] px-[9px] py-[13px] bg-ct-white rounded-[10px] border-[1px] border-ct-gray-200 ${
          how === "hide" ? "border-ct-main-blue-100" : ""
        }`}
        onClick={() => setHow("hide")}
      >
        <img
          src={`${
            how === "hide"
              ? "/assets/profile/hideSelect.svg"
              : "/assets/profile/hide.svg"
          }`}
          alt="숨기기"
          className="w-[34px] h-[34px]"
        />
        <span className="text-sub2 text-ct-black-200 ml-[14px]">숨기기</span>
      </div>
      <div className="w-full flex justify-between gap-[15px]">
        <div
          className="bg-ct-light-blue-100 flex-1 h-[46px] rounded-[10px] ct-center cursor-pointer hover:bg-ct-light-blue-200 transition-colors"
          onClick={handleEdit}
        >
          <span className="text-sub2 text-ct-sub-blue-300">수정하기</span>
        </div>
        <div className="bg-ct-main-blue-100 flex-1 h-[46px] rounded-[10px] ct-center">
          <span className="text-sub2 text-ct-white">저장하기</span>
        </div>
      </div>
      <div
        onClick={() => {
          setIsBottomSheetOpen(false);
          openModal(<ModalContent type="feed" />);
        }}
      >
        <span className="text-ct-gray-400 text-sub2 border-b-[1px] border-ct-gray-400">
          {type === "feed" ? "피드 삭제" : "카드 삭제"}
        </span>
      </div>
    </div>
  );
}

export default BottomSheetContent;

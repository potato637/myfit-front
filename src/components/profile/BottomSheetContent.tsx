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
  const [how, setHow] = useState<"edit" | "delete">("edit");

  const handleSave = () => {
    if (how === "edit") {
      setIsBottomSheetOpen(false);
      navigate(`/feed/edit/${itemId}`);
    } else {
      setIsBottomSheetOpen(false);
      if (type === "feed") {
        openModal(<ModalContent type="feed" />);
      } else {
        openModal(<ModalContent type="card" />);
      }
    }
  };

  return (
    <div className="w-full h-auto bg-ct-white ct-center flex-col gap-[15px]">
      <div className="w-full flex flex-col items-start gap-[15px]">
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
          how === "edit" ? "border-ct-main-blue-100" : ""
        }`}
        onClick={() => setHow("edit")}
      >
        <img
          src={`${
            how === "edit"
              ? "/assets/profile/seeSelect.svg"
              : "/assets/profile/see.svg"
          }`}
          alt="보이기"
          className="w-[34px] h-[34px]"
        />
        <span className="text-sub2 text-ct-black-200 ml-[14px]">
          {type === "feed" ? "피드 수정" : "카드 수정"}
        </span>
      </div>
      <div
        className={`flex items-center w-full h-[60px] px-[9px] py-[13px] bg-ct-white rounded-[10px] border-[1px] border-ct-gray-200 ${
          how === "delete" ? "border-ct-main-blue-100" : ""
        }`}
        onClick={() => setHow("delete")}
      >
        <img
          src={`${
            how === "delete"
              ? "/assets/profile/hideSelect.svg"
              : "/assets/profile/hide.svg"
          }`}
          alt="숨기기"
          className="w-[34px] h-[34px]"
        />
        <span className="text-sub2 text-ct-black-200 ml-[14px]">
          {type === "feed" ? "피드 삭제" : "카드 삭제"}
        </span>
      </div>
      <div className="w-full flex justify-between gap-[15px]">
        <div
          className="bg-ct-light-blue-100 flex-1 h-[46px] rounded-[10px] ct-center cursor-pointer hover:bg-ct-light-blue-200 transition-colors"
          onClick={() => setIsBottomSheetOpen(false)}
        >
          <span className="text-sub2 text-ct-sub-blue-300">취소</span>
        </div>
        <div
          className="bg-ct-main-blue-100 flex-1 h-[46px] rounded-[10px] ct-center"
          onClick={handleSave}
        >
          <span className="text-sub2 text-ct-white">저장</span>
        </div>
      </div>
    </div>
  );
}

export default BottomSheetContent;

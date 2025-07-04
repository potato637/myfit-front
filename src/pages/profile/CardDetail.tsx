import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailCardItem from "../../components/profile/DetailCardItem";
import TopBarContainer from "../../components/common/TopBarContainer";
import Modal from "../../components/ui/Modal";
import BottomSheet from "../../components/ui/BottomSheet";
import { useState } from "react";
import BottomSheetContent from "../../components/profile/BottomSheetContent";
import ModalContent from "../../components/profile/ModalContent";

const TopBarContent = () => {
  return (
    <img
      src="/assets/common/headerLogo.svg"
      alt="로고"
      className="w-[68px] h-[30px]"
    />
  );
};

function CardDetail() {
  const createList = Array.from({ length: 10 }, (_, i) => i + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
        <DetailIntroduction />
        {createList.map((_, index) => (
          <DetailCardItem
            key={index}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} setIsOpen={setIsBottomSheetOpen}>
        <BottomSheetContent />
      </BottomSheet>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <ModalContent />
      </Modal>
    </TopBarContainer>
  );
}

export default CardDetail;

import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailCardItem from "../../components/profile/DetailCardItem";
import TopBarContainer from "../../components/common/TopBarContainer";

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

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
        <DetailIntroduction />
        {createList.map((_, index) => (
          <DetailCardItem key={index} />
        ))}
      </div>
    </TopBarContainer>
  );
}

export default CardDetail;

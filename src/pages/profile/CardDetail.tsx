import TopBar from "../../components/common/TopBar";
import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailCardItem from "../../components/profile/DetailCardItem";

function CardDetail() {
  const createList = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
      <TopBar>
        <img
          src="/assets/common/headerLogo.svg"
          alt="로고"
          className="w-[68px] h-[30px]"
        />
      </TopBar>
      <DetailIntroduction />
      {createList.map((_, index) => (
        <DetailCardItem key={index} />
      ))}
    </div>
  );
}

export default CardDetail;

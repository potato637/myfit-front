import TopBar from "../../components/common/TopBar";

function CardDetail() {
  return (
    <div className="w-full h-full">
      <TopBar>
        <img
          src="/assets/common/headerLogo.svg"
          alt="로고"
          className="w-[68px] h-[30px]"
        />
      </TopBar>
    </div>
  );
}

export default CardDetail;

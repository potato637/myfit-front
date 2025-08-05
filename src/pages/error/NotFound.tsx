import TopBarContainer from "../../components/common/TopBarContainer";

function NotFound() {
  return (
    <TopBarContainer>
      <div className="w-full h-[calc(100vh-42px)] flex items-center justify-center flex-col">
        <h1 className="text-h1 text-ct-black-300">Page Not Found</h1>
        <img src="/assets/error/404-error.svg" alt="404" />
        <span className="text-sub2 text-ct-black-300">
          일시적인 오류가 발생하였습니다.
        </span>
        <span className="text-sub2 text-ct-black-300">
          잠시 후 다시 시도해주세요!
        </span>
      </div>
    </TopBarContainer>
  );
}

export default NotFound;

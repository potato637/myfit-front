import TopBarContainer from "../../components/common/TopBarContainer";

function ProfilePreview() {
  const TopBarContent = () => (
    <span className="text-h2 font-sans text-ct-black-300">미리보기</span>
  );
  const tags = ["캠페인 기획", "SNS 콘텐츠 운영", "성과 분석 및 리포팅"];
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[12px] right-0 flex items-center gap-[6px]">
          <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/public/assets/onboarding/step2.svg" alt="현재 스텝 2" />
        </div>

        {/* 카드 미리보기 */}
        <div className="flex justify-center mt-[30px]">
          <div className="w-[302px] h-[541px]  rounded-[16px] shadow-md p-[18px] border border-ct-gray-100">
            <h2 className="text-h2 text-ct-black-300 w-full mb-[12px]">
              퍼포먼스 마케터
            </h2>
            <div className="flex flex-wrap gap-[6px] mb-[12px] w-full">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="ct-center text-[11px] text-[#3C89F3] bg-ct-gray-100 px-[8px] py-[2px] rounded-[6px]"
                >
                  {tag}
                </span>
              ))}
            </div>{" "}
            <div className="w-full h-[300px] bg-ct-gray-100 rounded-[10px] mb-[12px] flex justify-center items-center">
              <span className="text-body2 text-ct-gray-300">이미지 영역</span>
            </div>
            <div className="w-full min-h-[83px] bg-[#F5F7F6] rounded-[10px] p-[12px]">
              <p className="text-body1 text-ct-gray-300">
                (카드에 대한 한줄 소개 노출)
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-body2 text-ct-gray-300 mt-[20px] mb-[42px]">
          추후 마이페이지에서 카드에 대한 수정이 가능합니다.
        </p>
      </div>
    </TopBarContainer>
  );
}

export default ProfilePreview;

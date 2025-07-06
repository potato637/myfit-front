import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";

function CompanyCardRegister() {
  const TopBarContent = () => {
    return <span className="text-h2 font-sans text-ct-black-300">프로필</span>;
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[8px] right-0 flex items-center gap-[6px]">
          {/* 스텝 아이콘 */}
          <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/public/assets/onboarding/step2.svg" alt="현재 스텝 2" />
          <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
        </div>
        <div className="flex flex-col mt-[25px] mb-[31px]">
          {/* 안내 텍스트 */}
          <p className="text-sub2 text-ct-gray-300  mb-[17px]">
            첫 카드는 회사나 팀을 잘 나타낼 수 있는 <br />
            내용이면 좋아요!
          </p>
          <ImageUploadBox
            className="w-full h-[407.5px] rounded-[5px] bg-ct-gray-100 "
            textClassName="text-body2 font-Pretendard text-ct-gray-300"
          />
        </div>
        <InputField
          label="한줄 소개"
          placeholder="50자 이내"
          helperText={
            <span>
              카드 요약 화면에서 사진과 함께 노출됩니다. 해당 사진에 대한 한{" "}
              <br />
              줄소개를 50자 이내로 작성해주세요!
            </span>
          }
        />{" "}
        <InputField
          label="상세 설명"
          placeholder="300자 이내"
          helperText={
            <span>
              카드 클릭 시 상세 설명이 표시됩니다. <br />
              300자 이내로 내용을 입력해주세요!
            </span>
          }
        />{" "}
        <InputField
          label="링크(선택)"
          helperText={
            <span>
              해당 카드에 대한 웹사이트 혹은 노션과 같은 링크가 있다면 <br />
              작성해주세요!!
            </span>
          }
        />
        <div className="flex flex-col items-start  mb-[24px]">
          <label className="pl-[7px] text-sub1 text-ct-black-200  mb-[8px] block">
            키워드
          </label>

          <button
            type="button"
            className="min-w-[50px] min-h-[36px] rounded-[10px] bg-ct-gray-100 text-ct-gray-200 text-[24px] ct-center mb-[9px]"
          >
            +
          </button>
          <span className="text-ct-gray-300 text-body2">
            카드에 대한 키워드를 입력해주세요! 최대 5개까지 <br />
            추가가 가능합니다.
          </span>
        </div>
        <button
          type="button"
          className="text-center text-sub1 text-ct-gray-300 my-[24px]"
        >
          미리보기
        </button>
        <div className="flex justify-center mb-[42px]">
          <BottomCTAButton text="다음 단계로 이동" />
        </div>
      </div>
    </TopBarContainer>
  );
}
export default CompanyCardRegister;

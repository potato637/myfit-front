import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBar from "../../components/common/TopBar";
import InputField from "../../components/recruiting/InputField";

function RegisterAnnouncement() {
  return (
    <>
      <TopBar>
        <span className="text-h2 font-Pretendard text-ct-black-300">
          공고 등록
        </span>
      </TopBar>
      <div className="flex flex-col pt-[90px] mx-[19px]">
        <InputField label="공고 제목" placeholder="입력해주세요" />
        <InputField label="구인 직무" placeholder="입력해주세요" />
        <InputField
          label="근무 지역"
          placeholder="추후 드롭다운 박스로 구현 예정"
        />
        <InputField label="지원 조건" placeholder="입력해주세요" />
        <InputField label="급여" placeholder="추후 드롭다운 박스로 구현 예정" />
        <InputField label="근무 형태" placeholder="선택" />
        <InputField
          label="마감 일자"
          placeholder="추후 드롭다운 박스로 구현 예정"
        />
        <div className="flex flex-col gap-[13.15px] mt-[25px]">
          <span className="pl-[7px] text-sub1 text-ct-black-200 font-Pretendard">
            공고사진 첨부
          </span>
          <ImageUploadBox
            className="w-[349px] h-[384px] rounded-[16px] bg-ct-gray-100"
            textClassName="text-body2 font-Pretendard text-ct-gray-300"
          />
        </div>
        <span className="mt-[25px] mb-[23.29px] text-body1 text-ct-gray-300 ">
          등록된 공고는 ‘마이페이지’, ‘공고 관리’ 탭에서 확인 가능합니다.
        </span>
        <div className="flex justify-center mb-[42px]">
          <BottomCTAButton text="공고 등록하기" />
        </div>
      </div>
    </>
  );
}
export default RegisterAnnouncement;

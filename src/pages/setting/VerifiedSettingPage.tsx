import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import VerfiedUploadBox from "../../components/setting/VerifiedUploadBox";

function VerifiedSettingPage() {
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">
        회사 인증 (선택)
      </span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col h-full mt-[19px] px-[25.26px]">
        <span className="text-sub1 text-ct-black-100 font-Pretendard">
          사업자 등록증 첨부
        </span>
        <span className="mt-[52.89px] text-body1 text-[#797979] font-Pretendard">
          파일은 최대 10MB까지 가능합니다.
        </span>
        <VerfiedUploadBox
          className="mt-[21px] w-[334px] h-[107px] rounded-[10px] bg-[#D9D9D9]"
          textClassName="text-body2 text-[#797979] font-Pretendard"
        />
        <div className="mt-[20px] h-[102px] text-body1 font-Pretendard text-ct-gray-300">
          사업자 등록 인증 시, 프로필에 인증 뱃지가 표시되어 신뢰도가
          높아집니다. 인증은 1~2 영업일 내 완료되며 결과는 이메일로
          안내드립니다. 제출 서류는 인증 외 용도로 사용되지 않습니다.
          <br />
          <br />
          *사업자 등록 인증을 위해서는 프로필 상 ‘회사 명’ 및 ‘업종’이 사업자
          등록증 정보와 일치 해야 합니다!
        </div>
        <div className="mt-[194.32px] flex flex-col gap-[5px]">
          <BottomCTAButton text="제출하고 완료하기" disabled={true} />
          <BottomCTAButton text="건너뛰기" />
        </div>
      </div>
    </TopBarContainer>
  );
}
export default VerifiedSettingPage;

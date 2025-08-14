import { useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import VerifiedUploadBox from "../../components/common/VerifiedUploadBox";
import { useNavigate } from "react-router-dom";
import { useBusinessLicenseMutation } from "../../apis/onboarding";
import { toast } from "react-toastify";

function CompanyVerification() {
  const navigate = useNavigate();
  const [businessDocument, setBusinessDocument] = useState<string>(""); // 사업자등록증 이미지
  const { mutate: submitLicense } = useBusinessLicenseMutation();

  const handleSubmit = () => {
    if (!businessDocument) return;
    submitLicense(
      { inc_AuthN_file: businessDocument },
      {
        onSuccess: () => {
          toast.success("사업자 등록증 등록에 성공하였습니다");
        },
        onError: () => {
          toast.error("사업자 등록증 등록에 실패하였습니다.");
        },
      }
    );
    navigate("/feed");
  };

  const handleSkip = () => {
    // 건너뛰기 후 피드 페이지로 이동 (이미지 없이)
    navigate("/feed");
  };

  const TopBarContent = () => (
    <span className="text-h2 font-sans text-ct-black-300">회사인증(선택)</span>
  );

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      {/* 전체 화면을 column flex로 구성 */}
      <div className="flex flex-col  pt-[24px] mx-[22px] border-t border-ct-gray-200 relative ">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[12px] right-0 flex items-center gap-[6px]">
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/assets/onboarding/step3.svg" alt="현재 스텝 3" />
        </div>
        {/* ✅ 사업자 등록증 첨부 */}
        <div className="flex flex-col mt-[38px]">
          <p className="text-sub1 text-ct-black-200 mb-[53px]">
            사업자 등록증 첨부
          </p>
          <p className="text-body2 text-ct-gray-300 mb-[21px]">
            파일은 최대 10MB까지 가능합니다.
          </p>
          <VerifiedUploadBox
            className="w-full min-h-[132px] rounded-[12px] bg-ct-gray-100 mb-[20px]"
            textClassName="text-body2 text-ct-gray-300"
            onUploadSuccess={(url) => setBusinessDocument(url)}
          />
          <div className="space-y-[8px] text-body2 text-ct-gray-300 leading-[150%] mb-[137px]">
            <p>
              사업자 등록 인증 시, 프로필에 인증 배지가 표시되어 신뢰도가
              높아집니다. 인증은 1~2 영업일 내 완료되며 결과는 이메일로
              안내드립니다. 제출 서류는 인증 외 용도로 사용되지 않습니다.
            </p>
            <p className="font-medium">
              *사업자 등록 인증을 위해서는 프로필 상 ‘회사 명’ 및 ‘업종’이
              사업자 등록증 정보와 일치해야 합니다!
            </p>
          </div>
          {/* 하단 버튼 우회 마진 적용 */}
          <div className="flex flex-col gap-[5px]">
            <div className="-mb-[42px]">
              <BottomCTAButton
                text="제출하고 완료하기"
                onClick={handleSubmit}
                disabled={!businessDocument} // 이미지 첨부 시에만 활성화
              />
            </div>
            <BottomCTAButton text="건너뛰기" onClick={handleSkip} />
          </div>{" "}
        </div>
      </div>
    </TopBarContainer>
  );
}

export default CompanyVerification;

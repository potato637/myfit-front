// components/onboarding/CardPreview.tsx

import OnboardingCardTagContainer from "./OnboardingCardTagContainer";
import OnboardingCompanyLink from "./OnboardingCompanyLink";

interface CompanyCardPreviewProps {
  profileImage: string; // 이제 카드 이미지로 사용
  companyName: string;
  badge: string;
  summary: string;
  description: string;
  link: string;
  keywords?: string[]; // 키워드 배열 추가 (옵셔널)
}

export default function CardPreview({
  profileImage,
  companyName,
  badge,
  summary,
  description,
  link,
  keywords = [], // 기본값 빈 배열
}: CompanyCardPreviewProps) {
  return (
    <div className="w-full h-full bg-ct-white flex flex-col gap-[7px]">
      {/* Header */}
      <div className="w-full h-[61px] flex items-center gap-[7px] bg-ct-white">
        <img
          src="/assets/onboarding/profilepreview.svg"
          alt="프로필 이미지"
        />
        <span className="text-sub1 text-ct-black-100">{companyName}</span>
        <span className="text-sub2 text-ct-main-blue-100">{badge}</span>
      </div>
      {/* Content */}
      <div className="w-full h-auto bg-ct-white flex flex-col gap-[10px] items-center">
        <div className="w-full h-[30px] py-[14px] flex items-center justify-between">
          <span className="text-ct-main-blue-100 text-body1 bg-ct-gray-100 rounded-[5px] ct-center p-2">
            활동 카드 1
          </span>
        </div>

        <div className="w-full h-[442px] bg-ct-gray-100 rounded-[5px] overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="활동 카드 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-ct-gray-300 text-body2">
                이미지를 추가해주세요
              </span>
            </div>
          )}
        </div>

        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">한줄 소개</span>
          <span className="text-body3 text-ct-black-200">{summary}</span>
        </div>

        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">상세 설명</span>
          <span className="text-body3 text-ct-black-200">{description}</span>
        </div>

        <OnboardingCompanyLink link={link} width="w-full" />
        <OnboardingCardTagContainer keywords={keywords} />
      </div>
    </div>
  );
}

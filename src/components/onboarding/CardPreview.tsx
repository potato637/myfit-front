// components/profile/CompanyCardPreview.tsx

import CardTagContainer from "../profile/CardTagContainer";
import CompanyLink from "../profile/CompanyLink";

interface CompanyCardPreviewProps {
  profileImage: string;
  companyName: string;
  badge: string;
  summary: string;
  description: string;
  link: string;
}

export default function CardPreview({
  profileImage,
  companyName,
  badge,
  summary,
  description,
  link,
}: CompanyCardPreviewProps) {
  return (
    <div className="w-full h-full bg-ct-white flex flex-col gap-[7px]">
      {/* Header */}
      <div className="w-full h-[61px] flex items-center gap-[7px] bg-ct-white">
        <img
          src={profileImage}
          alt={`${companyName} 프로필 이미지`}
          className="w-[45px] h-[45px] rounded-full"
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

        <div className="w-full h-[442px] bg-ct-gray-100 rounded-[5px]" />

        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">한줄 소개</span>
          <span className="text-body3 text-ct-black-200">{summary}</span>
        </div>

        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">상세 설명</span>
          <span className="text-body3 text-ct-black-200">{description}</span>
        </div>

        <CompanyLink link={link} />
        <CardTagContainer />
      </div>
    </div>
  );
}

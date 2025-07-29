interface OnboardingCompanyLinkProps {
  link: string;
  width?: string; // width를 옵셔널 props로 추가
}

function OnboardingCompanyLink({ link, width = "w-[335px]" }: OnboardingCompanyLinkProps) {
  if (!link) return null;

  return (
    <div
      className={`${width} h-[28px] flex justify-start items-center gap-2 px-2 bg-ct-gray-100 rounded-[9px]`}
    >
      <img
        src="/assets/profile/link.svg"
        alt="회사 링크"
        className="w-[24px] h-[24px]"
      />
      <span className="text-body1 text-ct-gray-300 truncate">{link}</span>
    </div>
  );
}

export default OnboardingCompanyLink;
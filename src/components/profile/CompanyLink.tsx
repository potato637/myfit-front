interface CompanyLinkProps {
  link: string;
}

function CompanyLink({ link }: CompanyLinkProps) {
  return (
    <div
      className={`w-full h-[24px] flex justify-start items-center gap-2 px-2 bg-ct-gray-100 rounded-[3px]`}
    >
      <img
        src="/assets/profile/link.svg"
        alt="회사 링크"
        className="w-[24px] h-[24px]"
      />
      <span className="text-body1 text-ct-gray-300">{link}</span>
    </div>
  );
}

export default CompanyLink;

interface OnboardingCardTagContainerProps {
  keywords: string[];
}

function OnboardingCardTagContainer({ keywords }: OnboardingCardTagContainerProps) {
  if (keywords.length === 0) return null;

  return (
    <div className="gap-[5px] flex flex-wrap w-full justify-start">
      {keywords.map((keyword, index) => (
        <div key={index} className="px-[12px] h-[28px] flex items-center rounded-[9px] bg-ct-light-blue-100">
          <span className="text-body2 text-ct-main-blue-100"># {keyword}</span>
        </div>
      ))}
    </div>
  );
}

export default OnboardingCardTagContainer;
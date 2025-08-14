import { ReactNode } from "react";

type Props = { children: ReactNode };

function RecruitTopBar({ children }: Props) {
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 bg-ct-white pt-safe h-[calc(118px+env(safe-area-inset-top))]">
      <div className="w-full h-full ct-center">{children}</div>
    </div>
  );
}

export default RecruitTopBar;

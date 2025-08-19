import { ReactNode } from "react";

type Props = { children: ReactNode };

function RecruitTopBar({ children }: Props) {
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 bg-ct-white pt-safe">
      <div className="w-full h-full">{children}</div>
    </div>
  );
}

export default RecruitTopBar;

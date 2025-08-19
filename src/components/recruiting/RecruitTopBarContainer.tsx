// src/components/recruiting/RecruitTopBarContainer.tsx
import { ReactNode } from "react";
import RecruitTopBar from "./RecruitTopBar";

interface Props {
  TopBarContent?: ReactNode;
  children: ReactNode;
}

function RecruitTopBarContainer({ TopBarContent, children }: Props) {
  return (
    <>
      <RecruitTopBar>{TopBarContent}</RecruitTopBar>
      <div className="h-[calc(134px+env(safe-area-inset-top))]" />
      {children}
    </>
  );
}

export default RecruitTopBarContainer;

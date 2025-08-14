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
      {/* 헤더(118px) + safe-area 만큼 스페이서 */}
      <div className="h-[calc(118px+env(safe-area-inset-top))]" />
      {children}
    </>
  );
}

export default RecruitTopBarContainer;

import React from "react";

function CoffeeChatCardSkeleton() {
  return (
    <div
      className="w-[339px] h-[136px] rounded-[7.53px] flex flex-col bg-ct-white border border-[#E2E2E2] pl-[9px] pt-[24px] pb-[20px] animate-pulse pointer-events-none select-none"
      role="status"
      aria-label="Loading coffee chat item"
    >
      <div className="flex gap-[13px] pl-[7px]">
        <div className="w-[49px] h-[49px] rounded-full bg-gray-200" />
        <div className="flex flex-col justify-center gap-[6px]">
          <div className="h-[16px] w-[90px] rounded bg-gray-200" />
          <div className="flex gap-[4px] items-center">
            <div className="h-[18px] w-[140px] rounded bg-gray-200" />
            <div className="h-[18px] w-[64px] rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-[18px] flex items-center gap-[4px] pl-[7px]">
        <div className="w-[16px] h-[16px] rounded bg-gray-200" />
        <div className="h-[16px] w-[140px] rounded bg-gray-200" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default CoffeeChatCardSkeleton;

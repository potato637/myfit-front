import TopBarContainer from "../../components/common/TopBarContainer";
import { useState } from "react";

const TopBarContent = () => {
  return (
    <div className="relative w-full ct-center">
      <span className="text-ct-black-100 text-h1">나의 상태 </span>
      <div className="absolute right-[22px]">
        <span>완료</span>
      </div>
    </div>
  );
};

function ProfileStatus() {
  const [isSelected, setIsSelected] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const handleClick = (index: number) => {
    setIsSelected((prev) => {
      return prev.map((_, idx) => (idx === index ? true : false));
    });
  };

  return (
    <>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="flex flex-col mt-[24px] mx-[17px]">
          <div className="ml-[10px] text-ct-gray-300">
            <span>현재 구인/구직 상태를 알려주세요!</span>
          </div>
          <div className="ct-center mt-[34px] border-[1px] border-ct-gray-100 w-full h-auto divide-y divide-ct-gray-100 rounded-[10px] flex flex-col">
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick(0)}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected[0] ? "text-ct-main-blue-100" : "text-ct-gray-100"
                }`}
              >
                구직 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected[0] ? "bg-ct-main-blue-100" : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick(1)}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected[1] ? "text-ct-main-blue-100" : "text-ct-gray-100"
                }`}
              >
                구인 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected[1] ? "bg-ct-main-blue-100" : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick(2)}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected[2] ? "text-ct-main-blue-100" : "text-ct-gray-100"
                }`}
              >
                구인 협의 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected[2] ? "bg-ct-main-blue-100" : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick(3)}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected[3] ? "text-ct-main-blue-100" : "text-ct-gray-100"
                }`}
              >
                네트워킹 환영
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected[3] ? "bg-ct-main-blue-100" : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick(4)}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected[4] ? "text-ct-main-blue-100" : "text-ct-gray-100"
                }`}
              >
                해당 없음
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected[4] ? "bg-ct-main-blue-100" : "bg-ct-gray-100"
                }`}
              />
            </div>
          </div>
        </div>
      </TopBarContainer>
    </>
  );
}

export default ProfileStatus;

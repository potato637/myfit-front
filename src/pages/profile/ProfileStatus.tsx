import TopBarContainer from "../../components/common/TopBarContainer";
import { useState } from "react";
import { useUpdateProfileStatus } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TopBarContent = ({ onSave }: { onSave: () => void }) => {
  return (
    <div className="relative w-full ct-center">
      <span className="text-ct-black-100 text-h1">나의 상태</span>
      <div className="absolute right-[22px]" onClick={onSave}>
        <span>완료</span>
      </div>
    </div>
  );
};

function ProfileStatus() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<string>("구직 중");
  const { user } = useAuth();
  const { mutate } = useUpdateProfileStatus();

  const handleClick = (status: string) => {
    setIsSelected(status);
  };

  const handleSave = () => {
    mutate({
      recruiting_status: isSelected,
      service_id: user?.id.toString() || "",
    });
    navigate("/mypage");
  };

  return (
    <>
      <TopBarContainer TopBarContent={<TopBarContent onSave={handleSave} />}>
        <div className="flex flex-col mt-[24px] mx-[17px]">
          <div className="ml-[10px] text-ct-gray-300">
            <span>현재 구인/구직 상태를 알려주세요!</span>
          </div>
          <div className="ct-center mt-[34px] border-[1px] border-ct-gray-100 w-full h-auto divide-y divide-ct-gray-100 rounded-[10px] flex flex-col">
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("구직 중")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "구직 중"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                구직 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "구직 중"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("구인 중")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "구인 중"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                구인 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "구인 중"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("구직 협의 중")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "구직 협의 중"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                구직 협의 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "구직 협의 중"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("구인 협의 중")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "구인 협의 중"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                구인 협의 중
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "구인 협의 중"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("네트워킹 환영")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "네트워킹 환영"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                네트워킹 환영
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "네트워킹 환영"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
                }`}
              />
            </div>
            <div
              className="px-[20px] py-[11px] w-full flex justify-between items-center"
              onClick={() => handleClick("해당 없음")}
            >
              <span
                className={`text-ct-gray-200 text-body2 ${
                  isSelected === "해당 없음"
                    ? "text-ct-main-blue-100"
                    : "text-ct-gray-100"
                }`}
              >
                해당 없음
              </span>
              <div
                className={`w-[19px] h-[19px] rounded-full   ${
                  isSelected === "해당 없음"
                    ? "bg-ct-main-blue-100"
                    : "bg-ct-gray-100"
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

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

function TopBar({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-[66px] fixed top-0 left-0 right-0 ct-center bg-ct-white z-10">
      <img
        src="/assets/common/arrow.svg"
        alt="뒤로가기"
        className="absolute left-[19px] w-[28px] h-[28px]"
        onClick={handleClick}
      />
      <div className="w-full h-full ct-center">{children}</div>
    </div>
  );
}

export default TopBar;

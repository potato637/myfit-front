import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  backTo?: string;
  replace?: boolean;
};

function TopBar({ children, backTo, replace = true }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (backTo) {
      navigate(backTo, { replace });
      return;
    }
    navigate(-1);
  };

  return (
    <div className="w-full h-[calc(42px+env(safe-area-inset-top))] fixed top-0 left-0 right-0 ct-center bg-ct-white z-50 pt-safe">
      <img
        src="/assets/common/arrow.svg"
        alt="뒤로가기"
        className="absolute left-[19px] w-[28px] h-[28px] cursor-pointer z-50"
        onClick={handleClick}
      />
      <div className="w-full h-full ct-center">{children}</div>
    </div>
  );
}

export default TopBar;

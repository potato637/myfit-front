interface TopBarProps {
  title: string;
}

function TopBar({ title }: TopBarProps) {
  return (
    <div className="w-full h-[66px] fixed top-0 left-0 right-0 ct-center bg-white z-10">
      <img
        src="/assets/common/arrow.svg"
        alt="뒤로가기"
        className="absolute left-[19px] w-[28px] h-[28px]"
      />
      <span className="text-h2 font-Pretendard text-center">{title}</span>
    </div>
  );
}

export default TopBar;

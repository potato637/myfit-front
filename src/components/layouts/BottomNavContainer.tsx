import BottomNav from "./BottomNav";

interface Props {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

function BottomNavContainer({ children, showBottomNav = true }: Props) {
  return (
    <>
      {children}
      {showBottomNav && <div className="h-[89px]" />}
      {showBottomNav && <BottomNav />}
    </>
  );
}

export default BottomNavContainer;

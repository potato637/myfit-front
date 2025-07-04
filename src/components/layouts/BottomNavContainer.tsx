import BottomNav from "./BottomNav";

function BottomNavContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="h-[89px]" />
      <BottomNav />
    </>
  );
}

export default BottomNavContainer;

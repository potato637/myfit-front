import TopBar from "./TopBar";

interface TopBarContainerProps {
  TopBarContent: React.ReactNode;
  children: React.ReactNode;
}

function TopBarContainer({ TopBarContent, children }: TopBarContainerProps) {
  return (
    <>
      <TopBar>{TopBarContent}</TopBar>
      <div className="h-[66px]" />
      {children}
    </>
  );
}

export default TopBarContainer;

import TopBar from "./TopBar";

interface TopBarContainerProps {
  TopBarContent?: React.ReactNode;
  children: React.ReactNode;
}

function TopBarContainer({ TopBarContent, children }: TopBarContainerProps) {
  return (
    <>
      <TopBar>{TopBarContent}</TopBar>
      <div className="h-[42px]" />
      {children}
    </>
  );
}

export default TopBarContainer;

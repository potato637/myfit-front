import TopBar from "./TopBar";

interface TopBarContainerProps {
  TopBarContent?: React.ReactNode;
  children: React.ReactNode;
  backTo?: string;
  replace?: boolean;
}

function TopBarContainer({
  TopBarContent,
  children,
  backTo,
  replace = true,
}: TopBarContainerProps) {
  return (
    <>
      <TopBar backTo={backTo} replace={replace}>
        {TopBarContent}
      </TopBar>
      <div className="h-[42px]" />
      {children}
    </>
  );
}

export default TopBarContainer;

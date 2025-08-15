import { ReactNode } from "react";
import SearchingTopBar from "./SearchingTopBar";

interface Props {
  TopBarContent?: ReactNode;
  children: ReactNode;
}

function SearchingTopBarContainer({ TopBarContent, children }: Props) {
  return (
    <>
      <SearchingTopBar>{TopBarContent}</SearchingTopBar>
      <div className="h-[calc(135px+env(safe-area-inset-top))]" />
      {children}
    </>
  );
}

export default SearchingTopBarContainer;

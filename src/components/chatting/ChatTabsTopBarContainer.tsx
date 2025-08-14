// src/components/chatting/ChatTabsTopBarContainer.tsx
import { ReactNode } from "react";
import ChatTabsTopBar from "./ChatTabsTopBar";

interface Props {
  TopBarContent?: ReactNode;
  children: ReactNode;
}

function ChatTabsTopBarContainer({ TopBarContent, children }: Props) {
  return (
    <>
      <ChatTabsTopBar>{TopBarContent}</ChatTabsTopBar>
      <div className="chat-tabs-spacer" />
      {children}
    </>
  );
}
export default ChatTabsTopBarContainer;

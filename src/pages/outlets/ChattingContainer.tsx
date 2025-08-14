import { Outlet, useMatches } from "react-router-dom";
import { ChattingProvider } from "../../contexts/ChattingContext";

function ChattingContainer() {
  const matches = useMatches();
  const param = matches.find((m) => m.params?.chattingRoomId)?.params
    ?.chattingRoomId;
  const roomId = param ? Number(param) : null;

  return (
    <ChattingProvider key={roomId ?? "no-room"} roomId={roomId}>
      <Outlet />
    </ChattingProvider>
  );
}

export default ChattingContainer;

// ChattingContainer.tsx (최종 형태)
import { Outlet, useMatches } from "react-router-dom";
import { ChattingProvider } from "../../contexts/ChattingContext";

function ChattingContainer() {
  const matches = useMatches();
  const param = matches.find((m) => m.params?.chattingRoomId)?.params
    ?.chattingRoomId;
  const roomId = param ? Number(param) : null;

  if (roomId && !Number.isNaN(roomId)) {
    return (
      <ChattingProvider key={roomId} roomId={roomId}>
        <Outlet />
      </ChattingProvider>
    );
  }
  return <Outlet />;
}
export default ChattingContainer;

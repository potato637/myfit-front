import { useParams } from "react-router-dom";
import ChattingContainer from "../outlets/ChattingContainer";
import { ChattingProvider } from "../../contexts/ChattingContext";

function ChattingWrapper() {
  const { chattingRoomId } = useParams();
  const roomId = Number(chattingRoomId);

  return (
    <ChattingProvider roomId={roomId}>
      <ChattingContainer />
    </ChattingProvider>
  );
}

export default ChattingWrapper;

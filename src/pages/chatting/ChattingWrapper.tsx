import { useParams } from "react-router-dom";
import ChattingContainer from "../outlets/ChattingContainer";
import { ChattingProvider } from "../../contexts/ChattingContext";
import Chatting from "./Chatting";

function ChattingWrapper() {
  const { chattingRoomId } = useParams();
  const roomId = Number(chattingRoomId);

  return (
    <ChattingProvider roomId={roomId}>
      <Chatting />
    </ChattingProvider>
  );
}

export default ChattingWrapper;

import { useNavigate } from "react-router-dom";
import BottomModalButton from "./BottomModalButton";
import TopModalButton from "./TopModalButton";

interface MatchingButtonProps {
  status?: "init" | "waiting" | "firstediting" | "afterediting";
  senderId: number;
  myId: number;
}

function MatchingButton({ status, senderId, myId }: MatchingButtonProps) {
  const nav = useNavigate();
  const isMeSender = senderId === myId;
  return (
    <div className="flex flex-col items-center">
      {status === "init" && (
        <>
          <TopModalButton
            label="요청 하기"
            onClick={() => nav("/chatting", { state: { status: "requested" } })}
          />
          <BottomModalButton label="수정하기" />
        </>
      )}
      {status === "waiting" && isMeSender && (
        <>
          <TopModalButton label="수락 대기중" />
          <BottomModalButton label="변경하기" />
        </>
      )}
      {status === "waiting" && !isMeSender && (
        <>
          <TopModalButton label="수락 하기" />
          <BottomModalButton label="변경하기" />
        </>
      )}
      {status === "firstediting" && (
        <>
          <TopModalButton label="변경 하기" color="blue" />
          <BottomModalButton label="취소하기" />
        </>
      )}
      {status === "afterediting" && (
        <>
          <TopModalButton label="변경 완료" color="blue" />
          <BottomModalButton label="다시 수정" />
        </>
      )}
    </div>
  );
}
export default MatchingButton;

import BottomModalButton from "./BottomModalButton";
import TopModalButton from "./TopModalButton";

type Status = "init" | "waiting" | "firstediting" | "afterediting";

function MatchingButton({ status = "init" }: { status: Status }) {
  return (
    <div className="flex flex-col items-center">
      {status === "init" && (
        <>
          <TopModalButton label="요청 하기" />
          <BottomModalButton label="수정하기" />
        </>
      )}
      {status === "waiting" && (
        <>
          <TopModalButton label="수락 대기중" />
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

interface MatchingCheckProps {
  status: "init" | "waiting" | "firstediting" | "afterediting";
}

function MatchingCheck({ status }: MatchingCheckProps) {
  if (status == "init") return null;
  const isEditing = status === "firstediting" || status === "afterediting";
  const src = isEditing
    ? "/assets/chatting/check.svg"
    : "/assets/chatting/disablecheck.svg";
  const alt = isEditing ? "체크 활성화" : "체크 비활성화";
  return (
    <img src={src} alt={alt} className="absolute top-[10px] right-[10px]" />
  );
}
export default MatchingCheck;

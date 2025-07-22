function getTimeAgo(date: string | number | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000); // 초 단위 차이

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

  // 일주일 넘으면 날짜로 표기
  return target.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export default getTimeAgo;

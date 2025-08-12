export const formatDateWithDay = (
  year: number,
  month: number,
  day: number
): string => {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}.${month}.${day} ${dayOfWeek}`;
};
export const formatDateWithDayAndTime = (timestamp: number | Date): string => {
  const date = new Date(timestamp);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = days[date.getDay()];
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const isPM = hours >= 12;
  const ampm = isPM ? "PM" : "AM";

  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return `${year}.${month}.${day} (${dayOfWeek}) ${ampm} ${hours}:${minutes}`;
};

const pad = (n: number) => String(n).padStart(2, "0");

export const FormattedDate = (iso: string) => {
  const d = new Date(iso); // ISO(Z) -> 로컬 Date
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1); // getMonth는 0~11, 로컬 기준
  const day = pad(d.getDate());
  return `${y}.${m}.${day}`;
};

export const FormattedTime = (iso: string) => {
  const d = new Date(iso); // ISO(Z) -> 로컬 Date
  let h = d.getHours(); // 로컬 시
  const m = pad(d.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${ampm} ${h}:${m}`;
};
function toISOString(
  timeStr: string,
  dateObj: { year: number; month: number; date: number }
): string {
  const [period, time] = timeStr.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const date = new Date(
    dateObj.year,
    dateObj.month - 1,
    dateObj.date,
    hour,
    minute,
    0
  );

  return date.toISOString();
}
export default toISOString;

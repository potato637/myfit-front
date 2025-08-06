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
export const FormattedDate = (isoString: string): string => {
  const date = new Date(isoString);

  // KST로 보정 (UTC+9)
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kst.getFullYear();
  const month = String(kst.getMonth() + 1).padStart(2, "0");
  const day = String(kst.getDate()).padStart(2, "0");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[kst.getDay()];

  return `${year}.${month}.${day} (${dayOfWeek})`;
};

export const FormattedTime = (isoString: string): string => {
  const date = new Date(isoString);
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  let hours = kst.getHours();
  const minutes = String(kst.getMinutes()).padStart(2, "0");
  const isPM = hours >= 12;
  const ampm = isPM ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return `${ampm} ${hours}:${minutes}`;
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

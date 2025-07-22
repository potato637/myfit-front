export const formatDateWithDay = (
  year: number,
  month: number,
  day: number
): string => {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}.${month}.${day} ${dayOfWeek}`;
};

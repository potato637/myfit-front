export const getLastDayOfMonth = (dateObj: Date): number => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (dateObj: Date): number => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
};

export const toDateString = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

export const toYearMonthString = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const isToday = (dateObj: DateData): boolean => {
  const today = new Date();
  return (
    dateObj.year === today.getFullYear() &&
    dateObj.month === today.getMonth() + 1 &&
    dateObj.date === today.getDate()
  );
};

interface DateData {
  year: number;
  month: number;
  date: number;
  isValid: boolean;
}
export type CalendarDateData = DateData | null;
type CalendarData = Map<string, CalendarDateData[]>;

export const getCalendarData = (): CalendarData => {
  const result = new Map<string, CalendarDateData[]>();
  const today = new Date();

  for (let i = 0; i < 3; i++) {
    const dateList: CalendarDateData[] = [];
    const dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth() + i);
    const lastDayOfMonth = getLastDayOfMonth(dateObj);

    // push null data
    for (let i = 0; i < getFirstDayOfMonth(dateObj); i++) {
      dateList.push(null);
    }

    // push date data
    for (let j = 1; j <= lastDayOfMonth; j++) {
      const tempDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), j);
      const date = {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        date: j,
        isValid: toDateString(tempDate) >= toDateString(today),
      };
      dateList.push(date);
    }

    result.set(toYearMonthString(dateObj), dateList);
  }

  return result;
};

export function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date(); // 현재 시간

  const diffMilliseconds = now.getTime() - date.getTime(); // 밀리초 차이
  const diffSeconds = Math.round(diffMilliseconds / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffMonths = Math.round(diffDays / 30.44); // 평균 한 달 (365.25 / 12)
  const diffYears = Math.round(diffDays / 365.25); // 평균 일 년

  if (diffSeconds < 60) {
    return "방금 전"; // 1분 미만
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else if (diffDays < 30) {
    // 1주 이상 1달 미만은 "N주 전"으로 표시
    return `${Math.round(diffDays / 7)}주 전`;
  } else if (diffMonths < 12) {
    return `${diffMonths}개월 전`;
  } else {
    return `${diffYears}년 전`;
  }
}

export const morningTimes = ["11:00", "11:30", "12:00", "12:30"];
export const afternoonTimes = [
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
];

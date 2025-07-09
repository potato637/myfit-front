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

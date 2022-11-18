
import { IsoDateString } from "./dateTypes";

function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}

export type cDay = (" " | number)
export type cCalendarWeek = cDay[];
export type cDaysOfWeek = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

// Calendar logic
export const useCalendar = (
  date: IsoDateString
): {
  monthName: string;
  year: number;
  daysOfWeek: cDaysOfWeek[];
  weeks: cCalendarWeek[];
  currentDate: number;
} => {
  const daysOfWeek: cDaysOfWeek[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const monthNum = dateObject.getMonth();
  const currentDate = dateObject.getDate();
  const monthName = getMonthName(monthNum);

  const firstWeekDayOfMonth = new Date(year, monthNum, 1).getDay();
  const lastDayOfMonth = new Date(year, monthNum + 1, 0).getDate();

  const firstWeek: cCalendarWeek = [];

  const weeks: cCalendarWeek[] = [firstWeek];
  let daysCount = 1;

  // add first week
  for (let i = 0; i < 7; i++) {
    if (firstWeekDayOfMonth > i) {
      firstWeek.push(" ");
    } else {
      firstWeek.push(daysCount);
      daysCount++;
    }
  }

  // add remaining weeks
  const addWeeks = () => {
    if (daysCount > lastDayOfMonth) return;

    const week: cCalendarWeek = [];
    for (let i = 0; i < 7; i++) {
      if (daysCount > lastDayOfMonth) {
        week.push(" ");
      } else {
        week.push(daysCount);
        daysCount++;
      }
    }
    weeks.push(week);
    addWeeks();
  };

  addWeeks();

  return { monthName, year, daysOfWeek, weeks, currentDate };
};

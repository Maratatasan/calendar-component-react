import {
  useEffect,
  useState,
  useContext,
  useRef,
  MutableRefObject,
} from "react";
import { IsoDateString } from "./dateTypes";
import { CalendarContext } from "./Calendar";
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
export type cDayOfWeek = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

export type cDay = { value: " " | number | cDayOfWeek; active?: boolean };
export type cCalendarWeek = cDay[];

export type cUseCalendarProps = { date: IsoDateString; active?: boolean };
export type cCalendarProps = {
  monthName: string;
  year: number;
  daysOfWeek: cDayOfWeek[];
  weeks: cCalendarWeek[];
  currentDate: number | null;

  updateDate: ({ date, active }: cUseCalendarProps) => void;
  updateCurrentDate: (newDate: number | null) => void;
  updateMonth: (newMonth: number) => void;
  updateYear: (newYear: number) => void;
};

// Calendar logic
export const useCalendar = ({
  date,
  active,
}: cUseCalendarProps): cCalendarProps => {
  const daysOfWeek: cDayOfWeek[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const dateObject = new Date(date);
  const yearNum = dateObject.getFullYear();
  const monthNum = useRef<number>(dateObject.getMonth());

  const [year, setYear] = useState<number>(yearNum);
  const [currentDate, setCurrentDate] = useState<number | null>(
    dateObject.getDate()
  );

  const [monthName, setMonthName] = useState<string>(getMonthName(monthNum.current));
  const [weeks, setWeeks] = useState<cCalendarWeek[]>(
    createCalendarWeeks(year, monthNum.current)
  );

  const updateDate = ({ date, active }: cUseCalendarProps) => {
    const newDateObject = new Date(date);
    const newYear = newDateObject.getFullYear();
    const newMonthNum = newDateObject.getMonth();
    setYear(newYear);
    setCurrentDate(newDateObject.getDate());

    setMonthName(getMonthName(newMonthNum));
    setWeeks(createCalendarWeeks(newYear, newMonthNum));
  };

  const updateCurrentDate = (newCurrent: number | null) => {
    setCurrentDate(newCurrent);
  };

  const updateMonth = (monthIncrement: number) => {
    const newMonthNum = monthNum.current + monthIncrement;

    if (newMonthNum < 0) {
      setYear(year - 1);
      monthNum.current = 11;
    }

    if (newMonthNum > 11) {
      setYear(year + 1);
      monthNum.current = 0;
    }

    if (newMonthNum >= 0 && newMonthNum <= 11) {
      monthNum.current = newMonthNum;
    }

    setMonthName(getMonthName(monthNum.current));
    setWeeks(createCalendarWeeks(year, monthNum.current));
  
    
  }

  const updateYear = (yearIncrement: number) => {
    setYear(year + yearIncrement);
    setWeeks(createCalendarWeeks(year + yearIncrement, monthNum.current));
  };
  return {
    monthName,
    year,
    daysOfWeek,
    weeks,
    currentDate,
    updateDate,
    updateCurrentDate,
    updateMonth,
    updateYear
  };

  function createCalendarWeeks(
    year: number,
    monthNum: number
  ): cCalendarWeek[] {
    const firstWeekDayOfMonth = new Date(year, monthNum, 1).getDay();
    const lastDayOfMonth = new Date(year, monthNum + 1, 0).getDate();

    const firstWeek: cCalendarWeek = [];

    const weeks: cCalendarWeek[] = [firstWeek];
    let daysCount = 1;

    // add first week
    for (let i = 0; i < 7; i++) {
      if (firstWeekDayOfMonth > i) {
        firstWeek.push({ value: " " });
      } else {
        let day: cDay = { value: daysCount };
        firstWeek.push(day);
        daysCount++;
      }
    }

    // add remaining weeks
    const addWeeks = () => {
      if (daysCount > lastDayOfMonth) return;

      const week: cCalendarWeek = [];
      for (let i = 0; i < 7; i++) {
        if (daysCount > lastDayOfMonth) {
          week.push({ value: " " });
        } else {
          let day: cDay = { value: daysCount };
          week.push(day);
          daysCount++;
        }
      }
      weeks.push(week);
      addWeeks();
    };

    addWeeks();
    return weeks;
  }
};

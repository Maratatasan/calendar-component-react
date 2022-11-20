import React, {
  memo,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  useCalendar,
  cCalendarWeek,
  cDay,
  cDayOfWeek,
  cCalendarProps,
} from "./useCalendar";

import "./calendar.css";
import { IsoDateString } from "./dateTypes";
let count = 0;
export const CalendarContext = createContext({} as cCalendarProps);

const Calendar = ({ date }: { date: IsoDateString }) => {
  const calendarProps: cCalendarProps = useCalendar({
    date: date,
    active: true,
  });
  const {
    monthName,
    year,
    daysOfWeek,
    weeks,
    currentDate,
    updateDate,
    updateCurrentDate,
    updateMonth,
    updateYear,
  } = calendarProps;

  useEffect(() => {
    count += 1;
    console.log("Calendar", count);
    console.log("currentDate", currentDate);
  }, [currentDate]);
  return (
    <div className="calendar-comp">
      <div className="c-select-date">
        <button
          className="c-update-year"
          id={"c-year-decrease"}
          onClick={() => updateYear(-1)}
        >
          {"<<"} year
        </button>
        <button
          className="c-update-month"
          id={"c-month-decrease"}
          onClick={() => updateMonth(-1)}
        >
          {" "}
          {"<<"} month
        </button>
        <button
          className="c-update-month"
          id={"c-month-increase"}
          onClick={() => updateMonth(1)}
        >
          month {">>"}
        </button>
        <button
          className="c-update-year"
          id={"c-year-increase"}
          onClick={() => updateYear(1)}
        >
          year {">>"}
        </button>
      </div>
      <div className="c-month-and-year">
        <div className="c-month">{monthName}</div>
        &nbsp;
        <div className="c-year">{year}</div>
      </div>
      <div className="c-days-of-week">
        <Row row={daysOfWeek} />
      </div>
      <CalendarContext.Provider value={calendarProps}>
        <div className="c-days-of-month">
          {weeks.map((week: cCalendarWeek, index: number) => {
            return <Row key={index} row={week} />;
          })}
        </div>
      </CalendarContext.Provider>
    </div>
  );
};

const Row = memo(
  (props: { row: cDayOfWeek[] | cCalendarWeek; activeDate?: number }) => {
    return (
      <div className="c-row">
        {props.row.map((cell, index) => {
          let cellContent: cDay =
            typeof cell === "string" ? { value: cell } : cell;
          return <Cell {...cellContent} key={index} />;
        })}
      </div>
    );
  }
);

const Cell = memo((props: cDay) => {
  const { currentDate, updateDate, updateCurrentDate } =
    useContext(CalendarContext);
  return (
    <div
      className={
        "c-cell " +
        `${
          typeof props.value !== "string" && currentDate === props.value
            ? "c-cell-active"
            : ""
        } ` +
        `${typeof props.value != "string" ? "c-cell-hover" : ""}`
      }
      onClick={() =>
        typeof props.value != "string" ? updateCurrentDate(props.value) : ""
      }
    >
      {props.value}
    </div>
  );
});

export default memo(Calendar);

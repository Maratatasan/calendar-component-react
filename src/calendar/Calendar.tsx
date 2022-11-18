import React, { memo } from "react";
import { useCalendar, cCalendarWeek, cDay ,cDaysOfWeek} from "./useCalendar";

import { IsoDateString } from "./dateTypes";

import "./calendar.css";
interface CalendarProps {
  date: IsoDateString;
}

const Calendar = ({ date }: CalendarProps) => {
  const { monthName, year, daysOfWeek, weeks, currentDate } = useCalendar(date);



  return (
    <div className="calendar-comp">
      <div className="c-month-and-year">
        <div className="c-month">{monthName}</div>
        &nbsp;
        <div className="c-year">{year}</div>
      </div>
      <div className="c-days-of-week">
        <Row row={daysOfWeek} />
      </div>
      <div className="c-days-of-month">
        {weeks.map((week: cCalendarWeek, index: number) => (
          <Row
            key={index}
            row={week}
            activeDate={week.includes(currentDate) ? currentDate : 0}
          />
        ))}
      </div>
    </div>
  );
};

const Row = memo((props: { row: cDaysOfWeek[] | cCalendarWeek; activeDate?: number }) => {
  return (
    <div className="c-row">
      {props.row.map((cell, index) => {
        return (
          <Cell
            cell={cell}
            key={index}
            active={props.activeDate === cell ? "active" : ""}
          />
        );
      })}
    </div>
  );
});

const Cell = memo((props: { cell: cDay | cDaysOfWeek; active: string }) => {
  return <div className={"c-cell c-cell-" + props.active}>{props.cell}</div>;
});

export default memo(Calendar);

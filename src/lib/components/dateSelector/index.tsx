import React, { useState } from "react";
import moment from "moment";

import { DateObject } from "../../models/dateObject";
import styles from "./style.module.scss";

/*
  Fill an array with an increment from a number to another number.
  i.e. fillArray from 1 to 4 will return the following: [1, 2, 3, 4]
  
  You can fill descending by flipping the to value
  i.e. fillArray from 4 to 1 will return the following: [4, 3, 2, 1]
*/
export const fillArray = (from: number, to: number): number[] => {
  const ascending = from > to;
  const arraySize = Math.abs(from - to) + 1;
  const toReturn = new Array(arraySize).fill(0).map((_, index) => {
    return ascending ? to + index : from + index;
  });

  if (ascending) {
    return toReturn.reverse();
  }

  return toReturn;
};

/*
  Return the maximum number of days given a month and a year.
*/
export const daysInMonthOfYear = ({
  month,
  year
}: {
  month: number;
  year: number;
}) => {
  return moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
};

export default ({
  value,
  onChange,
  yearBoundaries
}: {
  value?: DateObject;
  onChange: (date: DateObject) => void;
  yearBoundaries: { min: number; max: number };
}) => {
  const daysInSelectedDate =
    value !== undefined
      ? daysInMonthOfYear({ month: value.month, year: value.year })
      : 31;
  const availableDays = fillArray(1, daysInSelectedDate);
  const availableYears = fillArray(yearBoundaries.max, yearBoundaries.min);
  const availableMonths = moment.monthsShort();

  const [date, setDate] = useState<Partial<DateObject>>(value ? value : {});

  if (
    date.year !== undefined &&
    date.month !== undefined &&
    date.day !== undefined
  ) {
    if (
      value === undefined ||
      date.day !== value.day ||
      date.month !== value.month ||
      date.year !== value.year
    ) {
      onChange({ day: date.day, month: date.month, year: date.year });
    }
  }

  const handleOnChange = (key: keyof DateObject, v: number) => {
    const newValue = { ...date, [key]: v };
    if (
      key !== "day" &&
      newValue.month !== undefined &&
      newValue.year !== undefined &&
      newValue.day !== undefined
    ) {
      const cappedDays = Math.min(
        daysInMonthOfYear({ month: newValue.month, year: newValue.year }),
        newValue.day
      );
      setDate({ ...newValue, day: cappedDays });
    } else {
      setDate(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <select
        data-cy="date-selector-day"
        className="p-select"
        id="day"
        name="day"
        required={true}
        defaultValue=""
        value={date.day}
        onChange={e => {
          handleOnChange("day", parseInt(e.target.value, 10));
        }}
      >
        <option value="" disabled={true}>
          Day
        </option>
        {availableDays.map(day => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        data-cy="date-selector-month"
        className="p-select"
        id="month"
        name="month"
        required={true}
        defaultValue=""
        value={date.month}
        onChange={e => {
          handleOnChange("month", parseInt(e.target.value, 10));
        }}
      >
        <option value="" disabled={true}>
          Month
        </option>
        {availableMonths.map((month, i) => (
          <option key={month} value={i + 1}>
            {month}
          </option>
        ))}
      </select>
      <select
        data-cy="date-selector-year"
        className="p-select"
        id="year"
        name="year"
        required={true}
        defaultValue=""
        value={date.year}
        onChange={e => {
          handleOnChange("year", parseInt(e.target.value, 10));
        }}
      >
        <option value="" disabled={true}>
          Year
        </option>
        {availableYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

import moment from "moment";
import { CalendarDate } from "@popsure/public-models";

import { zerofill } from "../../util/zeroFill";

export function calendarDateToISODate(calendarDate: CalendarDate) {
  return `${calendarDate.year}-${zerofill(calendarDate.month)}-${zerofill(
    calendarDate.day
  )}`;
}

export function isoStringtoCalendarDate(
  input: string
): CalendarDate | undefined {
  const date = moment(input, "YYYY-MM-DD");

  if (date.isValid() === false) {
    return;
  }

  const year = date.year();
  const month = date.get("month");
  const day = date.date();

  return { year, month: month + 1, day };
}

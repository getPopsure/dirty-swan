import moment from "moment";

import { zerofill } from "../../util/zeroFill";

export interface DateObject {
  day: number;
  month: number;
  year: number;
}

export function dateObjectToISODate(dateObject: DateObject) {
  return `${dateObject.year}-${zerofill(dateObject.month)}-${zerofill(
    dateObject.day
  )}`;
}

export function isoStringtoDateObject(input: string): DateObject | undefined {
  const date = moment(input, "YYYY-MM-DD");

  if (date.isValid() === false) {
    return;
  }

  const year = date.year();
  const month = date.get("month");
  const day = date.date();

  return { year, month: month + 1, day };
}

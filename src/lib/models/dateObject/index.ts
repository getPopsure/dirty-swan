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

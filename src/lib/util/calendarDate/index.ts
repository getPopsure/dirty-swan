import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CalendarDate } from '@popsure/public-models';

import { zerofill } from 'lib/util/zeroFill';

dayjs.extend(customParseFormat);

export function calendarDateToISODate(calendarDate: CalendarDate) {
  return `${calendarDate.year}-${zerofill(calendarDate.month)}-${zerofill(
    calendarDate.day
  )}`;
}

export function isoStringtoCalendarDate(
  input: string
): CalendarDate | undefined {
  const date = dayjs(input, 'YYYY-MM-DD');
  const dateValidity = dayjs(input, 'YYYY-MM-DD', true).isValid();

  if (dateValidity === false) {
    return;
  }

  const year = date.year();
  const month = date.get('month');
  const day = date.date();

  return { year, month: month + 1, day };
}

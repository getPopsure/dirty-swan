import { CalendarDate } from '@getpopsure/public-models';
import { calendarDateToISODate, isoStringtoCalendarDate } from '.';

describe('Calendar date to ISO date', () => {
  it('Should add trailing 0s', () => {
    const expectedOutput = '2019-04-09';
    const input: CalendarDate = { day: 9, month: 4, year: 2019 };

    expect(calendarDateToISODate(input)).toEqual(expectedOutput);
  });

  it('Should format date correctly', () => {
    const expectedOutput = '2019-10-29';
    const input: CalendarDate = { day: 29, month: 10, year: 2019 };

    expect(calendarDateToISODate(input)).toEqual(expectedOutput);
  });
});

describe('ISO string to Calendar date', () => {
  it('Should convert valid ISO 8601 string to CalendarDate', () => {
    expect(isoStringtoCalendarDate('1990-03-24')).toEqual({
      year: 1990,
      month: 3,
      day: 24,
    });
  });

  test('Converting invalid ISO 8601 string to CalendarDate should be undefined', () => {
    expect(isoStringtoCalendarDate('1990-24-03')).toBeUndefined();
  });
});

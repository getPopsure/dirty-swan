import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DayPicker } from 'react-day-picker';
import rdpStyles from 'react-day-picker/style.module.css';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { CalendarIcon } from '../../icon/icons';

import styles from './style.module.scss';
import datepickerStyles from './datepicker.module.scss';
import { Button } from '../../button';

export interface CalendarProps {
  dateFormat: string;
  value?: string;
  onChange: (date: string) => void;
  yearBoundaries: { min: number; max: number };
  displayCalendar?: boolean;
  dayjsLocale?: ILocale;
  firstDayOfWeek?: number;
  isOpen?: boolean;
  setCalendarOpen: (isOpen: boolean) => void;
  defaultDayPickerDate?: string;
}

export const Calendar = ({
  dateFormat,
  value,
  onChange,
  yearBoundaries,
  displayCalendar,
  dayjsLocale,
  firstDayOfWeek,
  setCalendarOpen,
  isOpen,
  defaultDayPickerDate,
}: CalendarProps) => {
  const localeDate = dayjsLocale
    ? dayjs().locale(dayjsLocale).localeData()
    : dayjs().locale('en').localeData();

  const localizedMonths = localeDate.months();
  const localizedWeekdaysShort = localeDate.weekdaysMin();

  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const [displayedMonth, setDisplayedMonth] = useState<Date | undefined>(undefined);

  const calendarDefaultDate = defaultDayPickerDate
    ? dayjs(defaultDayPickerDate).toDate()
    : dayjs().year() >= yearBoundaries.min && dayjs().year() <= yearBoundaries.max
      ? dayjs().toDate()
      : dayjs().set('year', yearBoundaries.max).toDate();

  const selectedDateInDateType = value
    ? dayjs(value).toDate()
    : undefined;
  const dateCalendarFromMonth = dayjs(String(yearBoundaries.min))
    .startOf('year')
    .toDate();
  const dateCalendarToMonth = dayjs(String(yearBoundaries.max))
    .endOf('year')
    .toDate();

  useOnClickOutside(calendarContainerRef, () => setCalendarOpen(false));

  if (!displayCalendar) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ml8`}
      ref={calendarContainerRef}
    >
      <Button
        onClick={() => setCalendarOpen(!isOpen)}
        data-testid="calendar-button"
        hideLabel
        variant='textBlack'
        type="button"
      >
        <CalendarIcon size={24} />
      </Button>

      {isOpen && (
        <DayPicker
          month={displayedMonth ?? selectedDateInDateType ?? calendarDefaultDate}
          mode="single"
          showOutsideDays={true}
          captionLayout="dropdown"
          navLayout="around"
          startMonth={dateCalendarFromMonth}
          endMonth={dateCalendarToMonth}
          selected={selectedDateInDateType}
          onDayClick={(date: Date) => {
            if (!dayjs(date).isValid()) {
              return;
            }

            if (
              dayjs(date).isAfter(dateCalendarFromMonth) ||
              dayjs(date).isBefore(dateCalendarToMonth)
            ) {
              const selectedDate = dayjs(date).format(dateFormat);
              onChange(selectedDate);
              setCalendarOpen(false);
            }
          }}
          onMonthChange={(month: Date) => setDisplayedMonth(month)}
          pagedNavigation={true}
          disabled={{
            before: dateCalendarFromMonth,
            after: dateCalendarToMonth,
          }}
          weekStartsOn={firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6}
          formatters={{
            formatWeekdayName: (_date) => {
              const dayIndex = _date.getDay();
              return localizedWeekdaysShort[dayIndex]?.charAt(0) ?? '';
            },
            formatMonthDropdown: (date) => {
              return localizedMonths[date.getMonth()];
            },
          }}
          classNames={{ ...rdpStyles, ...datepickerStyles }}
        />
      )}
    </div>
  );
};

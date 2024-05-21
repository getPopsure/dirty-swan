import { useRef } from 'react';
import dayjs from 'dayjs';
import DayPicker from 'react-day-picker';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { CalendarIcon } from '../../icon/icons';

import styles from './style.module.scss';
import './datepicker.scss';
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
  isOpen
}: CalendarProps) => {
  const localeDate = dayjsLocale
    ? dayjs().locale(dayjsLocale).localeData()
    : dayjs().locale('en').localeData();

  const localizedWeekdays = localeDate.weekdays();
  const localizedWeekdaysShort = localeDate.weekdaysShort();
  const localizedMonths = localeDate.months();

  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  const calendarDefaultDate =
    dayjs().year() >= yearBoundaries.min && dayjs().year() <= yearBoundaries.max
      ? dayjs().toDate()
      : dayjs().set('year', yearBoundaries.max).toDate();

  const selectedDateInDateType = value
    ? dayjs(value).toDate()
    : calendarDefaultDate;
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
        variant='textColor'
        leftIcon={<CalendarIcon />}
      >
        Select date
      </Button>

      {isOpen && (
        <DayPicker
          month={selectedDateInDateType}
          showOutsideDays={true}
          fromMonth={dateCalendarFromMonth}
          toMonth={dateCalendarToMonth}
          selectedDays={selectedDateInDateType}
          onDayClick={(date: Date) => {
            if (
              dayjs(date).isAfter(dateCalendarFromMonth) ||
              dayjs(date).isBefore(dateCalendarToMonth)
            ) {
              const selectedDate = dayjs(date).format(dateFormat);
              onChange(selectedDate);
              setCalendarOpen(false);
            }
          }}
          pagedNavigation={true}
          disabledDays={{
            before: dateCalendarFromMonth,
            after: dateCalendarToMonth,
          }}
          firstDayOfWeek={firstDayOfWeek}
          locale={dayjsLocale?.name || 'en'}
          months={localizedMonths}
          weekdaysLong={localizedWeekdays}
          weekdaysShort={localizedWeekdaysShort}
        />
      )}
    </div>
  );
};

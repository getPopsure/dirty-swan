import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import DayPicker from 'react-day-picker';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { CalendarIcon } from '../../icon/icons';
import { CalendarCaption } from './CalendarCaption';

import styles from './style.module.scss';
import './datepicker.module.scss';
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

  const localizedWeekdays = localeDate.weekdays();
  const localizedWeekdaysShort = localeDate.weekdaysMin();
  const localizedMonths = localeDate.months();

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

  const currentMonth = displayedMonth ?? selectedDateInDateType ?? calendarDefaultDate;

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setDisplayedMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setDisplayedMonth(next);
  };

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
          showOutsideDays={true}
          fromMonth={dateCalendarFromMonth}
          toMonth={dateCalendarToMonth}
          selectedDays={selectedDateInDateType}
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
          navbarElement={() => null}
          onMonthChange={(month: Date) => setDisplayedMonth(month)}
          captionElement={({ date }: { date: Date }) => (
            <CalendarCaption
              date={date}
              months={localizedMonths}
              yearBoundaries={yearBoundaries}
              onMonthChange={(newDate) => setDisplayedMonth(newDate)}
              onPrevClick={handlePrevMonth}
              onNextClick={handleNextMonth}
            />
          )}
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

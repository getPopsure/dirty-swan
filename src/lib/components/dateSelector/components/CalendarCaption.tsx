import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import styles from './calendarCaption.module.scss';

interface CalendarCaptionProps {
  date: Date;
  months: string[];
  yearBoundaries: { min: number; max: number };
  onMonthChange: (date: Date) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const CalendarCaption = ({
  date,
  months,
  yearBoundaries,
  onMonthChange,
  onPrevClick,
  onNextClick,
}: CalendarCaptionProps) => {
  const [openDropdown, setOpenDropdown] = useState<
    'month' | 'year' | null
  >(null);

  const captionRef = useRef<HTMLDivElement | null>(null);

  const closeDropdowns = useCallback(() => setOpenDropdown(null), []);

  useOnClickOutside(captionRef, closeDropdowns);

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const fromMonth = new Date(yearBoundaries.min, 0);
  const toMonth = new Date(yearBoundaries.max, 11);

  const isMonthDisabled = (monthIndex: number) => {
    const candidate = new Date(currentYear, monthIndex);
    return candidate < fromMonth || candidate > toMonth;
  };

  const years: number[] = [];
  for (let y = yearBoundaries.min; y <= yearBoundaries.max; y++) {
    years.push(y);
  }

  const handleMonthSelect = (monthIndex: number) => {
    onMonthChange(new Date(currentYear, monthIndex));
    setOpenDropdown(null);
  };

  const handleYearSelect = (year: number) => {
    onMonthChange(new Date(year, currentMonth));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: 'month' | 'year') => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const isPrevDisabled =
    currentYear === yearBoundaries.min && currentMonth === 0;
  const isNextDisabled =
    currentYear === yearBoundaries.max && currentMonth === 11;

  return (
    <div className={styles.caption} ref={captionRef}>
      <button
        type="button"
        className={classNames(styles.navButton, styles.navButtonPrev)}
        onClick={onPrevClick}
        disabled={isPrevDisabled}
        data-testid="calendar-nav-prev"
      />

      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={styles.captionButton}
          onClick={() => toggleDropdown('month')}
          data-testid="calendar-caption-month"
        >
          {months[currentMonth]}
          <span
            className={classNames(styles.chevron, {
              [styles.chevronOpen]: openDropdown === 'month',
            })}
          />
        </button>

        {openDropdown === 'month' && (
          <div className={styles.dropdown} data-testid="month-dropdown">
            <div className={styles.mobileHeader}>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={closeDropdowns}
              >
                ✕
              </button>
            </div>
            {months.map((monthName, index) => (
              <button
                key={monthName}
                type="button"
                className={classNames(styles.dropdownItem, {
                  [styles.dropdownItemSelected]: index === currentMonth,
                })}
                disabled={isMonthDisabled(index)}
                onClick={() => handleMonthSelect(index)}
              >
                <span className={styles.radio} />
                {monthName}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={styles.captionButton}
          onClick={() => toggleDropdown('year')}
          data-testid="calendar-caption-year"
        >
          {currentYear}
          <span
            className={classNames(styles.chevron, {
              [styles.chevronOpen]: openDropdown === 'year',
            })}
          />
        </button>

        {openDropdown === 'year' && (
          <div className={styles.dropdown} data-testid="year-dropdown">
            <div className={styles.mobileHeader}>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={closeDropdowns}
              >
                ✕
              </button>
            </div>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={classNames(styles.dropdownItem, {
                  [styles.dropdownItemSelected]: year === currentYear,
                })}
                onClick={() => handleYearSelect(year)}
              >
                <span className={styles.radio} />
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className={classNames(styles.navButton, styles.navButtonNext)}
        onClick={onNextClick}
        disabled={isNextDisabled}
        data-testid="calendar-nav-next"
      />
    </div>
  );
};

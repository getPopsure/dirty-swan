import { render } from '../../util/testUtils';

import { DateSelector } from '.';

const setup = (date: string, onChange: (date: string) => void = () => {}) => {
  return render(
    <DateSelector
      value={date}
      yearBoundaries={{ min: 2020, max: 2025 }}
      onChange={onChange}
      displayCalendar
    />
  );
};

describe('DateSelector component', () => {
  it('should return the selected date when clicking on the calendar', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const expectedDate = '2024-01-17';
    const { getByTestId, getByLabelText, user } = setup(date, callback);
    const button = getByTestId('calendar-button');

    await user.click(button);

    const calendarCell = getByLabelText(/17 2024/);

    await user.click(calendarCell);

    expect(callback).toHaveBeenCalledWith(expectedDate);

    expect(calendarCell).not.toBeVisible();
  });

  it('should close the calendar when clicking outside', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByTestId, getByLabelText, user } = setup(date, callback);
    const button = getByTestId('calendar-button');

    await user.click(button);

    const calendarCell = getByLabelText(/17 2024/);
    expect(calendarCell).toBeVisible();

    // click outside the calendar
    await user.click(document.body);

    expect(callback).not.toHaveBeenCalled();

    expect(calendarCell).not.toBeVisible();
  });
});

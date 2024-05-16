import { render } from '../../util/testUtils';

import { DateSelector } from '.';

const setup = (date?: string, onChange: (date: string) => void = () => {}) => {
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
  it('should show the value inside the inputs', () => {
    const date = '2024-01-01';
    const { getByTestId } = setup(date);

    expect(getByTestId('date-selector-day')).toHaveValue('1');
    expect(getByTestId('date-selector-month')).toHaveValue('1');
    expect(getByTestId('date-selector-year')).toHaveValue('2024');
  });

  it('should call onChange with the value changed', async () => {
    const callback = jest.fn();
    const { getByTestId, user } = setup(undefined, callback);

    await user.type(getByTestId('date-selector-day'), '5');
    await user.type(getByTestId('date-selector-month'), '7');
    await user.type(getByTestId('date-selector-year'), '2023');

    expect(getByTestId('date-selector-day')).toHaveValue('5');
    expect(getByTestId('date-selector-month')).toHaveValue('7');
    expect(getByTestId('date-selector-year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-07-05');
  });

  it('should call onChange with the value changed with initial value', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByTestId, user } = setup(date, callback);

    await user.type(getByTestId('date-selector-day'), '{backspace}3');
    await user.type(getByTestId('date-selector-month'), '{backspace}7');
    await user.type(getByTestId('date-selector-year'), '{backspace}3');

    expect(getByTestId('date-selector-day')).toHaveValue('3');
    expect(getByTestId('date-selector-month')).toHaveValue('7');
    expect(getByTestId('date-selector-year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-07-03');
  });

  it('should call onChange empty when invalid date', async () => {
    const callback = jest.fn();
    const { getByTestId, user } = setup(undefined, callback);

    await user.type(getByTestId('date-selector-day'), '5');

    expect(getByTestId('date-selector-day')).toHaveValue('5');
    expect(callback).toHaveBeenCalledWith('');
  });

  it('should call onChange empty when year out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByTestId, user } = setup(date, callback);

    await user.type(getByTestId('date-selector-year'), '{backspace}{backspace}30');

    expect(getByTestId('date-selector-year')).toHaveValue('2030');
    expect(callback).toHaveBeenCalledWith('');
  });

  it('should call onChange when year in boundaries after being out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2030-01-01';
    const { getByTestId, user } = setup(date, callback);

    await user.type(getByTestId('date-selector-year'), '{backspace}{backspace}23');

    expect(getByTestId('date-selector-year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-01-01');
  });

  it('should call onChange with the value changed', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByTestId, user } = setup(date, callback);

    await user.type(getByTestId('date-selector-day'), '{backspace}3');
    await user.type(getByTestId('date-selector-month'), '{backspace}7');
    await user.type(getByTestId('date-selector-year'), '{backspace}3');

    expect(getByTestId('date-selector-day')).toHaveValue('3');
    expect(getByTestId('date-selector-month')).toHaveValue('7');
    expect(callback).toHaveBeenCalledWith('2023-07-03');
  });

  it('should navigate inputs from day to month when day is over 3', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByTestId, user } = setup(date, callback);

    await user.type(getByTestId('date-selector-day'), '{backspace}45');

    expect(getByTestId('date-selector-day')).toHaveValue('4');
    expect(getByTestId('date-selector-month')).toHaveValue('5');
    expect(callback).toHaveBeenCalledWith('2024-05-04');
  });

  describe('Calendar button', () => {
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
});

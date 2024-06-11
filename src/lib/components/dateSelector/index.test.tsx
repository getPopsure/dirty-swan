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
    const { getByLabelText } = setup(date);

    expect(getByLabelText('Day')).toHaveValue('1');
    expect(getByLabelText('Month')).toHaveValue('1');
    expect(getByLabelText('Year')).toHaveValue('2024');
  });

  it('should call onChange with the value changed', async () => {
    const callback = jest.fn();
    const { getByLabelText, user } = setup(undefined, callback);

    await user.type(getByLabelText('Day'), '5');
    await user.type(getByLabelText('Month'), '7');
    await user.type(getByLabelText('Year'), '2023');

    expect(getByLabelText('Day')).toHaveValue('5');
    expect(getByLabelText('Month')).toHaveValue('7');
    expect(getByLabelText('Year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-07-05');
  });

  it('should call onChange with the value changed with initial value', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByLabelText, user } = setup(date, callback);

    await user.type(getByLabelText('Day'), '{backspace}3');
    await user.type(getByLabelText('Month'), '{backspace}7');
    await user.type(getByLabelText('Year'), '{backspace}3');

    expect(getByLabelText('Day')).toHaveValue('3');
    expect(getByLabelText('Month')).toHaveValue('7');
    expect(getByLabelText('Year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-07-03');
  });

  it('should not call onChange when there is an invalid date that has not been completely filled', async () => {
    const callback = jest.fn();
    const { getByLabelText, user } = setup(undefined, callback);

    await user.type(getByLabelText('Day'), '5');

    expect(getByLabelText('Day')).toHaveValue('5');
    expect(callback).not.toHaveBeenCalled();

    await user.type(getByLabelText('Month'), '4');

    expect(getByLabelText('Month')).toHaveValue('4');
    expect(callback).not.toHaveBeenCalled();

    await user.type(getByLabelText('Year'), '2020');

    expect(getByLabelText('Year')).toHaveValue('2020');
    expect(callback).toHaveBeenCalledWith("2020-04-05");
  });

  it('should show error boundaries error for min date onChange empty when year out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2010-01-01';
    const { getByTestId } = setup(date, callback);

    expect(getByTestId('date-error-message')).toBeVisible();
    expect(getByTestId('date-error-message')).toHaveTextContent('Please choose a date after 2019');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should show error boundaries error for ,ax date onChange empty when year out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2100-01-01';
    const { getByTestId } = setup(date, callback);

    expect(getByTestId('date-error-message')).toBeVisible();
    expect(getByTestId('date-error-message')).toHaveTextContent('Please choose a date before 2026');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call onChange empty when year out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByLabelText, user } = setup(date, callback);

    await user.type(getByLabelText('Year'), '{backspace}{backspace}30');

    expect(getByLabelText('Year')).toHaveValue('2030');
    expect(callback).toHaveBeenCalledWith('');
  });

  it('should call onChange when year in boundaries after being out of boundaries', async () => {
    const callback = jest.fn();
    const date = '2030-01-01';
    const { getByLabelText, user } = setup(date, callback);

    await user.type(getByLabelText('Year'), '{backspace}{backspace}23');

    expect(getByLabelText('Year')).toHaveValue('2023');
    expect(callback).toHaveBeenCalledWith('2023-01-01');
  });

  it('should call onChange with the value changed', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByLabelText, user } = setup(date, callback);

    await user.type(getByLabelText('Day'), '{backspace}3');
    await user.type(getByLabelText('Month'), '{backspace}7');
    await user.type(getByLabelText('Year'), '{backspace}3');

    expect(getByLabelText('Day')).toHaveValue('3');
    expect(getByLabelText('Month')).toHaveValue('7');
    expect(callback).toHaveBeenCalledWith('2023-07-03');
  });

  it('should navigate inputs from day to month when day is over 3', async () => {
    const callback = jest.fn();
    const date = '2024-01-01';
    const { getByLabelText, user } = setup(date, callback);

    await user.type(getByLabelText('Day'), '{backspace}45');

    expect(getByLabelText('Day')).toHaveValue('4');
    expect(getByLabelText('Month')).toHaveValue('5');
    expect(callback).toHaveBeenCalledWith('2024-05-04');
  });

  describe('Calendar button', () => {
    it('should return the selected date when clicking on the calendar', async () => {
      const callback = jest.fn();
      const date = '2024-01-01';
      const expectedDate = '2024-01-17';
      const { getByLabelText, getByTestId, user } = setup(date, callback);
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
      const { getByLabelText, getByTestId, user } = setup(date, callback);
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

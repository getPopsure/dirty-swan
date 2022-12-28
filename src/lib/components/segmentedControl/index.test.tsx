import { fireEvent, render } from '@testing-library/react';

import SegmentedControl from '.';

const setup = (onChange: (selectedIndex: number) => void = () => {}) => {
  return render(
    <SegmentedControl
      values={['kg', 'lbs']}
      onChange={onChange}
      selectedIndex={0}
    />
  );
};

describe('SegmentedControl component', () => {
  it('Should provide the index of the clicked button', async () => {
    const callback = jest.fn();
    const screen = setup(callback);
    const buttons = screen.getAllByRole('button');

    // click first button
    fireEvent.click(buttons[0]);

    // click second button
    fireEvent.click(buttons[1]);

    expect(callback.mock.calls).toEqual([[0], [1]]);
  });

  it('Should provide the index of the selected button on key down', async () => {
    const callback = jest.fn();
    const screen = setup(callback);
    const buttons = screen.getAllByRole('button');

    // select first button on key down
    fireEvent.keyDown(buttons[0], {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // select second button on key down
    fireEvent.keyDown(buttons[1], {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(callback.mock.calls).toEqual([[0], [1]]);
  });
});

import { render } from '../../util/testUtils';

import { SegmentedControl } from '.';

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
    const { getAllByRole, user } = setup(callback);
    const buttons = getAllByRole('button');

    // click first button
    await user.click(buttons[0]);

    // click second button
    await user.click(buttons[1]);

    expect(callback.mock.calls).toEqual([[0], [1]]);
  });

  it('Should provide the index of the selected button on key down', async () => {
    const callback = jest.fn();
    const { getAllByRole, user } = setup(callback);
    const buttons = getAllByRole('button');

    // focus first button and select with keyboard
    buttons[0].focus();
    await user.keyboard('{enter}');

    // focus second button and select with keyboard
    buttons[1].focus();
    await user.keyboard('{enter}');

    expect(callback.mock.calls).toEqual([[0], [1]]);
  });
});

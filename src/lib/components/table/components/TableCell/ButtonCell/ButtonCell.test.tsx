import { render, screen } from '../../../../../util/testUtils';
import { ButtonCell } from './ButtonCell';

describe('ButtonCell', () => {
  it('exposes its test id on the button so clicking it selects the cell', async () => {
    const onClick = jest.fn();
    const { user } = render(
      <ButtonCell
        buttonCaption="Extended"
        price="€9.34/mo"
        onClick={onClick}
        dataTestId="plan-table-EXTENDED"
      />
    );

    const button = screen.getByTestId('plan-table-EXTENDED');
    await user.click(button);

    expect(button.tagName).toBe('BUTTON');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

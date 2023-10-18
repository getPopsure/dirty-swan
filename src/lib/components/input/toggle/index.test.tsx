import { render } from '../../../util/testUtils';

import { Toggle, ToggleProps } from '.';

const mockOnChange = jest.fn();

const setup = (onChange: ToggleProps<string>['onChange'], value?: string[]) => {
  const utils = render(
    <Toggle
      options={{
        CAT: 'Cat',
        DOG: 'Dog',
        NONE: 'None',
      }}
      onChange={onChange}
      value={value}
    />
  );

  return utils;
};

describe('toggle component', () => {
  it('Should render options', () => {
    const { getByText } = setup(mockOnChange);

    expect(getByText('Cat')).toBeInTheDocument();
    expect(getByText('Dog')).toBeInTheDocument();
    expect(getByText('None')).toBeInTheDocument();
  });

  it('Should call onchange on selecting an option', async () => {
    const { getByTestId, user } = setup(mockOnChange);

    await user.click(getByTestId('toggle-DOG'));

    expect(mockOnChange).toBeCalledWith(["DOG"]);
  });

  it('Should render checked items when value is passed', async () => {
    const { getByTestId } = setup(mockOnChange, ['CAT']);

    expect(getByTestId('toggle-input-CAT')).toBeChecked();
  });

  it('Should call onchange with NONE and removing other items on selecting NONE option', async () => {
    const { getByTestId, user } = setup(mockOnChange, ['CAT', 'DOG']);

    await user.click(getByTestId('toggle-NONE'));

    expect(mockOnChange).toBeCalledWith(["NONE"]);
  });

  it('Should call onchange empty when removing NONE option', async () => {
    const { getByTestId, user } = setup(mockOnChange, ['NONE']);

    await user.click(getByTestId('toggle-NONE'));

    expect(mockOnChange).toBeCalledWith([]);
  });

  it('Should render custom description', () => {
      const { getByText } = render(
        <Toggle
          options={{
            CAT: {
              title: 'Cat',
              description: 'Cat description'
            },
          }}
          onChange={mockOnChange}
        />
      );

    expect(getByText('Cat description')).toBeInTheDocument();
  });
});

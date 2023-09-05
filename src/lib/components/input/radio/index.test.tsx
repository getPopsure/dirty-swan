import { render } from '../../../util/testUtils';

import { Radio, RadioProps } from '.';

const mockOnChange = jest.fn();

const setup = (onChange: RadioProps<string>['onChange'], value?: string) => {
  const utils = render(
    <Radio
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

describe('Radio component', () => {
  it('Should render options', () => {
    const { getByText } = setup(mockOnChange);

    expect(getByText('Cat')).toBeInTheDocument();
    expect(getByText('Dog')).toBeInTheDocument();
    expect(getByText('None')).toBeInTheDocument();
  });

  it('Should call onchange on selecting an option', async () => {
    const { getByTestId, user } = setup(mockOnChange);

    await user.click(getByTestId('radio-DOG'));

    expect(mockOnChange).toBeCalledWith("DOG");
  });

  it('Should render checked items when value is passed', async () => {
    const { getByTestId } = setup(mockOnChange, 'CAT');

    expect(getByTestId('radio-input-CAT')).toBeChecked();
  });

  it('Should render custom description', () => {
      const { getByText } = render(
        <Radio
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

  it('Should render custom icon', () => {
      const { getByText } = render(
        <Radio
          options={{
            CAT: {
              title: 'Cat',
              icon: () => 'ICON'
            },
          }}
          onChange={mockOnChange}
        />
      );

    expect(getByText('ICON')).toBeInTheDocument();
  });

  it('Should render custom icon with selected', () => {
      const { getByText } = render(
        <Radio
          options={{
            CAT: {
              title: 'Cat',
              icon: (selected) => selected ? 'SELECTED-ICON' : 'ICON'
            },
          }}
          onChange={mockOnChange}
          value={'CAT'}
        />
      );

    expect(getByText('SELECTED-ICON')).toBeInTheDocument();
  });
});

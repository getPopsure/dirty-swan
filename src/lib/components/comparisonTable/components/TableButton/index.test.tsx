import { render } from '../../../../util/testUtils';
import '@testing-library/jest-dom';

import TableButton from '.';

const mockOnClick = jest.fn();

const buttonContent = "Table Button label";

const setup = () => render(
  <TableButton onClick={mockOnClick}>{buttonContent}</TableButton>
);

describe('TableButton component', () => {
  it("should render button content", () => {
    const { getByText } = setup();

    expect(getByText(buttonContent)).toBeInTheDocument();
  });

  it("should call onClick", async () => {
    const { getByText, user } = setup();

    await user.click(getByText(buttonContent));

    expect(mockOnClick).toHaveBeenCalled();
  });
});

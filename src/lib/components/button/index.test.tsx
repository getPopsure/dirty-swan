import { render, screen } from '../../util/testUtils';

import { Button } from '.';

const buttonContent = "Click here";

const FakeIcon = () => (
  <span>ABC</span>
)

const mockOnClick = jest.fn();

describe('Button component', () => {
  it('Should render content', () => {
    render(<Button>{buttonContent}</Button>);

    expect(screen.getByText(buttonContent)).toBeInTheDocument();
  });
  
  it('Should render leftIcon', () => {
    render(<Button leftIcon={<FakeIcon />}>{buttonContent}</Button>);

    expect(screen.getByText("ABC")).toBeInTheDocument();
  });
  
  it('Should render rightIcon', () => {
    render(<Button rightIcon={<FakeIcon />}>{buttonContent}</Button>);

    expect(screen.getByText("ABC")).toBeInTheDocument();
  });
  
  it('Should be disabled', () => {
    render(<Button disabled>{buttonContent}</Button>);

    expect(screen.getByTestId("button")).toBeDisabled();
  });
  
  it('Should show loading state', () => {
    render(<Button loading>{buttonContent}</Button>);

    expect(screen.getByTestId("button")).toHaveClass('p-btn--loading');
  });
  
  it('Should call onClick  clicked', async () => {
    const { user } = render(<Button onClick={mockOnClick}>{buttonContent}</Button>);

    await user.click(screen.getByText(buttonContent));

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  });
});

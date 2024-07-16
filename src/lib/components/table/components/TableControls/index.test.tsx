import { render, screen } from '../../../../util/testUtils';
import { TableControls, TableControlsProps } from '.';

const mockNavigateTable = jest.fn();

const defaultProps: TableControlsProps = {
  activeSection: 1,
  children: <div>Table content</div>,
  columnsLength: 3,
  stickyHeaderTopOffset: 0,
  navigateTable: mockNavigateTable,
};

describe('TableControls', () => {
  it('renders the previous and next section buttons', () => {
    render(<TableControls {...defaultProps} />);

    const previousButton = screen.getByText('Previous section');
    const nextButton = screen.getByText('Next section');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('disables the previous button when activeSection is 1', () => {
    render(<TableControls {...defaultProps} activeSection={1} />);

    const previousButton = screen.getByTestId('previous-section-button');

    expect(previousButton).toBeDisabled();
  });

  it('disables the next button when activeSection is equal to columnsLength - 1', () => {
    render(<TableControls {...defaultProps} activeSection={2} />);

    const nextButton = screen.getByTestId('next-section-button');

    expect(nextButton).toBeDisabled();
  });

  it('calls navigateTable with no arguments when previous button is clicked', async () => {
    const { user } = render(<TableControls {...defaultProps}  activeSection={2} />);

    await user.click(screen.getByTestId('previous-section-button'));

    expect(mockNavigateTable).toHaveBeenCalledWith();
  });

  it('calls navigateTable with true argument when next button is clicked', async () => {
    const { user } = render(<TableControls {...defaultProps} />);

    await user.click(screen.getByTestId('next-section-button'));

    expect(mockNavigateTable).toHaveBeenCalledWith(true);
  });
});

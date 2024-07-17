import { render, screen } from '../../../../util/testUtils';
import { TableCell } from './TableCell';

const openModal = jest.fn();

describe('TableCell', () => {
  it('renders the component with boolean true', () => {
    render(<TableCell boolean={true} />);

    expect(screen.getByTitle('Yes')).toBeInTheDocument();
    expect(screen.getByTestId('table-cell-boolean-yes')).toBeInTheDocument();
  });

  it('renders the component with boolean false', () => {
    render(<TableCell boolean={false} />);

    expect(screen.getByTitle('No')).toBeInTheDocument();
    expect(screen.getByTestId('table-cell-boolean-no')).toBeInTheDocument();
  });

  it('renders the component without boolean', () => {
    render(<TableCell />);

    expect(screen.queryByTitle('Yes')).not.toBeInTheDocument();
    expect(screen.queryByTitle('No')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('table-cell-boolean-yes')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('table-cell-boolean-no')
    ).not.toBeInTheDocument();
  });

  it('renders the component with rating', () => {
    render(<TableCell rating={{ type: 'star', value: 2 }} />);

    expect(screen.getByTitle('2 out of 3')).toBeInTheDocument();
  });

  it('renders the component without rating', () => {
    render(<TableCell />);

    expect(screen.queryByTestId('table-cell-rating')).not.toBeInTheDocument();
  });

  it('renders the component with text', () => {
    render(<TableCell text="Sample text" />);

    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });

  it('renders the component without text', () => {
    render(<TableCell />);

    expect(screen.queryByTestId('table-cell-text')).not.toBeInTheDocument();
  });

  it('renders the component without info', () => {
    render(<TableCell />);

    expect(screen.queryByText('View more info')).not.toBeInTheDocument();
  });

  it('calls openModal when info button is clicked', () => {
    render(<TableCell info="Additional information" openModal={openModal} />);

    // Click info button
    screen.getByText('View more info').click();

    // Assert openModal is called with info prop
    expect(openModal).toHaveBeenCalledWith('Additional information');
  });
});

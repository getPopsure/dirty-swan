import { render, screen } from '../../../../util/testUtils';
import { TableCell, TableCellProps } from './TableCell';

const openModal = jest.fn();

const setup = ({ isNavigation, ...rest }: TableCellProps = {}) =>
  render(
    isNavigation ? (
      <TableCell {...rest} isNavigation />
    ) : (
      <table>
        <tbody>
          <tr>
            <TableCell {...rest} />
          </tr>
        </tbody>
      </table>
    )
  );

describe('TableCell', () => {
  it('renders the component with boolean true', () => {
    setup({ checkmarkValue: true });

    expect(screen.getByTitle('Yes')).toBeInTheDocument();
    expect(screen.getByTestId('table-cell-boolean-yes')).toBeInTheDocument();
  });

  it('renders the component with boolean false', () => {
    setup({ checkmarkValue: false });

    expect(screen.getByTitle('No')).toBeInTheDocument();
    expect(screen.getByTestId('table-cell-boolean-no')).toBeInTheDocument();
  });

  it('renders the component without boolean', () => {
    setup();

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
    setup({ rating: { type: 'star', value: 2 } });

    expect(screen.getByTitle('2 out of 3')).toBeInTheDocument();
  });

  it('renders the component without rating', () => {
    setup();

    expect(screen.queryByTestId('table-cell-rating')).not.toBeInTheDocument();
  });

  it('renders the component with text', () => {
    setup({ text: 'Sample text' });

    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });

  it('renders the component without text', () => {
    setup();

    expect(screen.queryByTestId('table-cell-text')).not.toBeInTheDocument();
  });

  it('renders the component without info', () => {
    setup();

    expect(screen.queryByText('View more info')).not.toBeInTheDocument();
  });

  it('calls openModal when info button is clicked', () => {
    setup({ modalContent: 'Additional information', openModal });

    // Click info button
    screen.getByTestId('ds-table-info-button').click();

    // Assert openModal is called with info prop
    expect(openModal).toHaveBeenCalledWith('Additional information');
  });
});

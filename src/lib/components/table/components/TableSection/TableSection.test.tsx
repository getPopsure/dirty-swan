import { render, screen } from '../../../../util/testUtils';
import { TableSection, TableSectionProps } from './TableSection';

const tableCellRows: TableSectionProps['tableCellRows'] = [
  [{ text: 'Cell 1.1' }, { text: 'Cell 1.2' }, { text: 'Cell 1.3' }],
  [{ text: 'Cell 2.1' }, { text: 'Cell 2.2' }, { text: 'Cell 2.3' }],
];

const mockTitle = 'Test Table';

const mockOpenModal = jest.fn();

const defaultProps: TableSectionProps = {
  tableCellRows,
  title: mockTitle,
  openModal: mockOpenModal,
};

describe('TableSection', () => {
  it('renders the table caption', () => {
    render(<TableSection {...defaultProps} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('renders the table with correct data', () => {
    render(<TableSection {...defaultProps} />);

    expect(screen.getByText('Cell 1.1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1.2')).toBeInTheDocument();
    expect(screen.getByText('Cell 1.3')).toBeInTheDocument();

    expect(screen.getByText('Cell 2.1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2.2')).toBeInTheDocument();
    expect(screen.getByText('Cell 2.3')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    const { container } = render(<TableSection {...defaultProps} />);

    const thElements = container.querySelectorAll('th');

    expect(thElements.length).toBe(4);
    expect(thElements[0]).toHaveTextContent('Cell 1.1');
    expect(thElements[3]).toHaveTextContent('Cell 2.1');
  });

  it('should render table data cells', () => {
    const { container } = render(<TableSection {...defaultProps} />);

    const tdElements = container.querySelectorAll('td');
    expect(tdElements.length).toBe(2);
    expect(tdElements[0]).toHaveTextContent('Cell 2.2');
    expect(tdElements[1]).toHaveTextContent('Cell 2.3');
  });
});

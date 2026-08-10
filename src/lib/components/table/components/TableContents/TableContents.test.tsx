import { fireEvent, render, screen } from '../../../../util/testUtils';
import { TableContents, TableContentsProps } from './TableContents';

const mockData: TableContentsProps['tableData'] = [
  {
    rows: [
      [{ text: 'Item 1.1.1' }, { text: 'Item 1.1.2' }],
      [{ text: 'Item 1.2.1' }, { text: 'Item 1.2.2' }],
    ],
  },
  {
    section: {
      title: 'Section 2',
    },
    rows: [
      [{ text: 'Item 2.1.1' }, { text: 'Item 2.1.2' }],
      [{ text: 'Item 2.2.1' }, { text: 'Item 2.2.2' }],
    ],
  },
];

describe('TableContents', () => {
  it('renders the table sections with sections', () => {
    render(
      <TableContents collapsibleSections tableData={mockData} title="Table" />
    );

    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('renders the table sections with sections data', () => {
    render(
      <TableContents collapsibleSections tableData={mockData} title="Table" />
    );

    expect(screen.getByText('Item 1.2.1')).toBeInTheDocument();
    expect(screen.getByText('Item 1.2.2')).toBeInTheDocument();
    expect(screen.getByText('Item 2.1.2')).toBeInTheDocument();
    expect(screen.getByText('Item 2.2.1')).toBeInTheDocument();
  });

  it('renders collapsible section headers as buttons and toggles them', () => {
    render(
      <TableContents collapsibleSections tableData={mockData} title="Table" />
    );

    const sectionButton = screen.getByRole('button', { name: 'Section 2' });
    expect(sectionButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(sectionButton);
    expect(sectionButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders section headers without a button when not collapsible', () => {
    render(<TableContents tableData={mockData} title="Table" />);

    expect(
      screen.queryByRole('button', { name: 'Section 2' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('hides the table sections when hideDetails and shouldHideDetails is true', () => {
    render(
      <TableContents
        hideDetails
        shouldHideDetails
        tableData={mockData}
        title="Table"
      />
    );

    expect(screen.queryByText('Section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2.1.1')).not.toBeInTheDocument();
  });

  it('shows the header row only in the first section when showHeader is set', () => {
    const { container } = render(
      <TableContents showHeader tableData={mockData} title="Table" />
    );

    const tableHeaders = container.querySelectorAll('thead');
    expect(tableHeaders).toHaveLength(2);
    expect(tableHeaders[0]).not.toHaveClass('sr-only');
    expect(tableHeaders[1]).toHaveClass('sr-only');
  });

  it('keeps every header row hidden when showHeader is not set', () => {
    const { container } = render(
      <TableContents tableData={mockData} title="Table" />
    );

    container.querySelectorAll('thead').forEach((tableHeader) => {
      expect(tableHeader).toHaveClass('sr-only');
    });
  });
});

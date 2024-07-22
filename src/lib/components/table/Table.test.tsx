import { render, screen } from '../../util/testUtils';
import { Table } from './Table';
import { TableSectionData } from './types';

const tableData: TableSectionData[] = [
  {
    section: {
      title: 'Section 1',
      icon: <span>Icon 1</span>,
    },
    rows: [[{ text: 'Item 1' }, { text: 'Item 2' }]],
  },
  {
    section: {
      title: 'Section 2',
      icon: <span>Icon 2</span>,
    },
    rows: [
      [{ text: 'Item 3' }, { text: 'Item 4', modalContent: 'Additional item' }],
    ],
  },
];

describe('Table', () => {
  it('renders the table with sections and items', () => {
    render(<Table tableData={tableData} title="Test Table" />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();

    expect(screen.getAllByText('Item 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Item 2')[0]).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('Item 4')).toBeInTheDocument();
  });

  it('renders the table without sections', () => {
    const dataWithoutSections = [{ rows: tableData[0].rows }];

    render(<Table tableData={dataWithoutSections} title="Test Table" />);

    expect(screen.getAllByText('Item 1')[0]).toBeVisible();
    expect(screen.getAllByText('Item 2')[0]).toBeVisible();
  });

  it('hides the show/hide details button if hideDetails is false', () => {
    render(<Table tableData={tableData} hideDetails title="Test Table" />);

    expect(screen.queryByTestId('show-hide-details')).toBeInTheDocument();
  });

  it('shows the show/hide details button if hideDetails is true', () => {
    render(<Table tableData={tableData} hideDetails title="Test Table" />);

    expect(screen.getByTestId('show-hide-details')).toBeInTheDocument();
  });

  it('hides the sections if hideDetails is true', () => {
    render(<Table tableData={tableData} hideDetails title="Test Table" />);

    expect(screen.queryByText('Section 2')).not.toBeInTheDocument();
    expect(screen.getByTestId('show-hide-details')).toBeInTheDocument();
  });

  it('hides the sections if hideDetails is true and shows if clicking on button', async () => {
    const { user } = render(
      <Table tableData={tableData} hideDetails title="Test Table" />
    );

    expect(screen.getByText('Show details')).toBeVisible();

    await user.click(screen.getByTestId('show-hide-details'));

    expect(screen.getByText('Section 2')).toBeVisible();
    expect(screen.getByText('Hide details')).toBeVisible();
  });

  it('shows a modal when clicking on info icon', async () => {
    const { user } = render(<Table tableData={tableData} title="Test Table" />);

    await user.click(screen.getByTestId('ds-table-info-button'));

    expect(screen.getByText('Additional item')).toBeVisible();
  });
});

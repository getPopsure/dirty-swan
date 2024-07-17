import { render, screen } from '../../../../util/testUtils';
import { TableSection, TableSectionProps } from './TableSection';

const mockData: TableSectionProps['tableData'] = [
  {
    rows: [
      [{ content: 'Item 1.1.1' }, { content: 'Item 1.1.2' }],
      [{ content: 'Item 1.2.1' }, { content: 'Item 1.2.2' }],
    ],
  },
  {
    section: {
      title: 'Section 2',
    },
    rows: [
      [{ content: 'Item 2.1.1' }, { content: 'Item 2.1.2' }],
      [{ content: 'Item 2.2.1' }, { content: 'Item 2.2.2' }],
    ],
  },
];

describe('TableSection', () => {
  it('renders the table sections with sections', () => {
    render(
      <TableSection collapsibleSections tableData={mockData} title="Table" />
    );

    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('renders the table sections with sections data', () => {
    render(
      <TableSection collapsibleSections tableData={mockData} title="Table" />
    );

    expect(screen.getByText('Item 1.2.1')).toBeInTheDocument();
    expect(screen.getByText('Item 1.2.2')).toBeInTheDocument();
    expect(screen.getByText('Item 2.1.2')).toBeInTheDocument();
    expect(screen.getByText('Item 2.2.1')).toBeInTheDocument();
  });

  it('hides the table sections when hideDetails and shouldHideDetails is true', () => {
    render(
      <TableSection
        hideDetails
        shouldHideDetails
        tableData={mockData}
        title="Table"
      />
    );

    expect(screen.queryByText('Section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2.1.1')).not.toBeInTheDocument();
  });

  it('hides the table sections details when collapsibleSections is true', () => {
    render(
      <TableSection
        collapsibleSections
        isMobile
        tableData={mockData}
        title="Table"
      />
    );

    expect(screen.getByText('Section 2')).toBeVisible();
    expect(screen.queryByText('Item 2.1.1')).not.toBeVisible();
  });

  it('shows the table sections when hideDetails is collapsibleSections true has expanded ', async () => {
    const { user } = render(
      <TableSection
        collapsibleSections
        isMobile
        tableData={mockData}
        title="Table"
      />
    );

    expect(screen.queryByText('Item 2.1.1')).not.toBeVisible();

    await user.click(screen.getByText('Section 2'));

    expect(screen.getByText('Item 2.1.1')).toBeVisible();
  });
});

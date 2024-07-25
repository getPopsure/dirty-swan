import { render, screen } from '../../../../util/testUtils';
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

  it('shows the table sections when hideDetails is collapsibleSections true has expanded ', async () => {
    const { user } = render(
      <TableContents
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

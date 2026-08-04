import { Table, TableProps } from './Table';
import { DentalPlusIcon, PlaneIcon } from '../icon';
import { TableData } from './types';
import { useState } from 'react';
import { Input } from '../input';

const initialData: TableData = [
  {
    rows: [
      [
        { text: 'Our plans' },
        {
          type: 'CTA',
          icon: 'https://placehold.co/24x24/orange/white',
          title: 'Standard',
          price: '€234',
          buttonCaption: 'Get covered',
          href: 'http://example.com',
        },
        {
          type: 'CTA',
          icon: 'https://placehold.co/24x24/green/white',
          title: 'Plus',
          price: '€344',
          buttonCaption: 'Get covered',
          href: 'http://example.com',
        },
        {
          type: 'CTA',
          icon: <PlaneIcon size={24} noMargin />,
          title: 'Premium',
          price: '€556',
          buttonCaption: 'Get covered',
          href: 'http://example.com',
        },
      ],
      [
        { text: 'Select a plan' },
        {
          type: 'BUTTON',
          buttonCaption: 'Standard',
          price: '€234',
          onClick: () => {},
        },
        {
          type: 'BUTTON',
          buttonCaption: 'Plus',
          price: '€344',
          onClick: () => {},
        },
        {
          type: 'BUTTON',
          buttonCaption: 'Premium',
          price: '€556',
          onClick: () => {},
        },
      ],
      [
        {
          text: 'Your contribution',
        },
        {
          cellId: '#1',
          text: '€210',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
        {
          cellId: '#2',
          text: '€275',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
        {
          cellId: '#3',
          text: '€310',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
      ],
      [
        {
          text: 'Regular vet visits & medication',
          description: 'Pflegepflichtversicherungrightno',
          modalContent: 'Some stories about vets',
        },
        { text: 'No', description: 'Annual Only' },
        { text: '50%' },
        { text: '80%-100%' },
      ],
      [
        {
          text: 'Operations',
          modalContent: 'Operations info',
          modalTitle: 'Custom operations modal title',
        },
        {
          checkmarkValue: true,
          modalContent: 'Operations info column 2',
          modalTitle: 'Custom operations modal title column 2',
        },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { text: 'Rating', modalContent: 'Rating info' },
        { rating: { type: 'zap', value: 1 } },
        {
          rating: { type: 'zap', value: 3 },
          modalContent: 'Rating info column 3',
        },
        { rating: { type: 'star', value: 3 } },
      ],
    ],
  },
  {
    section: {
      title: 'Dental',
    },
    rows: [
      [
        { text: 'Regular vet visits & medication' },
        { text: 'No' },
        { text: 'Yes' },
        { text: 'Yes' },
      ],
      [
        { text: 'Operations', modalContent: 'info' },
        {
          text: 'This is a table cell with a lot of text',
          modalContent: 'Maybe',
        },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        {
          type: 'CARD',
          colSpan: 3,
          title: 'Dental add-on',
          href: 'https://example.com',
          icon: 'https://placehold.co/24x24/green/yellow',
          description:
            'Get your dental cleanings and additional treatments covered for just 10.90€ a month.',
        },
      ],
    ],
  },
  {
    section: {
      title: 'Travel',
      icon: 'https://placehold.co/24x24/red/yellow',
    },
    rows: [
      [
        { text: 'Regular vet visits & medication' },
        { text: 'No', checkmarkValue: false },
        { text: 'Yes' },
        { text: 'Yes' },
      ],
      [
        { text: 'Operations', modalContent: 'info' },
        {
          checkmarkValue: true,
          modalContent: 'Maybe',
          description: 'This is a table cell with a long subtitle',
        },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { text: 'Rating', modalContent: 'info' },
        { rating: { type: 'zap', value: 1 }, modalContent: 'Maybe' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
    ],
  },
];

const story = {
  title: 'JSX/Table',
  component: Table,
  argTypes: {
    tableData: {
      subContent:
        'This property allows to set the data of the Table component.',
    },
    title: {
      subContent:
        'This property allows to add a title to the Table component for accessibility purposes.',
    },
    collapsibleSections: {
      subContent: 'This property allows to collapse the sections of the table.',
    },
    scrollOnOpen: {
      subContent:
        'When enabled, the page scrolls to the top of a newly expanded section.',
    },
    scrollTopOffset: {
      subContent:
        'Offset in pixels from the top of the viewport when scrolling to an expanded section.',
    },
    hideDetails: {
      subContent: 'This property allows to hide the details of the table.',
    },
    hideStickyHeader: {
      subContent:
        'This property allows to hide the sticky header row on desktop, e.g. for single plan tables without a plan selector.',
    },
    stickyHeaderTopOffset: {
      subContent:
        'This property allows to set the offset of the sticky header.',
    },
    className: {
      subContent:
        'This property allows to set a custom class to the Table component.',
    },
    textOverrides: {
      subContent:
        'This property allows to set custom text for the show and hide details buttons.',
    },
    hideColumns: {
      subContent: 'This property allows to hide defined columns by index.',
    },
    hideRows: {
      subContent: 'This property allows to hide selected rows by index.',
    },
    modalContentRenderer: {
      subContent: 'This property allows to render custom modal content.',
    },
    onSelectionChanged: {
      subContent:
        'This event is triggered when a selection is changed. It receives the index of the selection as an argument.',
      table: {
        category: 'Events',
      },
    },
    onModalOpen: {
      subContent:
        'This event is triggered when a modal is opened. It receives the title and body of the modal as arguments.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    tableData: initialData,
    collapsibleSections: true,
    scrollOnOpen: true,
    scrollTopOffset: 0,
    hideDetails: false,
    stickyHeaderTopOffset: 0,
    title: 'Title of the table',
    className: '',
    textOverrides: {
      showDetails: 'Show details',
      hideDetails: 'Hide details',
    },
    hideColumns: [],
    hideRows: [],
    hideTableNavigation: true,
    showSelectedColumn: false,
  },
};

export const TableStory = {
  render: ({
    collapsibleSections,
    scrollOnOpen,
    scrollTopOffset,
    tableData,
    hideColumns,
    hideDetails,
    hideRows,
    stickyHeaderTopOffset,
    textOverrides,
    title,
    activeSection,
    hideTableNavigation,
    showSelectedColumn,
  }: TableProps) => {
    const [price, setPrice] = useState(999);
    return (
      <div>
        <div className="d-flex fd-column p24 mb80 gap16 wmx5">
          <label htmlFor="">Change price to see replacement in action: </label>
          <Input
            id="#stuff"
            type="text"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </div>

        <Table
          cellReplacements={{
            '#1': {
              type: 'CTA',
              title: 'Replaced!',
              price: `€${price}`,
              buttonCaption: 'I got replaced',
              href: 'http://example.com',
            },
            '#2': {
              type: 'BUTTON',
              buttonCaption: 'I got replaced too',
            },
            '#3': {
              description: 'per year',
            },
          }}
          collapsibleSections={collapsibleSections}
          scrollOnOpen={scrollOnOpen}
          scrollTopOffset={scrollTopOffset}
          tableData={tableData}
          hideColumns={hideColumns}
          hideDetails={hideDetails}
          hideRows={hideRows}
          stickyHeaderTopOffset={stickyHeaderTopOffset}
          textOverrides={textOverrides}
          title={title}
          activeSection={activeSection}
          hideTableNavigation={hideTableNavigation}
          showSelectedColumn={showSelectedColumn}
        />
      </div>
    );
  },

  name: 'Table',
};

const singlePlanData: TableData = [
  {
    rows: [
      [{ text: '' }, { text: '' }],
      [
        { text: 'Price' },
        {
          text: '€9.99',
          description: 'With monthly cancellation',
          fontVariant: 'PRICE',
        },
      ],
      [
        {
          text: 'Regular vet visits & medication',
          modalContent: 'Some stories about vets',
        },
        { text: 'Up to €1 million' },
      ],
      [
        {
          text: 'Specialist visits',
          modalContent: 'Some stories about specialists',
        },
        { text: '4 visits per year' },
      ],
      [{ text: 'Medication' }, { text: '80% covered' }],
      [{ text: 'Grooming' }, { checkmarkValue: false }],
      [{ text: 'Boarding fees' }, { checkmarkValue: false }],
      [
        {
          text: 'Alternative treatments',
          description: 'E.g. physiotherapy, hydrotherapy',
        },
        { checkmarkValue: false },
      ],
    ],
  },
  {
    section: {
      title: 'Dental',
    },
    rows: [
      [{ text: 'Dental cleanings' }, { text: 'Up to €500' }],
      [{ text: 'Dental treatments' }, { text: 'Up to €500' }],
      [{ text: 'Operations' }, { checkmarkValue: true }],
    ],
  },
  {
    section: {
      title: 'Travel',
    },
    rows: [
      [{ text: 'Trips abroad' }, { checkmarkValue: true }],
      [{ text: 'Emergency care abroad' }, { checkmarkValue: true }],
    ],
  },
  {
    section: {
      title: 'Add-ons',
    },
    rows: [
      [{ text: 'Extended coverage' }, { checkmarkValue: true }],
      [{ text: 'Equipment protection' }, { checkmarkValue: true }],
    ],
  },
];

export const SinglePlanQuoteTable = {
  render: () => (
    <div style={{ maxWidth: 756 }}>
      <Table
        tableData={singlePlanData}
        title="Single plan quote"
        collapsibleSections
        hideTableNavigation
        hideStickyHeader
        showSelectedColumn
      />
    </div>
  ),

  name: 'Single Plan Quote',
};

const singlePlanWebsiteData: TableData = [
  {
    rows: [
      [
        { text: 'Our plans' },
        {
          type: 'CTA',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: 'http://example.com',
        },
      ],
      [
        { text: 'Monthly price' },
        {
          text: '~€99',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
      ],
      [
        { text: 'Label with a description value' },
        { text: 'Value', description: 'Value description' },
      ],
      [
        {
          text: 'Label with a long text that wraps into multiple lines in the table',
        },
        {
          checkmarkValue: true,
          modalContent: 'Checkmark info',
        },
      ],
      [
        {
          text: 'Label with a boolean value',
        },
        { checkmarkValue: false },
      ],
      [
        {
          text: 'Label with info',
          modalContent: 'Label info',
        },
        { text: 'Text value' },
      ],
    ],
  },
  {
    section: {
      title: 'First section',
    },
    rows: [
      [{ text: 'Row label' }, { checkmarkValue: true }],
      [{ text: 'Row label' }, { checkmarkValue: true }],
      [{ text: 'Row label' }, { checkmarkValue: true }],
    ],
  },
  {
    section: {
      title: 'Second section',
    },
    rows: [
      [{ text: 'Row label' }, { checkmarkValue: true }],
      [{ text: 'Row label' }, { checkmarkValue: false }],
    ],
  },
  {
    section: {
      title: 'Third section',
    },
    rows: [
      [
        { text: 'Row label' },
        { text: 'Up to €1,500', description: 'Value description' },
      ],
    ],
  },
  {
    section: {
      title: 'Fourth section',
    },
    rows: [
      [{ text: 'Row label' }, { checkmarkValue: true }],
      [{ text: 'Row label' }, { checkmarkValue: true }],
    ],
  },
  {
    section: {
      title: 'Fifth section',
    },
    rows: [
      [{ text: 'Row label' }, { checkmarkValue: true }],
      [{ text: 'Row label' }, { checkmarkValue: true }],
    ],
  },
  {
    section: {
      title: 'Sixth section',
    },
    rows: [
      [{ text: 'Row label' }, { text: 'Up to €5,000' }],
      [{ text: 'Row label' }, { checkmarkValue: true }],
    ],
  },
];

export const SinglePlanQuoteWebsite = {
  render: () => (
    <div style={{ maxWidth: 756 }}>
      <Table
        tableData={singlePlanWebsiteData}
        title="Single plan quote website"
        collapsibleSections
      />
    </div>
  ),

  name: 'Single Plan - Website',
};

const twoPlanWebsiteData: TableData = [
  {
    rows: [
      [
        { text: 'Our plans' },
        {
          type: 'CTA',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: 'http://example.com',
        },
        {
          type: 'CTA',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: 'http://example.com',
        },
      ],
      [
        {
          text: 'Monthly price',
          description: 'Label description with additional pricing context',
        },
        { text: '~€14-35', fontVariant: 'PRICE', modalContent: 'Price info' },
        { text: '~€50-91', fontVariant: 'PRICE', modalContent: 'Price info' },
      ],
      [
        {
          text: 'Label with info',
          modalContent: 'Label info',
        },
        { text: 'Text value' },
        { text: 'Text value' },
      ],
      [
        {
          text: 'Label with info',
          modalContent: 'Label info',
        },
        { text: 'Text value', modalContent: 'Value info' },
        { text: 'Text value', modalContent: 'Value info' },
      ],
      [
        { text: 'Label with a boolean value' },
        { checkmarkValue: true, description: 'Value description' },
        { checkmarkValue: true, description: 'Value description' },
      ],
    ],
  },
  {
    section: {
      title: 'First section',
    },
    rows: [
      [
        { text: 'Row label' },
        { text: 'Up to €1,500' },
        { text: 'Up to €3,000' },
      ],
    ],
  },
  {
    section: {
      title: 'Second section',
    },
    rows: [
      [
        { text: 'Row label', description: 'Row label description' },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
      [
        { text: 'Row label' },
        { checkmarkValue: false },
        { checkmarkValue: false },
      ],
      [
        { text: 'Row label', description: 'Row label description' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { text: 'Row label' },
        { text: 'Text value' },
        { checkmarkValue: true },
      ],
      [
        { text: 'Row label' },
        { text: 'Text value', description: 'Value description' },
        { text: 'Text value', description: 'Value description' },
      ],
    ],
  },
  {
    section: {
      title: 'Third section',
    },
    rows: [
      [
        { text: 'Row label' },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
    ],
  },
  {
    section: {
      title: 'Fourth section',
    },
    rows: [
      [
        { text: 'Row label' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
    ],
  },
  {
    section: {
      title: 'Fifth section',
    },
    rows: [
      [
        { text: 'Row label' },
        { text: 'Text value' },
        { text: 'Text value' },
      ],
    ],
  },
];

export const TwoPlanQuoteWebsite = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Table
        tableData={twoPlanWebsiteData}
        title="Two plan quote website"
        collapsibleSections
      />
    </div>
  ),

  name: 'Two Plan - Website',
};

const twoPlanQuoteData: TableData = [
  {
    rows: [
      [
        { text: 'Select a plan' },
        {
          type: 'BUTTON',
          buttonCaption: 'Basic',
          price: '€99/mo',
          isSelected: true,
          onClick: () => {},
        },
        {
          type: 'BUTTON',
          buttonCaption: 'Advanced',
          price: '€134/mo',
          onClick: () => {},
        },
      ],
      [
        { text: 'Your contribution' },
        { text: '€99', description: 'per month', fontVariant: 'PRICE' },
        { text: '€134', description: 'per month', fontVariant: 'PRICE' },
      ],
      [
        { text: 'Outpatient treatments', modalContent: 'Outpatient info' },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
      [
        { text: 'Inpatient treatments', modalContent: 'Inpatient info' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { text: 'Dental care', modalContent: 'Dental info' },
        { text: '50%' },
        { text: '80%' },
      ],
    ],
  },
  {
    section: {
      title: 'Coverage details',
    },
    rows: [
      [
        { text: 'Annual limit' },
        { text: 'Up to €10,000' },
        { text: 'Unlimited' },
      ],
      [
        { text: 'Deductible' },
        { text: '€500' },
        { text: '€250' },
      ],
      [
        { text: 'Preventive care' },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
      [
        { text: 'Alternative medicine' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
    ],
  },
];

export const TwoPlanQuote = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Table
        tableData={twoPlanQuoteData}
        title="Two plan quote"
        collapsibleSections
        showSelectedColumn
      />
    </div>
  ),

  name: 'Two Plan Quote',
};

const threePlanWebsiteData: TableData = [
  {
    rows: [
      [
        { text: 'Our plans' },
        {
          type: 'CTA',
          icon: 'https://placehold.co/24x24/green/white',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: '',
          onClick: () => {},
        },
        {
          type: 'CTA',
          icon: 'https://placehold.co/24x24/blue/white',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: '',
          onClick: () => {},
        },
        {
          type: 'CTA',
          icon: 'https://placehold.co/24x24/orange/white',
          title: 'Plan name',
          buttonCaption: 'Get a quote',
          href: '',
          onClick: () => {},
        },
      ],
      [
        { text: 'Monthly price' },
        { text: '€–', fontVariant: 'PRICE', modalContent: 'Price info' },
        { text: '€–', fontVariant: 'PRICE', modalContent: 'Price info' },
        { text: '€–', fontVariant: 'PRICE', modalContent: 'Price info' },
      ],
      [
        { text: 'Label with star rating' },
        { rating: { type: 'star', value: 2 }, modalContent: 'Rating info' },
        { rating: { type: 'star', value: 3 } },
        { rating: { type: 'star', value: 3 } },
      ],
      [
        { text: 'Label with zap rating' },
        { rating: { type: 'zap', value: 3 } },
        { rating: { type: 'zap', value: 3 }, modalContent: 'Rating info' },
        { rating: { type: 'zap', value: 3 }, modalContent: 'Rating info' },
      ],
      [
        { text: 'Label with info', modalContent: 'Label info' },
        { checkmarkValue: true },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
      [
        { text: 'Label with progress bar' },
        { text: '100%' },
        { text: '70%' },
        { text: '100%' },
      ],
    ],
  },
  {
    section: {
      title: 'First section',
    },
    rows: [
      [
        { text: 'Row label with info', modalContent: 'Label info' },
        { text: 'Up to €2 million' },
        { text: 'Up to €1.5 million' },
        { text: 'Up to €1.5 million' },
      ],
      [
        { text: 'Row label with info', modalContent: 'Label info' },
        { text: 'Text value' },
        { text: 'Text value' },
        { text: 'Text value' },
      ],
      [
        { text: 'Row label' },
        { text: '80% covered' },
        { text: '80% covered' },
        { text: '80% covered' },
      ],
      [
        { text: 'Row label' },
        { checkmarkValue: false },
        { checkmarkValue: false },
        { checkmarkValue: false },
      ],
      [
        { text: 'Row label' },
        { checkmarkValue: false },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
      [
        { text: 'Row label' },
        { checkmarkValue: true },
        { checkmarkValue: true },
        { checkmarkValue: true },
      ],
    ],
  },
];

export const ThreePlanQuoteWebsite = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Table
        tableData={threePlanWebsiteData}
        title="Three plan quote website"
        collapsibleSections
      />
    </div>
  ),

  name: 'Three Plan - Website',
};

export const TableDataType = () => {
  return (
    <pre>
      {`
type TableData = {
  section?: 
    title?: string;
    icon?: ReactNode;
  };
  rows: {
    align?: 'center' | 'left' | 'right';
    checkmarkValue?: boolean;
    text?: ReactNode;
    modalContent?: ReactNode;
    subContent?: ReactNode;
    rating?: {
      value: number;
      type: 'zap' | 'star';
    }
    openModal?: (modalContent: ReactNode) => void;
  }[][];
}[];
      `}
    </pre>
  );
};

export default story;

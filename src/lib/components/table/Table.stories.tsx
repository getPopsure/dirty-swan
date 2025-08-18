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
        { text: 'Operations',
          modalContent: 'Operations info',
          modalTitle: 'Custom operations modal title'
         },
        { 
          checkmarkValue: true,
          modalContent: 'Operations info column 2',
          modalTitle: 'Custom operations modal title column 2'
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
      icon: <DentalPlusIcon size={20} noMargin />,
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
    hideDetails: {
      subContent: 'This property allows to hide the details of the table.',
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
    collapsibleSections: false,
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
  },
};

export const TableStory = ({
  collapsibleSections,
  tableData,
  hideColumns,
  hideDetails,
  hideRows,
  stickyHeaderTopOffset,
  textOverrides,
  title,
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
        tableData={tableData}
        hideColumns={hideColumns}
        hideDetails={hideDetails}
        hideRows={hideRows}
        stickyHeaderTopOffset={stickyHeaderTopOffset}
        textOverrides={textOverrides}
        title={title}
      />
    </div>
  );
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

TableStory.storyName = 'Table';

export default story;

import { Table, TableProps } from './Table';
import { DentalPlusIcon, PlaneIcon } from '../icon';
import { TableCellData, TableData } from './types';

const initialData: TableData = [
  {
    rows: [
      [
        { text: 'Our plans' },
        {
          type: 'CTA',
          title: 'Standard',
          price: '€234',
          buttonCaption: 'Get covered',
          href: 'http://example.com',
        },
        {
          type: 'CTA',
          title: 'Plus',
          price: '€344',
          buttonCaption: 'Get covered',
          href: 'http://example.com',
        },
        {
          type: 'CTA',
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
          text: '€210',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
        {
          text: '€275',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
        {
          text: '€310',
          description: 'per month',
          fontVariant: 'PRICE',
          modalContent: 'Price info',
        },
      ],
      [
        {
          text: 'Regular vet visits & medication',
          description: 'Annual Only',
          modalContent: 'Some stories about vets',
        },
        { text: 'No', description: 'Annual Only' },
        { text: '50%' },
        { text: '80%-100%' },
      ],
      [
        { text: 'Operations', modalContent: 'Operations info' },
        { checkmarkValue: true, modalContent: 'Operations info column 2' },
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
      icon: <DentalPlusIcon size={24} noMargin />,
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
        { checkmarkValue: true, modalContent: 'Maybe' },
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
  {
    section: {
      title: 'Travel',
      icon: <PlaneIcon size={24} noMargin />,
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
        { checkmarkValue: true, modalContent: 'Maybe' },
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
    data: {
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
  },
};

export const TableStory = ({
  collapsibleSections,
  tableData,
  hideDetails,
  stickyHeaderTopOffset,
  textOverrides,
  title,
}: TableProps) => (
  <Table
    collapsibleSections={collapsibleSections}
    tableData={tableData}
    hideDetails={hideDetails}
    stickyHeaderTopOffset={stickyHeaderTopOffset}
    textOverrides={textOverrides}
    title={title}
  />
);

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

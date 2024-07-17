import { Table, TableData, TableProps } from './Table';
import { DentalPlusIcon, PlaneIcon } from '../icon';

const initialData: TableData = [
  {
    rows: [
      [
        { content: 'Our plans' },
        { content: 'Surgery', modalContent: 'More info on surgery' },
        { content: 'Standard' },
        { content: 'Premium' },
      ],
      [
        {
          content: 'Regular vet visits & medication',
          subContent: 'Annual Only',
        },
        { content: 'No', subContent: 'Annual Only' },
        { content: 'Yes' },
        { content: 'Yes' },
      ],
      [
        { content: 'Operations', modalContent: 'Operations info' },
        { checkmarkValue: true, modalContent: 'Operations info column 2' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { content: 'Rating', modalContent: 'Rating info' },
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
        { content: 'Regular vet visits & medication' },
        { content: 'No' },
        { content: 'Yes' },
        { content: 'Yes' },
      ],
      [
        { content: 'Operations', modalContent: 'info' },
        { checkmarkValue: true, modalContent: 'Maybe' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { content: 'Rating', modalContent: 'info' },
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
        { content: 'Regular vet visits & medication' },
        { content: 'No', checkmarkValue: false },
        { content: 'Yes' },
        { content: 'Yes' },
      ],
      [
        { content: 'Operations', modalContent: 'info' },
        { checkmarkValue: true, modalContent: 'Maybe' },
        { checkmarkValue: false },
        { checkmarkValue: true },
      ],
      [
        { content: 'Rating', modalContent: 'info' },
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
    data: initialData,
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
    content?: ReactNode;
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

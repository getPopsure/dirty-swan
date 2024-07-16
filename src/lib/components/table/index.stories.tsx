import { Table, TableData, TableProps } from '.';
import { DentalPlusIcon, PlaneIcon } from '../icon';

const initialData: TableData = [
  {
    items: [
      [
        { text: 'Our plans' },
        { text: 'Surgery', info: 'More info on this one he' },
        { text: 'Standard' },
        { text: 'Premium' },
      ],
      [
        { text: 'Regular vet visits & medication', description: 'Annual Only' },
        { text: 'No', description: 'Annual Only' },
        { text: 'Yes' },
        { text: 'Yes' },
      ],
      [
        { text: 'Operations', info: 'info' },
        { boolean: true, info: 'Maybe' },
        { boolean: false },
        { boolean: true },
      ],
      [
        { text: 'Rating', info: 'info' },
        { rating: { type: 'zap', value: 1}, info: 'Maybe' },
        { rating: { type: 'zap', value: 3} },
        { rating: { type: 'star', value: 3} },
      ]
    ]
  },
  {
    section: {
      icon: <DentalPlusIcon size={24} noMargin />,
      title: 'Dental',
    },
    items: [
      [
        { text: 'Regular vet visits & medication' },
        { text: 'No' },
        { text: 'Yes' },
        { text: 'Yes' },
      ],
      [
        { text: 'Operations', info: 'info' },
        { boolean: true, info: 'Maybe' },
        { boolean: false },
        { boolean: true },
      ],
      [
        { text: 'Rating', info: 'info' },
        { rating: { type: 'zap', value: 1}, info: 'Maybe' },
        { rating: { type: 'zap', value: 3} },
        { rating: { type: 'star', value: 3} },
      ]
    ]
  },
  {
    section: {
      title: 'Travel',
      icon: <PlaneIcon size={24} noMargin />,
    },
    items: [
      [
        { text: 'Regular vet visits & medication' },
        { text: 'No', boolean: false },
        { text: 'Yes' },
        { text: 'Yes' },
      ],
      [
        { text: 'Operations', info: 'info' },
        { boolean: true, info: 'Maybe' },
        { boolean: false },
        { boolean: true },
      ],
      [
        { text: 'Rating', info: 'info' },
        { rating: { type: 'zap', value: 1}, info: 'Maybe' },
        { rating: { type: 'zap', value: 3} },
        { rating: { type: 'star', value: 3} },
      ]
    ]
  }
];

const story = {
  title: 'JSX/Table',
  component: Table,
  argTypes: {
    data: {
      description: 'This property allows to set the data of the Table component.'
    },
    title: {
      description: 'This property allows to add a title to the Table component for accessibility purposes.'
    },
    collapsibleSections: {
      description: 'This property allows to collapse the sections of the table.'
    },
    hideDetails: {
      description: 'This property allows to hide the details of the table.'
    },
    stickyHeaderTopOffset: {
      description: 'This property allows to set the offset of the sticky header.'
    },
    className: {
      description: 'This property allows to set a custom class to the Table component.'
    },
    textOverrides: {
      description: 'This property allows to set custom text for the show and hide details buttons.'
    },
    onSelectionChanged: {
      description: 'This event is triggered when a selection is changed. It receives the index of the selection as an argument.',
      table: {
        category: 'Events'
      }
    },
    onModalOpen: {
      description: 'This event is triggered when a modal is opened. It receives the title and body of the modal as arguments.',
      table: {
        category: 'Events'
      }
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
    }
  }
};

export const TableStory = ({
  collapsibleSections,
  data,
  hideDetails,
  stickyHeaderTopOffset,
  textOverrides,
  title
}: TableProps) => (
  <Table
    collapsibleSections={collapsibleSections}
    data={data}
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
  items: {
    align?: 'center' | 'left' | 'right';
    boolean?: boolean;
    cellProps?: HTMLProps<HTMLTableCellElement>;
    description?: ReactNode;
    info?: ReactNode;
    rating?: {
      value: number;
      type: 'zap' | 'star';
    }
    text?: ReactNode;
    openModal?: (info: ReactNode) => void;
  }[][];
}[];
      `}
    </pre>
  )
}

TableStory.storyName = "Table";

export default story;


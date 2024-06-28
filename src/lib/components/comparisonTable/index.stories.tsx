import { ComparisonTable, ComparisonTableProps, TableButton, TableRating, TableRowHeader, TableTrueFalse } from '.';
import { CardButton } from '../cards';

const headers = [
  {
    id: 1,
    default: true,
    cells: [
      {
        id: 1,
        key: 'name',
        label: 'Films',
        render: (value: string) => (
          <TableButton onClick={() => {}}>{value}</TableButton>
        ),
      },
      {
        id: 2,
        key: 'country',
        label: 'Country',
      },
      {
        id: 4,
        key: 'imdb',
        label: 'IMDB rating',
        render: (value: string) => (
          <TableButton onClick={() => {}}>{value}</TableButton>
        ),
      },
      {
        id: 3,
        key: 'rating',
        label: (
          <TableRowHeader
            label="Our rating of movies found online on IMDB lists"
            onClickInfo={() => {}}
          />
        ),
        render: (value: number) => (
          <TableButton onClick={() => {}}>
            <TableRating type="star" rating={value} />
          </TableButton>
        ),
      },
      {
        id: 5,
        key: 'recommended',
        label: (
          <TableRowHeader
            label="Recommended"
            subtitle="Our favourites"
            onClickInfo={() => {}}
          />
        ),
        render: (value: number) => <TableRating type="zap" rating={value} />,
      },
      {
        id: 5,
        key: 'familyFriendly',
        label: 'Family friendly',
        render: (value: boolean) => <TableTrueFalse value={value} />,
      },
      {
        id: 6,
        key: 'boxOffice',
        label: 'Box office',
        render: (value: number) =>
          value.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
      },
    ],
  },
  {
    id: 2,
    label: 'SUBSECTION',
    cells: [
      {
        id: 1,
        key: 'name',
        label: 'Films',
      },
      {
        id: 2,
        key: 'country',
        label: 'Country',
      },
      {
        id: 4,
        key: 'imdb',
        label: 'IMDB rating',
      },
      {
        id: 3,
        key: 'rating',
        label: 'Our rating',
        render: (value: number) => <TableRating type="star" rating={value} />,
      },
      {
        id: 5,
        key: 'recommended',
        label: 'Recommended',
        render: (value: number) => <TableRating type="zap" rating={value} />,
      },
      {
        id: 5,
        key: 'familyFriendly',
        label: 'Family friendly',
        render: (value: boolean) => <TableTrueFalse value={value} />,
      },
      {
        id: 6,
        key: 'boxOffice',
        label: 'Box office',
        render: (value: number) =>
          value.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
      },
      {
        addonId: 'addon-movies',
        label: (
          <CardButton
            title="All Review"
            description="Click here to read all reviews"
            onClick={() => {}}
          />
        ),
      },
    ],
  },
  {
    id: 3,
    label: 'SUBSECTION 2',
    cells: [
      {
        id: 1,
        key: 'name',
        label: 'Films',
      },
      {
        id: 2,
        key: 'country',
        label: 'Country',
      },
      {
        id: 4,
        key: 'imdb',
        label: 'IMDB rating',
      },
      {
        id: 3,
        key: 'rating',
        label: 'Our rating',
        render: (value: number) => <TableRating type="star" rating={value} />,
      },
      {
        id: 5,
        key: 'recommended',
        label: 'Recommended',
        render: (value: number) => <TableRating type="zap" rating={value} />,
      },
      {
        id: 5,
        key: 'familyFriendly',
        label: 'Family friendly',
        render: (value: boolean) => <TableTrueFalse value={value} />,
      },
      {
        id: 6,
        key: 'boxOffice',
        label: 'Box office',
        render: (value: number) =>
          value.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
      },
    ],
  },
];

const data = [
  {
    id: 1,
    name: 'Pulp Fiction',
    country: 'United States',
    year: '1994',
    rating: 3,
    imdb: 8.9,
    recommended: 3,
    familyFriendly: false,
    boxOffice: 213928762,
  },
  {
    id: 2,
    name: 'Parasite',
    country: 'South Korea',
    year: '2019',
    rating: 2,
    imdb: 8.6,
    recommended: 3,
    familyFriendly: false,
    boxOffice: 355475245,
  },
  {
    id: 3,
    name: 'Spirited Away',
    country: 'Japan',
    year: '2001',
    rating: 3,
    imdb: 8.6,
    recommended: 3,
    familyFriendly: true,
    boxOffice: 258908054,
  },
];

const story = {
  title: 'JSX/ComparisonTable',
  component: ComparisonTable,
  argTypes: {
   headers: {
     description: 'The structure of the table',
    },
    data: {
      description: 'The title text that needs to be displayed',
    },
    hideDetails: {
      description: 'Hide table groups that do not have the `default` attribute',
    },
    hideDetailsCaption: {
      description: 'Caption of the button to hide the details',
    },
    showDetailsCaption: {
      description: 'Caption of the button to show the details',
    },
    hideScrollBars: {
      description: 'Hide scroll bars',
    },

    hideScrollBarsMobile: {
      description: 'Hide scroll bars on mobile only',
    },
    collapsibleSections: {
      description: 'Make table groups with a label collapsible',
    },
    cellWidth: {
      description: 'Width of a table content cell',
    },
    firstColumnWidth: {
      description: 'Width of the first column of the table',
    },
    stickyHeaderTopOffset: {
      description: 'Y-offset of the sticky header row',
    },

    growContent: {
      description: 'Makes the content area grow to fill the available space',
    },
    classNameOverrides: {
      description: '"className" props to be passed down to various internal components',
    },
    onSelectionChanged: {
      description: 'Callback to be called when the selected tab index changes on mobile',
      table: {
        category: 'Callbacks'
      }
    },
  },
  args: {
    data,
    headers,
    hideDetails: false,
    hideDetailsCaption: 'Hide details',
    showDetailsCaption: 'Show details',
    hideScrollBars: false,
    hideScrollBarsMobile: true,
    collapsibleSections: false,
    cellWidth: undefined,
    firstColumnWidth: undefined,
    stickyHeaderTopOffset: 0,
    growContent: false,
    classNameOverrides: {
      header: '',
      container: '',
      cell: '',
      headerCell: '',
      collapsibleSection: '',
      section: '',
      hideDetailsButton: '',
    }
  },
  parameters: {
    componentSubtitle: 'The Comparison Table component provides an easy way to compare vast amounts of information in a fast and easy way.',
  },
};

interface Data {
  id: number;
  name: string;
  country: string;
  year: string;
  rating: number;
  imdb: number;
  recommended: number;
  familyFriendly: boolean;
  boxOffice: number;
}

export const ComparisonTableStory = ({
  data,
  headers,
  collapsibleSections,
  hideDetails,
  classNameOverrides,
  hideDetailsCaption,
  showDetailsCaption,
  hideScrollBars,
  hideScrollBarsMobile,
  cellWidth,
  firstColumnWidth,
  stickyHeaderTopOffset,
  growContent,
}: ComparisonTableProps<Data>) => (
  <div className='bg-white'> 
    <ComparisonTable
      data={data}
      headers={headers}
      collapsibleSections={collapsibleSections}
      hideDetails={hideDetails}
      classNameOverrides={classNameOverrides}
      hideDetailsCaption={hideDetailsCaption}
      showDetailsCaption={showDetailsCaption}
      hideScrollBars={hideScrollBars}
      hideScrollBarsMobile={hideScrollBarsMobile}
      cellWidth={cellWidth}
      firstColumnWidth={firstColumnWidth}
      stickyHeaderTopOffset={stickyHeaderTopOffset}
      growContent={growContent}
    />
  </div>
);

ComparisonTableStory.storyName = "ComparisonTable";

export const HeaderType = () => (
  <pre>
   {`export interface Header<T> {
    id: number;
    label?: React.ReactNode;
    cells: Array<Cell<T>>;
    default?: boolean;
  }`}
  </pre>
)

export default story;

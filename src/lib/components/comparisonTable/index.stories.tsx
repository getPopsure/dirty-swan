import {
  ComparisonTable,
  ComparisonTableProps,
  TableButton,
  TableInfoButton,
  TableRating,
  TableRowHeader,
  TableTrueFalse,
} from '.';
import { CardButton } from '../cards';
import {
  ActivityIcon,
  DentalToothTeethIcon,
  DependentsFamilyIcon,
  EyeVisionIcon,
  GlobeNetworkEarthIcon,
  HeartIcon,
  HospitalBuildingIcon,
} from '../icon';
import { MiniProgressBar } from '../table/components/TableCell/BaseCell/MiniProgressBar/MiniProgressBar';

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
    scrollOnOpen: {
      description:
        'When enabled, the page scrolls to the top of a newly expanded section.',
    },
    scrollTopOffset: {
      description:
        'Offset in pixels from the top of the viewport when scrolling to an expanded section.',
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
      description:
        '"className" props to be passed down to various internal components',
    },
    onSelectionChanged: {
      description:
        'Callback to be called when the selected tab index changes on mobile',
      table: {
        category: 'Callbacks',
      },
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
    collapsibleSections: true,
    scrollOnOpen: true,
    scrollTopOffset: 0,
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
    },
  },
  parameters: {
    componentSubtitle:
      'The Comparison Table component provides an easy way to compare vast amounts of information in a fast and easy way.',
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

export const ComparisonTableStory = {
  render: ({
    data,
    headers,
    collapsibleSections,
    scrollOnOpen,
    scrollTopOffset,
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
    <div className="bg-white">
      <ComparisonTable
        data={data}
        headers={headers}
        collapsibleSections={collapsibleSections}
        scrollOnOpen={scrollOnOpen}
        scrollTopOffset={scrollTopOffset}
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
  ),

  name: 'ComparisonTable',
};

interface PlanData {
  id: number;
  name: string;
  cashback: string | boolean;
  dependents: string | boolean;
  deductible: string | boolean;
  generalDoctor: string;
  specialist: string;
  dentalCleanings: string | boolean;
  dentalTreatments: string | boolean;
  physiotherapy: string | boolean;
  mentalHealth: string | boolean;
  glasses: string | boolean;
  laserEyeSurgery: string | boolean;
  pregnancyCheckups: string | boolean;
  childbirth: string | boolean;
  hospitalAccommodation: string;
  sickDayPayout: string | boolean;
  emergencyAbroad: string | boolean;
  repatriation: boolean;
}

const planData: PlanData[] = [
  {
    id: 1,
    name: 'Standard',
    cashback: 'Available',
    dependents: 'Optional',
    deductible: '€0 / €1,200 / €3,000',
    generalDoctor: '100%',
    specialist: '80%',
    dentalCleanings: '80%',
    dentalTreatments: false,
    physiotherapy: '75%-90%',
    mentalHealth: false,
    glasses: false,
    laserEyeSurgery: false,
    pregnancyCheckups: '100%',
    childbirth: 'Shared room',
    hospitalAccommodation: 'Shared room',
    sickDayPayout: '€2,000',
    emergencyAbroad: 'Up to 6 weeks',
    repatriation: false,
  },
  {
    id: 2,
    name: 'Plus',
    cashback: 'Available',
    dependents: 'Optional',
    deductible: '€0 / €1,200 / €3,000',
    generalDoctor: '100%',
    specialist: '100%',
    dentalCleanings: '90%',
    dentalTreatments: '75%-90%',
    physiotherapy: '80%-100%',
    mentalHealth: '80%',
    glasses: 'Up to €300',
    laserEyeSurgery: false,
    pregnancyCheckups: '100%',
    childbirth: 'Twin room',
    hospitalAccommodation: 'Twin room',
    sickDayPayout: '€3,500',
    emergencyAbroad: 'Up to 6 months',
    repatriation: true,
  },
  {
    id: 3,
    name: 'Premium',
    cashback: 'Available',
    dependents: 'Optional',
    deductible: '€0 / €1,200 / €3,000',
    generalDoctor: '100%',
    specialist: '100%',
    dentalCleanings: '100%',
    dentalTreatments: '80%-100%',
    physiotherapy: '100%',
    mentalHealth: '100%',
    glasses: 'Up to €500',
    laserEyeSurgery: 'Up to €1,000',
    pregnancyCheckups: '100%',
    childbirth: 'Private room',
    hospitalAccommodation: 'Private room',
    sickDayPayout: '€5,000',
    emergencyAbroad: 'Unlimited',
    repatriation: true,
  },
  {
    id: 4,
    name: 'Public',
    cashback: false,
    dependents: true,
    deductible: false,
    generalDoctor: '100%',
    specialist: 'Referral needed',
    dentalCleanings: false,
    dentalTreatments: false,
    physiotherapy: 'Copay applies',
    mentalHealth: 'Limited sessions',
    glasses: false,
    laserEyeSurgery: false,
    pregnancyCheckups: '100%',
    childbirth: 'Shared room',
    hospitalAccommodation: 'Shared room',
    sickDayPayout: '70% of income',
    emergencyAbroad: 'EU only',
    repatriation: false,
  },
];

const progressLookup: Record<string, number> = {
  '30%': 1,
  '50%': 2,
  '70%': 3,
  '75%': 4,
  '80%': 4,
  '90%': 4,
  '75%-90%': 4,
  '75%-100%': 4,
  '80%-100%': 4,
  '100%': 5,
};

const renderStringWithProgress = (value: string) => (
  <div className="d-flex fd-column">
    {value}
    {progressLookup[value] !== undefined && (
      <MiniProgressBar nFilledBars={progressLookup[value]} />
    )}
  </div>
);

const renderStringOrBoolean = (value: string | boolean) =>
  typeof value === 'string' ? (
    renderStringWithProgress(value)
  ) : (
    <TableTrueFalse value={value} />
  );

const renderPlanName = (name: string) => <p className="p-h3">{name}</p>;

const renderWithInfo = (value: string | boolean) => (
  <div className="d-flex ai-center gap8">
    {typeof value === 'string' ? value : <TableTrueFalse value={value} />}
    <TableInfoButton onClick={() => {}} />
  </div>
);

const renderDeductible = (value: string | boolean) =>
  typeof value === 'string' ? (
    <div>
      <p className="p-p">{value}</p>
      <p className="p-p tc-neutral-500">Adjustable</p>
    </div>
  ) : (
    <TableTrueFalse value={value} />
  );

const sectionLabel = (icon: React.ReactNode, title: string) => (
  <p className="d-flex ai-center p-h3 c-gap8">
    {icon} {title}
  </p>
);

const privateHealthHeaders: Array<
  ComparisonTableProps<PlanData>['headers'][number]
> = [
  {
    id: 0,
    label: '',
    default: true,
    cells: [
      {
        key: 'name',
        label: 'Our plans',
        render: renderPlanName,
      },
      {
        key: 'cashback',
        label: 'Cashback',
        render: renderStringOrBoolean,
      },
      {
        key: 'dependents',
        label: 'Dependents coverage',
        render: renderWithInfo,
      },
      {
        key: 'deductible',
        label: <TableRowHeader label="Deductible" onClickInfo={() => {}} />,
        render: renderDeductible,
      },
    ],
  },
  {
    id: 1,
    label: sectionLabel(<HeartIcon size={20} noMargin />, 'General'),
    cells: [
      {
        key: 'generalDoctor',
        label: (
          <TableRowHeader
            label="General doctors' visits"
            onClickInfo={() => {}}
          />
        ),
        render: renderStringOrBoolean,
      },
      {
        key: 'specialist',
        label: <TableRowHeader label="Specialists" onClickInfo={() => {}} />,
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 2,
    label: sectionLabel(<DentalToothTeethIcon size={20} noMargin />, 'Dental'),
    cells: [
      {
        key: 'dentalCleanings',
        label: <TableRowHeader label="Dental cleanings" />,
        render: renderStringOrBoolean,
      },
      {
        key: 'dentalTreatments',
        label: (
          <TableRowHeader label="Dental treatments" onClickInfo={() => {}} />
        ),
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 3,
    label: sectionLabel(
      <ActivityIcon size={20} noMargin />,
      'Treatment and therapies'
    ),
    cells: [
      {
        key: 'physiotherapy',
        label: <TableRowHeader label="Physiotherapy" onClickInfo={() => {}} />,
        render: renderStringOrBoolean,
      },
      {
        key: 'mentalHealth',
        label: <TableRowHeader label="Mental health therapy" />,
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 4,
    label: sectionLabel(<EyeVisionIcon size={20} noMargin />, 'Vision'),
    cells: [
      {
        key: 'glasses',
        label: (
          <TableRowHeader
            label="Glasses & contact lenses"
            onClickInfo={() => {}}
          />
        ),
        render: renderStringOrBoolean,
      },
      {
        key: 'laserEyeSurgery',
        label: <TableRowHeader label="Laser eye surgery" />,
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 5,
    label: sectionLabel(
      <DependentsFamilyIcon size={20} noMargin />,
      'Pregnancy and childbirth'
    ),
    cells: [
      {
        key: 'pregnancyCheckups',
        label: <TableRowHeader label="Pregnancy check-ups" />,
        render: renderStringOrBoolean,
      },
      {
        key: 'childbirth',
        label: <TableRowHeader label="Childbirth" onClickInfo={() => {}} />,
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 6,
    label: sectionLabel(
      <HospitalBuildingIcon size={20} noMargin />,
      'Hospital'
    ),
    cells: [
      {
        key: 'hospitalAccommodation',
        label: <TableRowHeader label="Accommodation" onClickInfo={() => {}} />,
        render: renderStringOrBoolean,
      },
      {
        key: 'sickDayPayout',
        label: (
          <TableRowHeader
            label="Sick day payout"
            subtitle="After 6 weeks of illness"
          />
        ),
        render: renderStringOrBoolean,
      },
    ],
  },
  {
    id: 7,
    label: sectionLabel(
      <GlobeNetworkEarthIcon size={20} noMargin />,
      'Outside of Germany'
    ),
    cells: [
      {
        key: 'emergencyAbroad',
        label: (
          <TableRowHeader
            label="Emergency care abroad"
            onClickInfo={() => {}}
          />
        ),
        render: renderStringOrBoolean,
      },
      {
        key: 'repatriation',
        label: <TableRowHeader label="Medical repatriation" />,
        render: renderStringOrBoolean,
      },
    ],
  },
];

export const PrivateHealthQuoteWidget = {
  render: () => (
    <div className="bg-white">
      <ComparisonTable
        data={planData}
        headers={privateHealthHeaders}
        collapsibleSections
        hideScrollBarsMobile
        hideDetails
        showDetailsCaption="What's covered?"
        hideDetailsCaption="Hide details"
      />
    </div>
  ),

  name: 'Private Health - Quote Widget',
};

export const HeaderType = () => (
  <pre>
    {`export interface Header<T> {
    id: number;
    label?: React.ReactNode;
    cells: Array<Cell<T>>;
    default?: boolean;
  }`}
  </pre>
);

export default story;

import ReactDOM from 'react-dom';
import App from './App';

export {
  Accordion,
  DateSelector,
  SignaturePad,
  AutocompleteAddress,
  Input,
  MultiDropzone,
  IbanInput,
  CurrencyInput,
  BottomModal,
  RegularModal,
  BottomOrRegularModal,
  InfoCard,
  CardButton,
  Card,
  Button,
  AutoSuggestMultiSelect,
  Chip,
  AutoSuggestInput,
  ComparisonTable,
  TableRating,
  TableTrueFalse,
  TableRowHeader,
  TableButton,
  TableInfoButton,
  SegmentedControl,
  DownloadButton,
  Checkbox,
  Radio,
  Link,
  InformationBox,
  Badge,
  images,
  illustrations,
  Spinner,
  Table,
  Toggle,
  Toaster,
  toast,
} from './lib';

export * from './lib/components/icon';

export type {
  AccordionProps,
  DownloadStatus,
  InformationBoxProps,
  IllustrationKeys,
  FileType,
  MultiDropzoneProps,
  TableHeader,
  UploadedFile,
  UploadStatus,
  CardProps,
  IconWrapperProps,
  TableData,
  TableProps
} from './lib';

ReactDOM.render(<App />, document.getElementById('root'));

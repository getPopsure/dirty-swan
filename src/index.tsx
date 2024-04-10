import ReactDOM from 'react-dom';
import App from './App';

export {
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
  CardWithTopLeftIcon,
  CardWithLeftIcon,
  CardWithTopIcon,
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
  Markdown,
  Checkbox,
  Radio,
  Link,
  InformationBox,
  Badge,
  images,
  illustrations,
  Spinner,
  Toggle,
  Toaster,
  toast,
  getCountryFlagByCountryCode,
  mapCountryFlag
} from './lib';

export * from './lib/components/icon';

export type {
  DownloadStatus,
  InformationBoxProps,
  IllustrationKeys,
  FileType,
  MultiDropzoneProps,
  TableHeader,
  UploadedFile,
  UploadStatus,
  CardProps,
  IconWrapperProps
} from './lib';

ReactDOM.render(<App />, document.getElementById('root'));

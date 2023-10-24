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
} from './lib';

export * from './lib/components/icon';

export type {
  DownloadStatus,
  IllustrationKeys,
  FileType,
  MultiDropzoneProps,
  TableHeader,
  UploadedFile,
  UploadStatus,
} from './lib';

ReactDOM.render(<App />, document.getElementById('root'));

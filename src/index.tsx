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
  InfoCard,
  CardButton,
  Button,
  AutoSuggestMultiSelect,
  Chip,
  AutoSuggestInput,
  ComparisonTable,
  TableTrueFalse,
  TableRowHeader,
  TableInfoButton,
  SegmentedControl,
  DownloadButton,
  Markdown,
} from './lib';

export type { TableHeader, DownloadStatus } from './lib';

ReactDOM.render(<App />, document.getElementById('root'));

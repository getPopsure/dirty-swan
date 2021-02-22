import Input from '../input';
import { formatIban } from './formatIban';

export default ({
  value,
  placeholder,
  onChange,
  hasError,
}: {
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}) => (
  <Input
    value={formatIban(value)}
    placeholder="IBAN"
    onChange={(e) => onChange(formatIban(e.target.value))}
    hasError={hasError}
  />
);

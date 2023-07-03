import { Input, InputProps } from '..';

import { formatIban } from './formatIban';

const IbanInput = ({
  value,
  onChange,
  ...props
}: {
  value?: string;
  onChange: (value: string) => void;
} & Omit<InputProps, 'onChange' | 'value' | 'ref'>) => (
  <Input
    value={formatIban(value)}
    onChange={(e) => onChange(formatIban(e.target.value))}
    {...props}
  />
);

export default IbanInput;

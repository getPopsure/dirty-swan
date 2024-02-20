import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Input, InputProps } from '..';

import { formatIban } from './formatIban';

const IbanInput = ({
  value,
  onChange,
  ...props
}: {
  value?: string;
  onChange?: (value: string) => void;
} & Omit<InputProps, 'onChange' | 'value' | 'ref'>) => {
  const [iban, setIban] = useState<string | undefined>(value);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setIban(e.currentTarget.value);
    onChange?.(formatIban(e.currentTarget.value));
  }
  return <Input
    name='iban'
    value={formatIban(iban)}
    onChange={handleChange}
    {...props}
  />
};

export default IbanInput;

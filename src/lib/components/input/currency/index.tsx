import { useEffect, useState } from 'react';

import { formatInput, reverseFormatInput } from './format';
import Input, { InputProps } from '..';

const CurrencyInput = ({
  value,
  onChange,
  ...props
}: {
  value?: number;
  placeholder?: string;
  onChange?: (value: number) => void;
} & Omit<InputProps, 'onChange' | 'value' | 'ref'>) => {
  const [shadowValue, setShadowValue] = useState('');

  const formattedShadowValue = formatInput(
    shadowValue
      .replace(/ /g, '') // remove all whitespace
      .replace(',', '.') // change commas to dot for decimal separator
      .replace('.', 'DECIMAL_SEPARATOR') // Gymnastic  to remove all the but the first decimal separators 🤸
      .replace(/\./g, '')
      .replace('DECIMAL_SEPARATOR', '.') // End of the Gymnastic 🤸
      .replace(/[^\d\\.]/g, '') // remove all non decimal and dot
  );

  useEffect(() => {
    if (value && value !== reverseFormatInput(shadowValue)) {
      setShadowValue(formatInput(value.toString()));
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    onChange?.(reverseFormatInput(shadowValue));
    // eslint-disable-next-line
  }, [shadowValue]);

  return (
    <Input
      prefix="€"
      value={formattedShadowValue}
      onChange={(e) => {
        setShadowValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default CurrencyInput;

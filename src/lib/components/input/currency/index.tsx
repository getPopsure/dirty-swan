import { useEffect, useState } from 'react';
import Input, { InputProps } from '..';

export const formatInput = (input: string): string => {
  const decimalSeparator = input.includes(',') ? ',' : '.';
  const parts = input.split(decimalSeparator);
  const floor = parts[0];
  const ceiling = parts[1];
  parts[0] = floor.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (ceiling) {
    parts[1] = ceiling.slice(0, Math.min(ceiling.length, 2));
  }
  return parts.join('.');
};

export function reverseFormatInput(input: string): number {
  return Number(input.replace(/,/, '.').replace(/\s/g, ''));
}

const CurrencyInput = ({
  value,
  onChange,
  ...props
}: {
  value?: number;
  placeholder: string;
  onChange?: (value: number) => void;
} & Omit<InputProps, 'onChange' | 'value' | 'ref'>) => {
  const [shadowValue, setShadowValue] = useState('');

  // const formattedShadowValue = formatInput(shadowValue.replace(/[^\d.,]/g, ''));
  const formattedShadowValue = formatInput(
    shadowValue
      .replace(/ /g, '')
      .replace(',', '.')
      .replace(/\D\..\D+/g, '')
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

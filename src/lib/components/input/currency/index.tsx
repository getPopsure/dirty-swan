import { useEffect, useRef, useState } from 'react';

import { formatInput, reverseFormatInput } from './format';
import { Input, InputProps } from '..';

const CurrencyInput = ({
  value,
  onChange,
  type,
  ...props
}: {
  value?: number;
  placeholder?: string;
  onChange?: (value: number) => void;
} & Omit<InputProps, 'onChange' | 'value' | 'ref'>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
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
    if (shadowValue) {
      onChange?.(reverseFormatInput(shadowValue));
    }
    // eslint-disable-next-line
  }, [shadowValue]);

  useEffect(() => {
    if (!inputRef.current || !cursor) {
      return;
    }

    const cursorDiff =
      String(formattedShadowValue).length - String(shadowValue).length;
    const newCursor = cursorDiff + cursor;

    inputRef.current.selectionStart = newCursor;
    inputRef.current.selectionEnd = newCursor;
  }, [cursor, formattedShadowValue, shadowValue]);

  return (
    <Input
      prefix="€"
      ref={inputRef}
      type="string"
      value={formattedShadowValue}
      onChange={(e) => {
        setCursor(e.target.selectionStart);
        setShadowValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default CurrencyInput;

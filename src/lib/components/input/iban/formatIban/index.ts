const IBAN_CHAR_LIMIT = 4;

export const formatIban = (iban?: string): string => {
  if (iban) {
    const cleanIban = iban
      .replace(/\s\s+/g, ' ')
      .replace(/[^0-9a-zA-Z]/gi, '')
      .toUpperCase();

    const values: string[] = [];

    cleanIban.split('').forEach((char, idx) => {
      if (idx % IBAN_CHAR_LIMIT === 0) {
        values.push(cleanIban.substring(idx, idx + IBAN_CHAR_LIMIT));
      }
    });

    return values.join(' ');
  }

  return '';
};

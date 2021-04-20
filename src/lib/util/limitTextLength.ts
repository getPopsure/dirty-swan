export const limitTextLength = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.substr(0, maxLength)}...`;
  }
  return text;
};

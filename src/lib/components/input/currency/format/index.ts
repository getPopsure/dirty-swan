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

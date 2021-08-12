export const limitTextLength = (text: string, characters: number): string =>
  `${text.substr(0, characters)}...`;

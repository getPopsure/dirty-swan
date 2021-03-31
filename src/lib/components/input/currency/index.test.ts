import { formatInput, reverseFormatInput } from './';

describe('Format input', () => {
  it('Should add space for thousands separator', () => {
    expect(formatInput('1000')).toEqual('1 000');
  });

  it('Should add space for hundred thousands separator', () => {
    expect(formatInput('172888')).toEqual('172 888');
  });

  it('Should add space for million separator', () => {
    expect(formatInput('1728281')).toEqual('1 728 281');
  });

  it('Should add dot for decimal separator', () => {
    expect(formatInput('1728281.23')).toEqual('1 728 281.23');
  });

  it('Should replace comma with dot', () => {
    expect(formatInput('1728281,23')).toEqual('1 728 281.23');
  });

  it('Should truncate 2 digits after decimal separator', () => {
    expect(formatInput('1728281.23392')).toEqual('1 728 281.23');
  });

  it('foo', () => {
    expect(formatInput('10000')).toEqual('10 000');
  });
});

describe('Reverse format input', () => {
  it('Should reverse format 1 728 281.23', () => {
    expect(reverseFormatInput('1 728 281.23')).toEqual(1728281.23);
  });

  it('Should reverse format 1 728 281,23', () => {
    expect(reverseFormatInput('1 728 281,23')).toEqual(1728281.23);
  });

  it('Should reverse format 1 728 281', () => {
    expect(reverseFormatInput('1 728 281')).toEqual(1728281);
  });

  it('Should reverse format 172 888', () => {
    expect(reverseFormatInput('172 888')).toEqual(172888);
  });

  it('Should reverse format 1 000', () => {
    expect(reverseFormatInput('1 000')).toEqual(1000);
  });
});

import { formatBytes } from '.';

describe('Format bytes', () => {
  it('Should format to 1KB with no decimals', () => {
    expect(formatBytes(1024)).toEqual("1 KB");
  });

  it('Should format to 1KB with two decimals', () => {
    expect(formatBytes(1234)).toEqual("1.21 KB");
  });

  it('Should format to 0 bytes', () => {
    expect(formatBytes(0)).toEqual("0 bytes");
  });

  it('Should format to 1MB', () => {
    expect(formatBytes(1049000)).toEqual("1 MB");
  });
});

import { limitTextLength } from './limitTextLength';

describe('Test limitTextLength util', () => {
  const inputString = "Doctor's note";

  it('Should return given string in length that equals provided number with three periods at the end', () => {
    const expectedOutput = 'Docto...';
    expect(limitTextLength(inputString, 5)).toEqual(expectedOutput);
  });

  it('Should return the given string if string length is less than number provided', () => {
    const expectedOutput = "Doctor's note";
    expect(limitTextLength(inputString, 25)).toEqual(expectedOutput);
  });

  it('Should return the given string if string length is equal to number provided', () => {
    const expectedOutput = "Doctor's note";
    expect(limitTextLength(inputString, 13)).toEqual(expectedOutput);
  });
});

import { fireEvent, render } from '@testing-library/react';

import CurrencyInput from '.';

const setup = () => {
  const utils = render(<CurrencyInput />);
  const input = utils.getByTestId('ds-input-input') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe('Currency input component', () => {
  it('Should correctly space thousands separators', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1234567' } });
    expect(input.value).toBe('1 234 567');
  });

  it('Should remove non numerical values', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '123asdf4567' } });
    expect(input.value).toBe('1 234 567');
  });

  it('Should remove non numerical values', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '123asdf4567' } });
    expect(input.value).toBe('1 234 567');
  });

  it('Should allow decimal separator', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1234567.34' } });
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should replace comma decimal seprator with a dot', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1234567,34' } });
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should only allow one decimal separator', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1234567..34' } });
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should only allow one decimal separator after a sequence of number', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1234567..34.4' } });
    expect(input.value).toBe('1 234 567.34');
  });
});

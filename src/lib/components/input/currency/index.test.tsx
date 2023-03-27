import { render } from '../../../util/testUtils';

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
  it('Should correctly space thousands separators', async () => {
    const { input, user } = setup();
    await user.type(input, '1234567');
    expect(input.value).toBe('1 234 567');
  });

  it('Should remove non numerical values', async () => {
    const { input, user } = setup();
    await user.type(input, '123asdf4567');
    expect(input.value).toBe('1 234 567');
  });

  it('Should remove non numerical values', async () => {
    const { input, user } = setup();
    await user.type(input, '123asdf4567');
    expect(input.value).toBe('1 234 567');
  });

  it('Should allow decimal separator', async () => {
    const { input, user } = setup();
    await user.type(input, '1234567.34');
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should replace comma decimal seprator with a dot', async () => {
    const { input, user } = setup();
    await user.type(input, '1234567,34');
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should only allow one decimal separator', async () => {
    const { input, user } = setup();
    await user.type(input, '1234567..34');
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should only allow one decimal separator after a sequence of number', async () => {
    const { input, user } = setup();
    await user.type(input, '1234567..34.4');
    expect(input.value).toBe('1 234 567.34');
  });

  it('Should have correct selection start when no spaces are added', async () => {
    const { input, user } = setup();

    await user.type(input, '123');
    // Should be: 123|
    expect(input.selectionStart).toBe(3);
  });

  it('Should have correct selection start when spaces are added', async () => {
    const { input, user } = setup();

    await user.type(input, '1234');
    // Should be: 123 4|
    expect(input.selectionStart).toBe(5);
  });

  it('Should have correct selection start when typing in middle of input', async () => {
    const { input, user } = setup();

    await user.type(input, '123{arrowleft}4');

    // Should be: 1 24|3
    expect(input.selectionStart).toBe(4);
  });

  it('Should have correct selection start when typing in beginning of input', async () => {
    const { input, user } = setup();

    await user.type(input, '123{arrowleft}{arrowleft}{arrowleft}4');

    // Should be: 4 |123
    expect(input.selectionStart).toBe(2);
  });

  it('Should have correct selection start when typing in input and has currency values', async () => {
    const { input, user } = setup();

    await user.type(input, '123.2{arrowleft}{arrowleft}{arrowleft}24');

    // Should be: 12 24|3.2
    expect(input.selectionStart).toBe(5);
  });

  it('Should have correct selection start when deleting', async () => {
    const { input, user } = setup();

    await user.type(input, '12345{arrowleft}{backspace}67');

    // Should be: 123 67|5
    expect(input.selectionStart).toBe(6);
  });
});

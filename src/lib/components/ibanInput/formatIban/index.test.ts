import { formatIban } from '.';

describe('Format IBAN testing', () => {
  it('Should return IBAN split by four characters', () => {
    expect(formatIban('DE1234123412341234')).toEqual('DE12 3412 3412 3412 34');
  });

  it('Should return IBAN with all caps letters', () => {
    expect(formatIban('de1234123412341234')).toEqual('DE12 3412 3412 3412 34');
  });
});

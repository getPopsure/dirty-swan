import { zerofill } from './zeroFill';

describe('Zero fill number', () => {
  it('Should add one zero in front of a number', () => {
    expect(zerofill(1)).toEqual('01');
  });

  it('Shouldn’t add any in front of a number', () => {
    expect(zerofill(10)).toEqual('10');
  });

  it('Fill 3 0s for a 4 sized number', () => {
    expect(zerofill(1, 4)).toEqual('0001');
  });
});

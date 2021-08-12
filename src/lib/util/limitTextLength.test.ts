import { limitTextLength } from './limitTextLength';

describe('Limit text length testing', () => {
  it('Should return a limited length of string and number provided with ... at the end', () => {
    expect(limitTextLength('feather', 4)).toEqual('feat...');
  });
});

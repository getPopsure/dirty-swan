import generateId from '.';

describe('generateId', () => {
  it('should return two different ids', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toEqual(secondId);
  });
});

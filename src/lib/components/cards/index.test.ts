import { associatedClassForCardState } from '.';

describe('Associated class for card state', () => {
  it('Should be an actionable class', () => {
    expect(associatedClassForCardState('actionable', true)).toEqual(
      'ds-card--actionable'
    );
  });

  it('Should be a muted class', () => {
    expect(associatedClassForCardState('muted', true)).toEqual(
      'ds-card--muted'
    );
  });

  it('Should be a static class', () => {
    expect(associatedClassForCardState('static', true)).toEqual('ds-card');
  });

  it('Should be an actionable class without dropshadow', () => {
    expect(associatedClassForCardState('actionable', false)).toEqual(
      'ds-card--actionable ds-card--no-dropshadow'
    );
  });

  it('Should be a muted class without dropshadow', () => {
    expect(associatedClassForCardState('muted', false)).toEqual(
      'ds-card--muted ds-card--no-dropshadow'
    );
  });

  it('Should be a static class without dropshadow', () => {
    expect(associatedClassForCardState('static', false)).toEqual(
      'ds-card ds-card--no-dropshadow'
    );
  });
});

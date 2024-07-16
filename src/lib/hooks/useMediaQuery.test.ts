import { renderHook } from '@testing-library/react-hooks';

import {
  Breakpoint,
  BreakpointData,
  breakpointLookup,
  breakpointsArray,
  useMediaQuery,
} from './useMediaQuery';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: true,
        addEventListener() {},
        removeEventListener() {},
      };
    };
});

describe('useMediaQuery hook', () => {
  it('should return the correct value pair for each breakpoint from lookup table', () => {
    const expectedValues: { [k in Breakpoint]: BreakpointData } = {
      BELOW_MOBILE: {
        initialValue: window.innerWidth <= 544,
        queryString: '(max-width: 34rem)',
      },
      BELOW_TABLET: {
        initialValue: window.innerWidth <= 720,
        queryString: '(max-width: 45rem)',
      },
      BELOW_DESKTOP: {
        initialValue: window.innerWidth <= 1024,
        queryString: '(max-width: 64rem)',
      },
      ABOVE_MOBILE: {
        initialValue: window.innerWidth >= 544,
        queryString: '(min-width: 34rem)',
      },
      ABOVE_TABLET: {
        initialValue: window.innerWidth >= 720,
        queryString: '(min-width: 45rem)',
      },
      ABOVE_DESKTOP: {
        initialValue: window.innerWidth >= 1024,
        queryString: '(min-width: 64rem)',
      },
    };

    breakpointsArray.forEach((bp) => {
      expect(breakpointLookup(bp)).toEqual(expectedValues[bp]);
    });
  });

  it('should output the correct (initial) value', () => {
    const inputValues: {
      breakpoint: Breakpoint;
      below: number;
      above: number;
      expectedValues: boolean[];
    }[] = [
      {
        breakpoint: 'BELOW_MOBILE',
        below: 300,
        above: 600,
        expectedValues: [true, false],
      },
      {
        breakpoint: 'ABOVE_MOBILE',
        below: 300,
        above: 600,
        expectedValues: [false, true],
      },
      {
        breakpoint: 'BELOW_TABLET',
        below: 600,
        above: 800,
        expectedValues: [true, false],
      },
      {
        breakpoint: 'ABOVE_TABLET',
        below: 600,
        above: 800,
        expectedValues: [false, true],
      },
      {
        breakpoint: 'BELOW_DESKTOP',
        below: 800,
        above: 1100,
        expectedValues: [true, false],
      },
      {
        breakpoint: 'ABOVE_DESKTOP',
        below: 800,
        above: 1100,
        expectedValues: [false, true],
      },
    ];
    let view;

    inputValues.forEach(({ breakpoint, below, above, expectedValues }) => {
      window.innerWidth = below;
      view = renderHook(() => useMediaQuery(breakpoint));
      expect(view.result.current).toEqual(expectedValues[0]);

      window.innerWidth = above;
      view = renderHook(() => useMediaQuery(breakpoint));
      expect(view.result.current).toEqual(expectedValues[1]);
    });
  });
});

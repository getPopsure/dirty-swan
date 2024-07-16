import { useEffect, useState } from 'react';

// USAGE:
// const isMobile = useMediaQuery('BELOW_MOBILE');

export const breakpointsArray = [
  'ABOVE_MOBILE',
  'ABOVE_TABLET',
  'ABOVE_DESKTOP',
  'BELOW_MOBILE',
  'BELOW_TABLET',
  'BELOW_DESKTOP',
] as const;

export type Breakpoint = typeof breakpointsArray[number];
export type BreakpointData = { initialValue: boolean; queryString: string };

export const breakpointLookup = (breakpoint: Breakpoint): BreakpointData => {
  switch (breakpoint) {
    case 'BELOW_MOBILE':
    default:
      return {
        initialValue: window.innerWidth <= 544, // 34rem = 544px = mobile breakpoint}
        queryString: '(max-width: 34rem)',
      };
    case 'BELOW_TABLET':
      return {
        initialValue: window.innerWidth <= 720, // 45rem = 720px = tablet breakpoint
        queryString: '(max-width: 45rem)',
      };
    case 'BELOW_DESKTOP':
      return {
        initialValue: window.innerWidth <= 1024, // 64rem = 1024px = desktop breakpoint
        queryString: '(max-width: 64rem)',
      };
    case 'ABOVE_MOBILE':
      return {
        initialValue: window.innerWidth >= 544, // 34rem = 544px = mobile breakpoint}
        queryString: '(min-width: 34rem)',
      };
    case 'ABOVE_TABLET':
      return {
        initialValue: window.innerWidth >= 720, // 45rem = 720px = tablet breakpoint
        queryString: '(min-width: 45rem)',
      };
    case 'ABOVE_DESKTOP':
      return {
        initialValue: window.innerWidth >= 1024, // 64rem = 1024px = desktop breakpoint
        queryString: '(min-width: 64rem)',
      };
  }
};

export const useMediaQuery = (breakpoint: Breakpoint) => {
  const { initialValue, queryString } = breakpointLookup(breakpoint);

  const [matchesBreakpoint, setMatchesBreakpoint] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(queryString);

    const updateMediaQuery = (e: MediaQueryListEvent) =>
      setMatchesBreakpoint(e.matches);

    mediaQuery.addEventListener('change', updateMediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', updateMediaQuery);
    };
  }, [queryString]);

  return matchesBreakpoint;
};

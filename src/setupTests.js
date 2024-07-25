import '@testing-library/jest-dom';

const noop = () => {};

window.google = {
  maps: {
    StyledMapType: class {},
    Marker: class {
      setPosition() {}
    },
    Map: class {
      constructor() {
        this.mapTypes = { set: jest.fn() };
      }

      setMapTypeId() {
        return jest.fn();
      }
      panTo() {}
      setZoom() {}
    },
    LatLngBounds: class {},
    places: {
      Autocomplete: class {
        addListener() {
          return jest.fn();
        }
      },
      AutocompleteService: class {},
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      PlacesAutocomplete: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      PlacesService: class {
        findPlaceFromQuery() {
          return jest.fn();
        }
      },
    },

    MarkerClusterer: class {},
    Geocoder: class {},
  },
};

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

Object.defineProperty(window, 'matchMedia', {
  value() {
    return {
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    };
  },
  writable: true,
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

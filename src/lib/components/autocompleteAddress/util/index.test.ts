import { geocoderAddressComponentToPartialAddress } from '.';

describe('geocoderAddressComponentToPartialAddress text', () => {
  it('Should extract street, houseNumber, postcode, city, country from GeocoderAddressComponent[]', () => {
    const input = [
      { long_name: '103A', short_name: '103A', types: ['street_number'] },
      {
        long_name: 'Kottbusser Damm',
        short_name: 'Kottbusser Damm',
        types: ['route'],
      },
      {
        long_name: 'Bezirk Neukölln',
        short_name: 'Bezirk Neukölln',
        types: ['sublocality_level_1', 'sublocality', 'political'],
      },
      {
        long_name: 'Berlin',
        short_name: 'Berlin',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Berlin',
        short_name: 'Berlin',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Germany',
        short_name: 'DE',
        types: ['country', 'political'],
      },
      {
        long_name: '10967',
        short_name: '10967',
        types: ['postal_code'],
      },
    ];

    const expectedOutput = {
      street: 'Kottbusser Damm',
      houseNumber: '103A',
      postcode: '10967',
      city: 'Berlin',
      country: 'DE',
    };

    expect(geocoderAddressComponentToPartialAddress(input)).toEqual(
      expectedOutput
    );
  });
});

import { Address, countryNameFromAlphaCode } from '@popsure/public-models';

export const geocoderAddressComponentToPartialAddress = (
  input: google.maps.GeocoderAddressComponent[]
): Partial<Address> => {
  interface MappedType {
    key: keyof Address;
    value: 'long_name' | 'short_name';
  }

  const mapping: {
    route: MappedType;
    street_number: MappedType;
    postal_code: MappedType;
    locality: MappedType;
    country: MappedType;
  } = {
    route: {
      key: 'street',
      value: 'long_name',
    },
    street_number: {
      key: 'houseNumber',
      value: 'long_name',
    },
    postal_code: {
      key: 'postcode',
      value: 'long_name',
    },
    locality: {
      key: 'city',
      value: 'long_name',
    },
    country: {
      key: 'country',
      value: 'short_name',
    },
  };

  const toReturn: Partial<Address> = {};
  input.forEach((value) => {
    const type = value.types[0] as keyof typeof mapping;
    const mappedValue = mapping[type];
    if (mappedValue) {
      toReturn[mappedValue.key] = value[mappedValue.value];
    }
  });

  return toReturn;
};

export const inlineAddress = (address: Address) =>
  `${address.street} ${address.houseNumber}, ${
    address.city
  }, ${countryNameFromAlphaCode(address.country)}`;

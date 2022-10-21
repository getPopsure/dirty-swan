import React, { useState } from 'react';
import { Address } from '@popsure/public-models';

import AutoCompleteAddress from '.';

export const WithoutAddress = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>(
    undefined
  );
  console.log(address);
  return (
    <AutoCompleteAddress
      onAddressChange={(address) => {
        setAddress(address);
      }}
      apiKey="AIzaSyBxybgaQ6LaPX8MdpH8z4nEYWBHCUEEXhI" // change it back to production one
    />
  );
};

export const WithAddress = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>({
    street: 'Lohmuehlenstraße',
    houseNumber: '65',
    city: 'Berlin',
    country: 'DE',
    additionalInformation: 'c/o Factory',
  });
  return (
    <AutoCompleteAddress
      mapId="with-address-map"
      onAddressChange={(address) => {
        setAddress(address);
      }}
      initialAddress={address}
      apiKey="AIzaSyBxybgaQ6LaPX8MdpH8z4nEYWBHCUEEXhI"
    />
  );
};

export const WithoutAddressLocalized = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>();
  console.log(address);
  return (
    <AutoCompleteAddress
      mapId="without-address-localized-map"
      onAddressChange={(address) => {
        setAddress(address);
      }}
      apiKey="AIzaSyBxybgaQ6LaPX8MdpH8z4nEYWBHCUEEXhI"
      placeholders={{
        manualAddressEntry: 'Adresse suchen',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        additionalInformation: 'Adresszusatz (c/o, z. Hd., o.V.i.A, ...)',
        postcode: 'PLZ',
        city: 'Stadt',
      }}
      manualAddressEntryTexts={{
        preText: 'Oder ',
        cta: 'Adresse direkt eingeben',
      }}
    />
  );
};

export const WithAddressLocalized = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>({});
  return (
    <AutoCompleteAddress
      mapId="with-address-localized-map"
      onAddressChange={(address) => {
        setAddress(address);
      }}
      initialAddress={address}
      apiKey="AIzaSyBxybgaQ6LaPX8MdpH8z4nEYWBHCUEEXhI"
      placeholders={{
        manualAddressEntry: 'Adresse suchen',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        additionalInformation: 'Adresszusatz (c/o, z.Hd., o.V.i.A, ...)',
        postcode: 'PLZ',
        city: 'Stadt',
      }}
      manualAddressEntryTexts={{
        preText: 'Oder ',
        cta: 'Adresse direkt eingeben',
      }}
    />
  );
};

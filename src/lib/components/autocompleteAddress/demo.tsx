import React, { useState } from 'react';
import { Address } from '@popsure/public-models';

import AutoCompleteAddress from '.';

export const WithoutAddress = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>(
    undefined
  );
  return (
    <AutoCompleteAddress
      onAddressChange={(address) => {
        setAddress(address);
      }}
      address={address}
      apiKey="AIzaSyDg0DSrjYKt5smmsjkVasDz7c4T5rbOXT8"
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
      onAddressChange={(address) => {
        setAddress(address);
      }}
      address={address}
      apiKey="AIzaSyDg0DSrjYKt5smmsjkVasDz7c4T5rbOXT8"
    />
  );
};

export const WithoutAddressLocalized = () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>();
  return (
    <AutoCompleteAddress
      onAddressChange={(address) => {
        setAddress(address);
      }}
      address={address}
      apiKey="AIzaSyDg0DSrjYKt5smmsjkVasDz7c4T5rbOXT8"
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
      onAddressChange={(address) => {
        setAddress(address);
      }}
      address={address}
      apiKey="AIzaSyDg0DSrjYKt5smmsjkVasDz7c4T5rbOXT8"
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

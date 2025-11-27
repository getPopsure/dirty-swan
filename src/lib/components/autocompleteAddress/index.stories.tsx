import { Address } from '@popsure/public-models';
import { useState } from 'react';
import { AutocompleteAddress, AutocompleteAddressProps } from '.';

const story = {
  title: 'JSX/AutocompleteAddress',
  component: AutocompleteAddress,
  argTypes: {
    address: {
      description: 'The address properties',
      table: {
        type: {
          summary: 'Partial<Address>',
        },
      },
    },
    apiKey: {
      description:
        'Your private API key for the [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)',
      table: {
        type: {
          summary: 'Partial<Address>',
        },
      },
    },
    onAddressChange: {
      description:
        'Callback with the updated address, this function will get called everytime the address gets updated',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    manualAddressEntryTexts: {
      description:
        'The CTA that enables manual address entry and the text preceding it',
      table: {
        type: {
          summary: '{ preText?: string; cta: string?; }',
        },
      },
    },
    placeholders: {
      description: 'Placeholder text',
      table: {
        type: {
          summary:
            '{ manualAddressEntry?: string; street: string?; houseNumber?: string; additionalInformation?: string; postcode?: string; city?: string; }',
        },
      },
    },
  },
  args: {
    apiKey: 'AIzaSyDg0DSrjYKt5smmsjkVasDz7c4T5rbOXT8',
  },
  parameters: {
    componentSubtitle:
      'Autocomplete Address are user interface elements which allow users start typing an address and get autocompletion suggestions on the address.',
    docs: {
      description: {
        component:
          'This component is for now only restricted to "address" types and will restrict every query to Germany.',
      },
    },
  },
};

export const AutocompleteAddressStory = {
  render: ({
    address: defaultAddress,
    apiKey,
    manualAddressEntryTexts,
    onAddressChange,
    placeholders,
    countryCode,
  }: AutocompleteAddressProps) => {
    const [address, setAddress] = useState<Partial<Address> | undefined>(
      defaultAddress
    );
    const handleOnAddressChange = (newAddress: Partial<Address>) => {
      onAddressChange?.(newAddress);
      setAddress(newAddress);
    };

    return (
      <AutocompleteAddress
        address={address}
        apiKey={apiKey}
        manualAddressEntryTexts={manualAddressEntryTexts}
        onAddressChange={handleOnAddressChange}
        placeholders={placeholders}
        countryCode={countryCode}
      />
    );
  },

  name: 'AutocompleteAddress',
};

export const WithAddress = {
  render: ({
    apiKey,
    onAddressChange,
    placeholders,
  }: AutocompleteAddressProps) => (
    <AutocompleteAddress
      address={{
        street: 'Lohmuehlenstraße',
        houseNumber: '65',
        city: 'Berlin',
        country: 'DE',
        additionalInformation: 'c/o Factory',
      }}
      apiKey={apiKey}
      onAddressChange={onAddressChange}
    />
  ),
};

export const WithLocalisationEntryText = {
  render: ({ apiKey, onAddressChange }: AutocompleteAddressProps) => (
    <AutocompleteAddress
      apiKey={apiKey}
      manualAddressEntryTexts={{
        preText: 'Oder ',
        cta: 'Adresse direkt eingeben',
      }}
      onAddressChange={onAddressChange}
    />
  ),
};

export const WithLocalisationPlaceholders = {
  render: ({ apiKey, onAddressChange }: AutocompleteAddressProps) => (
    <AutocompleteAddress
      address={{}}
      apiKey={apiKey}
      placeholders={{
        manualAddressEntry: 'Adresse suchen',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        additionalInformation: 'Adresszusatz (c/o, z.Hd., o.V.i.A, ...)',
        postcode: 'PLZ',
        city: 'Stadt',
      }}
      onAddressChange={onAddressChange}
    />
  ),
};

export const AddressType = () => {
  return (
    <pre>
      {`interface Address {
          street: string;
          houseNumber: string;
          postcode: string;
          city: string;
          additionalInformation?: string;
          country: string;
      }`}
    </pre>
  );
};

export default story;

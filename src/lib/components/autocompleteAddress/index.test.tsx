import { Address } from '@popsure/public-models';
import { fireEvent, render } from '../../util/testUtils';

import { AutocompleteAddress } from '.';

const address = {
  street: 'Köpeniker Strasse',
  houseNumber: '4000',
  postcode: '10179',
  city: 'Berlin',
  country: 'DE',
};

const setup = (
  address: Partial<Address> | undefined = undefined,
  onAddressChange: (address: Partial<Address>) => void = () => {}
) => {
  return render(
    <AutocompleteAddress
      address={address}
      apiKey={''}
      onAddressChange={onAddressChange}
    />
  );
};

const addressFieldTestIds = [
  'autocomplete',
  'autocomplete-house-number',
  'autocomplete-additional-info',
  'autocomplete-postcode',
  'autocomplete-city',
];

describe('AutocompleteAddress component', () => {
  it('Should show all address fields once a search is completed', async () => {
    // @ts-ignore
    window.google.maps.places.Autocomplete = class {
      reference: HTMLElement;
      constructor(reference: HTMLElement) {
        this.reference = reference;
      }
      // @ts-ignore
      addListener(_action, callback) {
        this.reference.addEventListener('change', (e: Event) =>
          (e.target as HTMLInputElement).value !== ''
            ? callback({
                geometry: {
                  location: class {},
                },
                address_components: [
                  {
                    long_name: 'Köpeniker Strasse',
                    short_name: 'Köpeniker Strasse',
                    types: ['route'],
                  },
                ],
              })
            : null
        );
      }
    };

    const { getByDisplayValue, getByTestId } = setup();

    fireEvent.change(getByTestId('autocomplete'), {
      target: { value: 'Köpeniker' },
    });

    addressFieldTestIds.forEach((testId) =>
      expect(getByTestId(testId)).toBeInTheDocument()
    );
    expect(getByDisplayValue('Köpeniker Strasse')).toBeVisible();
  });

  it('Should enable to enter the address manually', async () => {
    const callback = jest.fn();
    const { findByText, getByTestId, user } = setup(undefined, callback);
    const btn = await findByText('enter address manually');

    await user.click(btn);

    // fill out all fields
    await user.type(getByTestId('autocomplete'), 'Köpeniker Strasse');
    await user.type(getByTestId('autocomplete-house-number'), '4000');
    await user.type(getByTestId('autocomplete-postcode'), '10179');
    await user.type(getByTestId('autocomplete-city'), 'Berlin');

    // callback should be called with a complete address
    expect(callback).toHaveBeenCalledWith(address);
  });

  it('Should prefill fields if an address is provided', async () => {
    const { getByDisplayValue } = setup(address);

    expect(getByDisplayValue('Köpeniker Strasse')).toBeVisible();
    expect(getByDisplayValue('4000')).toBeVisible();
    expect(getByDisplayValue('10179')).toBeVisible();
    expect(getByDisplayValue('Berlin')).toBeVisible();
  });
});

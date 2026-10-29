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
  onAddressChange: (address: Partial<Address>) => void = () => {},
  countryCode?: string | null
) => {
  return render(
    <AutocompleteAddress
      address={address}
      apiKey={''}
      onAddressChange={onAddressChange}
      countryCode={countryCode}
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

  it('Should not show a country field when restricted to a country', async () => {
    const { findByText, queryByTestId, user } = setup();

    await user.click(await findByText('enter address manually'));

    expect(queryByTestId('autocomplete-country')).not.toBeInTheDocument();
  });

  it('Should let the user pick the country when searching worldwide', async () => {
    const callback = jest.fn();
    const { findByText, getByRole, getByTestId, user } = setup(
      undefined,
      callback,
      null
    );

    await user.click(await findByText('enter address manually'));

    await user.type(getByTestId('autocomplete'), 'Calle Mayor');
    await user.type(getByTestId('autocomplete-house-number'), '1');
    await user.type(getByTestId('autocomplete-postcode'), '28013');
    await user.type(getByTestId('autocomplete-city'), 'Madrid');

    expect(callback).toHaveBeenLastCalledWith(
      expect.objectContaining({ country: undefined })
    );

    await user.click(getByRole('button', { name: 'Country' }));
    await user.type(getByRole('textbox', { name: 'Search country' }), 'Spain');
    await user.click(getByRole('radio', { name: 'Spain' }));

    expect(callback).toHaveBeenLastCalledWith({
      street: 'Calle Mayor',
      houseNumber: '1',
      postcode: '28013',
      city: 'Madrid',
      country: 'ES',
    });
  });

  it('Should keep the country of a worldwide address when editing it', async () => {
    const callback = jest.fn();
    const { getByTestId, user } = setup(
      { ...address, country: 'ES' },
      callback,
      null
    );

    await user.type(getByTestId('autocomplete-house-number'), '1');

    expect(callback).toHaveBeenLastCalledWith(
      expect.objectContaining({ houseNumber: '40001', country: 'ES' })
    );
    expect(getByTestId('autocomplete-country')).toHaveTextContent('Spain');
  });

  it('Should prefill fields if an address is provided', async () => {
    const { getByDisplayValue } = setup(address);

    expect(getByDisplayValue('Köpeniker Strasse')).toBeVisible();
    expect(getByDisplayValue('4000')).toBeVisible();
    expect(getByDisplayValue('10179')).toBeVisible();
    expect(getByDisplayValue('Berlin')).toBeVisible();
  });
});

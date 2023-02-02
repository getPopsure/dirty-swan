import { Address } from '@popsure/public-models';
import { fireEvent, render, waitFor } from '../../util/testUtils';

import AutoCompleteAddress from '.';

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
    <AutoCompleteAddress
      address={address}
      apiKey={''}
      onAddressChange={onAddressChange}
    />
  );
};

const inputTestId = 'ds-input-input';

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

    const { getAllByTestId, getByTestId } = setup();

    fireEvent.change(getByTestId(inputTestId), {
      target: { value: 'Köpeniker' },
    });

    const inputs = getAllByTestId(inputTestId);

    expect(inputs.length).toEqual(5);
    expect(inputs[0].getAttribute('value')).toBe("Köpeniker Strasse");
  });

  it('Should enable to enter the address manually', async () => {
    const callback = jest.fn();
    const { findByText, getAllByTestId, user } = setup(undefined, callback);
    const btn = await findByText('Enter address manually');

    await user.click(btn);

    // fill out all fields
    const inputs = getAllByTestId(inputTestId);

    await user.type(inputs[0], 'Köpeniker Strasse');
    await user.type(inputs[1], '4000');
    await user.type(inputs[3], '10179');
    await user.type(inputs[4], 'Berlin');

    // callback should be called with a complete address
    expect(callback).toHaveBeenCalledWith(address);
  });

  it('Should prefill fields if an address is provided', async () => {
    const screen = setup(address);
    const inputs = await screen.findAllByTestId(inputTestId);

    expect(inputs[0].getAttribute('value')).toBe('Köpeniker Strasse');
    expect(inputs[1].getAttribute('value')).toBe('4000');
    expect(inputs[3].getAttribute('value')).toBe('10179');
    expect(inputs[4].getAttribute('value')).toBe('Berlin');
  });
});

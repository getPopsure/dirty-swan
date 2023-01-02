import { Address } from '@popsure/public-models';
import { fireEvent, render } from '@testing-library/react';

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
  it('Should show all address fields once a search is completed', () => {
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

    const screen = setup();
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { value: 'Köpeniker' },
    });

    const inputs = screen.getAllByTestId(inputTestId);
    expect(inputs[0].getAttribute('value')).toBe('Köpeniker Strasse');
    expect(inputs.length).toEqual(5);
  });

  it('Should enable to enter the address manually', async () => {
    const callback = jest.fn();
    const screen = setup(undefined, callback);
    const btn = await screen.findByText('Enter address manually');
    fireEvent.click(btn);

    // fill out all fields
    const inputs = screen.getAllByTestId(inputTestId);

    fireEvent.change(inputs[0], { target: { value: 'Köpeniker Strasse' } });
    fireEvent.change(inputs[1], { target: { value: '4000' } });
    fireEvent.change(inputs[3], { target: { value: '10179' } });
    fireEvent.change(inputs[4], { target: { value: 'Berlin' } });

    // callback should be called with a complete address
    expect(callback).toHaveBeenCalledWith(address);
  });

  it('Should prefill fields if an address is provided', async () => {
    const screen = setup(address);
    const inputs = screen.getAllByTestId(inputTestId);
    expect(inputs[0].getAttribute('value')).toBe('Köpeniker Strasse');
    expect(inputs[1].getAttribute('value')).toBe('4000');
    expect(inputs[3].getAttribute('value')).toBe('10179');
    expect(inputs[4].getAttribute('value')).toBe('Berlin');
  });
});

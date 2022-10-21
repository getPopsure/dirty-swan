import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';
import { ChangeEventHandler } from 'react';
import { Address } from '@popsure/public-models';

import Input from '../../input';
import { geocoderAddressComponentToPartialAddress } from '../util';

import styles from './dynamic.module.scss';

const GERMANY_ALPHA_CODE = 'DE'; // default country can be cumbersome for new country implementation

export const loadApiErr =
  '💡 autocompleteAddress-DynamicMode: Google Maps Places API library must be loaded.';

const DynamicAddressEntry = ({
  isGeometryEnabled,
  address: initialAddress,
  onAddressChange,
  onGeometryChange,
  manualAddressEntryText = "Search for address",
}: {
  isGeometryEnabled: boolean;
  address?: Partial<Address>;
  onAddressChange: (address: Partial<Address>) => void;
  onGeometryChange: (geometry: google.maps.places.PlaceGeometry) => void;
  manualAddressEntryText?: string;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 400,
    defaultValue: initialAddress?.street ? `${initialAddress?.street} ${initialAddress.houseNumber}` : '',
    requestOptions: {
      componentRestrictions: { country: GERMANY_ALPHA_CODE },
    }
  });

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    (suggestion: google.maps.places.AutocompletePrediction) => () => {
      setValue(suggestion.description, false);
      clearSuggestions();

      const parameter = {
        placeId: suggestion.place_id,
        fields: [
          'address_component',
          ...(isGeometryEnabled ? ['geometry'] : []),
        ],
      };

      getDetails(parameter)
        .then((details) => {
          if (typeof details === 'string') {
            console.log('Details: ', details);
          } else if (details?.address_components) {
            const geocoderAddress = geocoderAddressComponentToPartialAddress(
              details.address_components
            );
            onAddressChange({
              ...geocoderAddress,
              additionalInformation: initialAddress?.additionalInformation,
            });
            if (isGeometryEnabled && details.geometry) {
              onGeometryChange(details.geometry);
            }
          }
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      // TODO: main_text_matched_substrings can be used to highlight queryText

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.suggestionItem}
        >
          <span className="fw-bold pr8">{main_text}</span>{' '}
          <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Input
          className="w100"
          id="autocomplete"
          data-cy="autocomplete"
          type="text"
          placeholder={manualAddressEntryText}
          disabled={!ready}
          onChange={handleInput}
          value={value}
        />
        {status === 'OK' && (
          <ul className={styles.suggestionList}>{renderSuggestions()}</ul>
        )}
      </div>
    </>
  );
};

export default DynamicAddressEntry;

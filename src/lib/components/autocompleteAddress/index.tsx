import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Address, countryNameFromAlphaCode } from '@popsure/public-models';

import { geocoderAddressComponentToPartialAddress } from './util';

import styles from './style.module.scss';

const GERMANY_ALPHA_CODE = 'DE';

const AutoCompleteAddress = ({
  apiKey,
  address: initialAddress,
  staticVersion = !!process.env.STORYBOOK_STATIC,
  onAddressChange,
}: {
  apiKey: string;
  address?: Partial<Address>;
  staticVersion?: boolean;
  onAddressChange: (address: Partial<Address>) => void;
}) => {
  const [manualAddressEntry, setManualAddressEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const [address, setAddress] = useState(initialAddress);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  useEffect(() => {
    if (address) {
      if (autocompleteElement.current && address.street) {
        autocompleteElement.current.value = address.street;
      }

      if (isEqual(address, initialAddress) === false) {
        onAddressChange({ ...address });
      }
      handleEnterAddressManually();
    }
  }, [initialAddress, address, onAddressChange]);

  useEffect(() => {
    if (process.env.STORYBOOK_STATIC) {
      return;
    }

    const reference = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement;

    console.log(process.env, process.env.STORYBOOK_STATIC)
    const everything = new google.maps.places.Autocomplete(reference, {
      types: ['address'],
      componentRestrictions: { country: GERMANY_ALPHA_CODE },
    })
    console.log(everything)
    
    autocomplete.current = new google.maps.places.Autocomplete(reference, {
      types: ['address'],
      componentRestrictions: { country: GERMANY_ALPHA_CODE },
    });

    autocomplete.current.addListener('place_changed', onPlaceChanged);

    setPlaceFromAddress(address);
  }, []); // eslint-disable-line

  const onPlaceChanged = (
    newPlace:
      | google.maps.places.PlaceResult
      | undefined = autocomplete.current?.getPlace(),
    updateAddress: boolean = true
  ) => {
    if (newPlace?.geometry?.location) {
      const geocoderAddress = geocoderAddressComponentToPartialAddress(
        newPlace.address_components!
      );

      setPlace(newPlace);
      if (updateAddress) {
        setAddress((oldValue) => ({
          ...geocoderAddress,
          additionalInformation: oldValue?.additionalInformation,
        }));
      }
    }
  };

  const setPlaceFromAddress = useCallback((address: Partial<Address> | undefined) => {
    const map = {
      current: <div>test</div>
    }
    if (!map.current) {
      return;
    }

    if (address) {
      const service = new google.maps.places.PlacesService(map.current);
      const query = `${address.street ?? ''} ${address.houseNumber ?? ''}, ${
        address.city ?? ''
      }, ${address.country ? countryNameFromAlphaCode(address.country) : ''}`;
      setIsLoading(true);
      service.findPlaceFromQuery(
        {
          fields: ['place_id'],
          query,
        },
        (results) => {
          const firstResult = results && results[0];
          if (firstResult && firstResult.place_id) {
            service.getDetails(
              { placeId: firstResult.place_id },
              (newPlace) => {
                onPlaceChanged(newPlace ?? undefined, false);
              }
            );
          }
          setIsLoading(false);
        }
      );
    }
  }, []);

  const debouncedSetPlace = debounce(setPlaceFromAddress, 1000)

  const handleEnterAddressManually = () => {
    setManualAddressEntry(true);
  };

  if (process.env.STORYBOOK_STATIC) {
    return <div>test</div>
  }

  return (
    <>
      <div
        className={classNames(`wmx8 bg-grey-500 ${styles['map-container']}`, {
          [styles['map-container--hidden']]: place === null,
        })}
      >
        <div className={styles.map} id="map" />
        {isLoading && (
          <div className={styles['loading-spinner']}>
            <div className="ds-spinner ds-spinner__m" />
          </div>
        )}
      </div>
      <div className={`wmx8`}>
        {manualAddressEntry ? <div>dynamic</div> : <div>static</div>}
      </div>
    </>
  );
};

export default AutoCompleteAddress;

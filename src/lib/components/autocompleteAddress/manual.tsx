import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import Input from '../input';
import { Address, countryNameFromAlphaCode } from '@popsure/public-models';

import { geocoderAddressComponentToPartialAddress } from './util';

import styles from './style.module.scss';

const ManualAddressEntry = ({
}: {
  onAddressChange: (address: Partial<Address>) => void;
}) => {
  const [manualAddressEntry, setManualAddressEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(initialAddress);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  useEffect(() => {
    if (hasLoadedGoogleAPI === false) {
      return;
    }

    if (process.env.STORYBOOK_STATIC) {

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

    map.current = new google.maps.Map(
      document.getElementById('map')!,
      MAP_CONFIG_OBJ
    );

    import('./mapStyle').then(({ style }) => {
      map.current?.mapTypes.set('styled_map', style);
      map.current?.setMapTypeId('styled_map');
    });

    marker.current = new google.maps.Marker({
      map: map.current,
    });

    setPlaceFromAddress(address);
  }, [hasLoadedGoogleAPI]); // eslint-disable-line

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

      map.current?.panTo(newPlace.geometry.location);
      map.current?.setZoom(15);

      marker.current?.setPosition(newPlace.geometry.location);
    }
  };

  const setPlaceFromAddress = useCallback((address: Partial<Address> | undefined) => {
    if (!map.current) {
      return;
    }

    if (address) {
      const service = new google.maps.places.PlacesService(map.current);
      const query = `${address.street ?? ''} ${address.houseNumber ?? ''}, ${address.city ?? ''
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

  return (
    <>
      <div className={`d-flex ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete"
          type="text"
          placeholder="Street"
          value={address?.street || ''}
          onChange={(e) => {
            const newAddress = {
              ...address,
              street: e.target.value,
              country: GERMANY_ALPHA_CODE,
            };
            setAddress(newAddress);
            debouncedSetPlace(newAddress);
          }}
        />
        <Input
          className={`wmx2 ${styles['house-number-input']}`}
          data-cy="autocomplete-house-number"
          placeholder="House Number"
          value={address?.houseNumber || ''}
          onChange={(e) => {
            const newAddress = {
              ...address,
              houseNumber: e.target.value,
              country: GERMANY_ALPHA_CODE,
            };
            setAddress(newAddress);
            debouncedSetPlace(newAddress);
          }}
        />
      </div>
      <Input
        className="mt16"
        data-cy="autocomplete-additional-info"
        placeholder="Additional information (C/O, appartment…)"
        value={address?.additionalInformation || ''}
        onChange={(e) => {
          const newAddress = {
            ...address,
            additionalInformation: e.target.value,
            country: GERMANY_ALPHA_CODE,
          };
          setAddress(newAddress);
        }}
      />
      <div className={`d-flex mt16 ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete-postcode"
          placeholder="Postcode"
          value={address?.postcode || ''}
          onChange={(e) => {
            const newAddress = {
              ...address,
              postcode: e.target.value,
              country: GERMANY_ALPHA_CODE,
            };
            setAddress(newAddress);
            debouncedSetPlace(newAddress);
          }}
        />
        <Input
          className="w100"
          data-cy="autocomplete-city"
          placeholder="City"
          value={address?.city || ''}
          onChange={(e) => {
            const newAddress = {
              ...address,
              city: e.target.value,
              country: GERMANY_ALPHA_CODE,
            };
            setAddress(newAddress);
            debouncedSetPlace(newAddress);
          }}
        />
      </div>
    </>
  );
};

export default AutoCompleteAddress;

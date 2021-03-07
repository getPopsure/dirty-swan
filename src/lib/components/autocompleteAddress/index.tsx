import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import Input from '../input';
import { Address, countryNameFromAlphaCode } from '@popsure/public-models';

import { geocoderAddressComponentToPartialAddress } from './util';

import styles from './style.module.scss';
import './style.scss';

const GERMANY_LAT_LNG = { lat: 51.54317, lng: 10.3181503 };

const MAP_CONFIG_OBJ = {
  zoom: 6,
  center: GERMANY_LAT_LNG,
  fullscreenControl: false,
  mapTypeControl: false,
  panControl: false,
  zoomControl: false,
  streetViewControl: false,
  scrollwheel: false,
  scaleControl: false,
  rotateControl: false,
  draggable: false,
};

const AutoCompleteAddress = ({
  address: initialAddress,
  onAddressChange,
}: {
  address?: Partial<Address>;
  onAddressChange: (address: Partial<Address>) => void;
}) => {
  const [manualAddressEntry, setManualAddressEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [address, setAddress] = useState(initialAddress);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  const debouncedSetPlace = useCallback(
    debounce(
      (newValue: Partial<Address> | undefined) => setPlaceFromAddress(newValue),
      1000
    ),
    []
  );

  useEffect(() => {
    if (address) {
      if (autocompleteElement.current && address.street) {
        autocompleteElement.current.value = address.street;
      }

      onAddressChange(address);
      setManualAddressEntry(true);
    }
  }, [address, onAddressChange]);

  const onPlaceChanged = (
    newPlace:
      | google.maps.places.PlaceResult
      | undefined = autocomplete.current?.getPlace()
  ) => {
    if (newPlace && newPlace.geometry) {
      const geocoderAddress = geocoderAddressComponentToPartialAddress(
        newPlace.address_components!
      );

      setPlace(newPlace);
      setAddress((oldValue) => ({
        ...geocoderAddress,
        additionalInformation: oldValue?.additionalInformation,
      }));

      map.current?.panTo(newPlace.geometry.location);
      map.current?.setZoom(15);

      marker.current?.setPosition(newPlace.geometry.location);
    }
  };

  const setPlaceFromAddress = (address: Partial<Address> | undefined) => {
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
                onPlaceChanged(newPlace);
              }
            );
          }
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    const reference = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement;

    autocomplete.current = new google.maps.places.Autocomplete(reference, {
      types: ['address'],
      componentRestrictions: { country: 'de' },
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
  }, []); // eslint-disable-line

  const handleEnterAddressManually = () => {
    setManualAddressEntry(true);
  };

  return (
    <>
      <div
        className={classNames(`wmx8 bg-grey-500 ${styles['map-container']}`, {
          [styles['map-container--hidden']]: place === null,
        })}
      >
        <div className={`${styles.map}`} id="map" />
        {isLoading && (
          <div className={styles['loading-spinner']}>
            <div className="ds-spinner ds-spinner__m" />
          </div>
        )}
      </div>
      <div className={`wmx8`}>
        <div className={`d-flex ${styles['input-line']}`}>
          <Input
            className="w100"
            id="autocomplete"
            data-cy="autocomplete"
            type="text"
            placeholder="Street"
            ref={autocompleteElement}
          />
          {manualAddressEntry && (
            <Input
              className="wmx2"
              data-cy="autocomplete-house-number"
              placeholder="House Number"
              value={address?.houseNumber || ''}
              onChange={({ target: { value } }) => {
                const newAddress = { ...address, houseNumber: value };
                setAddress(newAddress);
                debouncedSetPlace(newAddress);
              }}
            />
          )}
        </div>
        {manualAddressEntry && (
          <>
            <Input
              className="mt16"
              data-cy="autocomplete-additional-info"
              placeholder="Additional information (C/O, appartment…)"
              value={address?.additionalInformation || ''}
              onChange={({ target: { value } }) => {
                const newAddress = { ...address, additionalInformation: value };
                setAddress(newAddress);
              }}
            />
            <div className={`d-flex mt16 ${styles['input-line']}`}>
              <Input
                data-cy="autocomplete-postcode"
                placeholder="Postcode"
                value={address?.postcode || ''}
                onChange={({ target: { value } }) => {
                  const newAddress = { ...address, postcode: value };
                  setAddress(newAddress);
                  debouncedSetPlace(newAddress);
                }}
              />
              <Input
                data-cy="autocomplete-city"
                placeholder="City"
                value={address?.city || ''}
                onChange={({ target: { value } }) => {
                  const newAddress = { ...address, city: value };
                  setAddress(newAddress);
                  debouncedSetPlace(newAddress);
                }}
              />
              <Input
                data-cy="autocomplete-country"
                placeholder="Country"
                value={countryNameFromAlphaCode(address?.country ?? '')}
                disabled={true}
                onChange={({ target: { value } }) => {
                  const newAddress = { ...address, country: value };
                  setAddress(newAddress);
                  debouncedSetPlace(newAddress);
                }}
              />
            </div>
          </>
        )}
      </div>
      {manualAddressEntry === false && (
        <div className="p-p mt8">
          Or{' '}
          <span
            className="p-a fw-bold c-pointer"
            onClick={handleEnterAddressManually}
          >
            Enter address manually
          </span>
        </div>
      )}
    </>
  );
};

export default AutoCompleteAddress;

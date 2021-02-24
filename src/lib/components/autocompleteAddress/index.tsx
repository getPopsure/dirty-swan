import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import {
  Address,
  countryNameFromAlphaCode,
  isPartialAddressValid,
} from '@popsure/public-models';

import {
  geocoderAddressComponentToPartialAddress,
  inlineAddress,
} from './util';

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
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [address, setAddress] = useState(initialAddress);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [missingGeocoderFields, setMissingGeocoderFields] = useState({
    postcode: false,
    houseNumber: false,
  });

  const debouncedSetPlace = useCallback(
    debounce(
      (newValue: Partial<Address> | undefined) => setPlaceFromAddress(newValue),
      1000
    ),
    []
  );

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
      setAddress(geocoderAddress);

      if (autocompleteElement.current && newPlace.formatted_address) {
        autocompleteElement.current.value = newPlace.formatted_address;
      }

      setMissingGeocoderFields({
        houseNumber: geocoderAddress.houseNumber === undefined,
        postcode: geocoderAddress.postcode === undefined,
      });

      map.current?.panTo(newPlace.geometry.location);
      map.current?.setZoom(15);

      marker.current?.setPosition(newPlace.geometry.location);

      onAddressChange(geocoderAddress);
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

      service.findPlaceFromQuery(
        {
          fields: ['place_id'],
          query,
        },
        (results) => {
          const firstResult = results && results[0];
          console.log(firstResult);
          if (firstResult && firstResult.place_id) {
            service.getDetails(
              { placeId: firstResult.place_id },
              (newPlace) => {
                onPlaceChanged(newPlace);
              }
            );
          }
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

    if (address && isPartialAddressValid(address)) {
      reference.value = inlineAddress(address);
    }

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

  return (
    <>
      <div
        id="map"
        className={classNames(`ws8 bg-grey-500 ${styles.map}`, {
          [styles['map--hidden']]: place === null,
        })}
      />
      <div className={`${styles['input-container']} ws8`}>
        <input
          className="p-input"
          id="autocomplete"
          data-cy="autocomplete"
          type="text"
          ref={autocompleteElement}
        />
        {missingGeocoderFields.houseNumber && (
          <input
            className="p-input"
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
        {missingGeocoderFields.postcode && (
          <input
            className="p-input"
            data-cy="autocomplete-postcode"
            placeholder="Postcode"
            value={address?.postcode || ''}
            onChange={({ target: { value } }) => {
              const newAddress = { ...address, postcode: value };
              setAddress(newAddress);
              debouncedSetPlace(newAddress);
            }}
          />
        )}
      </div>
    </>
  );
};

export default AutoCompleteAddress;

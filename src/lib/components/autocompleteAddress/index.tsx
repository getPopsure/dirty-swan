import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { Input } from '../input';
import {
  Address,
  Alpha2CountryCode,
  countryNameFromAlphaCode,
} from '@popsure/public-models';

import { geocoderAddressComponentToPartialAddress } from './util';

import styles from './style.module.scss';

const GERMANY_LAT_LNG = { lat: 51.54317, lng: 10.3181503 };

const GERMANY_ALPHA_CODE = 'DE';

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

const loadGoogleMapsApiDynamically = (callback: () => void, apiKey: string) => {
  const existingScript = document.getElementById('googleMapsImportScript');

  if (existingScript) {
    return;
  }

  const googleMapImportScript = document.createElement('script');
  googleMapImportScript.id = 'googleMapsImportScript';
  googleMapImportScript.type = 'text/javascript';
  googleMapImportScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  document.head.appendChild(googleMapImportScript);

  googleMapImportScript.onload = () => {
    callback();
  };
};

export interface AutocompleteAddressProps {
  apiKey: string;
  address?: Partial<Address>;
  onAddressChange: (address: Partial<Address>) => void;
  inputProps?: {
    street?: {
      name?: string;
    };
    houseNumber?: {
      name?: string;
    };
    additionalInformation?: {
      name?: string;
    };
    postcode?: {
      name?: string;
    };
    city?: {
      name?: string;
    };
  };
  placeholders?: {
    manualAddressEntry?: string;
    street?: string;
    houseNumber?: string;
    additionalInformation?: string;
    postcode?: string;
    city?: string;
  };
  manualAddressEntryTexts?: {
    preText?: string;
    cta?: string;
  };
  countryCode?: string;
}

const AutocompleteAddress = ({
  apiKey,
  address: initialAddress,
  onAddressChange,
  placeholders,
  manualAddressEntryTexts,
  inputProps,
  countryCode = GERMANY_ALPHA_CODE
}: AutocompleteAddressProps) => {
  const [manualAddressEntry, setManualAddressEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [address, setAddress] = useState(initialAddress);
  const [hasLoadedGoogleAPI, setHasLoadedGoogleAPI] = useState(
    window.google?.maps !== undefined
  );

  loadGoogleMapsApiDynamically(() => {
    setHasLoadedGoogleAPI(true);
  }, apiKey);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  useEffect(() => {
    if (address) {
      if (autocompleteElement.current && address.street) {
        autocompleteElement.current.value = address.street;
      }

      handleEnterAddressManually();
    }
  }, [address, onAddressChange, hasLoadedGoogleAPI]);

  useEffect(() => {
    if (!hasLoadedGoogleAPI) {
      return;
    }

    const reference = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement;

    autocomplete.current = new google.maps.places.Autocomplete(reference, {
      types: ['address'],
      componentRestrictions: { country: countryCode },
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
  }, [hasLoadedGoogleAPI, countryCode]); // eslint-disable-line

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
        onAddressChange?.(geocoderAddress);
      }

      map.current?.panTo(newPlace.geometry.location);
      map.current?.setZoom(15);

      marker.current?.setPosition(newPlace.geometry.location);
    }
  };

  const setPlaceFromAddress = useCallback(
    (address: Partial<Address> | undefined) => {
      if (!map.current) {
        return;
      }

      if (address) {
        const service = new google.maps.places.PlacesService(map.current);
        const query = `${address.street ?? ''} ${address.houseNumber ?? ''}, ${
          address.city ?? ''
        }, ${
          address.country
            ? countryNameFromAlphaCode(address.country as Alpha2CountryCode)
            : ''
        }`;
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
    },
    []
  );

  const debouncedSetPlace = debounce(setPlaceFromAddress, 2000);

  const handleEnterAddressManually = () => {
    setManualAddressEntry(true);
  };

  const onManualAddressChange =
    ({ updatePlace } = { updatePlace: true }) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newAddress = {
        ...address,
        [e.target.name]: e.target.value,
        country: countryCode,
      };
      setAddress(newAddress);
      onAddressChange(newAddress);

      if (updatePlace) {
        debouncedSetPlace(newAddress);
      }
    };

  return (
    <>
      <div
        className={classNames(`wmx8 bg-neutral-600 ${styles['map-container']}`, {
          [styles['map-container--hidden']]: place === null,
        })}
      >
        <div className={styles.map} id="map" aria-hidden="true" />
        {isLoading && (
          <div className={styles['loading-spinner']}>
            <div className="ds-spinner ds-spinner__m" />
          </div>
        )}
      </div>
      <div className={`wmx8`}>
        {manualAddressEntry === false ? (
          <div style={{ position: 'relative' }}>
            <Input
              className="w100"
              id="autocomplete"
              key="autocomplete-search"
              data-cy="autocomplete"
              type="text"
              placeholder={
                placeholders?.manualAddressEntry || 'Search for address'
              }
              ref={autocompleteElement}
              disabled={hasLoadedGoogleAPI === false}
            />
            {hasLoadedGoogleAPI === false && (
              <div
                data-cy="google-api-loader"
                className={styles['loading-spinner']}
              >
                <div className="ds-spinner ds-spinner__m" />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={`d-flex c-gap16 ${styles['input-line']}`}>
              <Input
                className="w100"
                data-cy="autocomplete"
                key="autocomplete-street"
                type="text"
                placeholder={placeholders?.street || 'Street'}
                value={address?.street || ''}
                onChange={onManualAddressChange()}
                name="street"
                {...inputProps?.street}
              />
              <Input
                className={`wmx2 ${styles['house-number-input']}`}
                data-cy="autocomplete-house-number"
                key="autocomplete-house-number"
                placeholder={placeholders?.houseNumber || 'House number'}
                value={address?.houseNumber || ''}
                name="houseNumber"
                onChange={onManualAddressChange()}
                {...inputProps?.houseNumber}
              />
            </div>
            <Input
              className="mt16"
              data-cy="autocomplete-additional-info"
              key="autocomplete-additional-info"
              placeholder={
                placeholders?.additionalInformation ||
                'Additional information (C/O, apartment, etc.)'
              }
              value={address?.additionalInformation || ''}
              name="additionalInformation"
              onChange={onManualAddressChange({ updatePlace: false })}
              {...inputProps?.additionalInformation}
            />
            <div className={`d-flex mt16 c-gap16 ${styles['input-line']}`}>
              <Input
                className="w100"
                data-cy="autocomplete-postcode"
                key="autocomplete-postcode"
                placeholder={placeholders?.postcode || 'Postcode'}
                value={address?.postcode || ''}
                name="postcode"
                onChange={onManualAddressChange()}
                {...inputProps?.postcode}
              />
              <Input
                className="w100"
                data-cy="autocomplete-city"
                key="autocomplete-city"
                placeholder={placeholders?.city || 'City'}
                value={address?.city || ''}
                name="city"
                onChange={onManualAddressChange()}
                {...inputProps?.city}
              />
            </div>
          </>
        )}
      </div>
      {manualAddressEntry === false && (
        <div className="p-p mt8">
          {manualAddressEntryTexts?.preText || 'Or '}
          <button
            className={'p-a p-p fw-bold c-pointer bg-transparent'}
            onClick={handleEnterAddressManually}
            type="button"
          >
            {manualAddressEntryTexts?.cta || 'enter address manually'}
          </button>
        </div>
      )}
    </>
  );
};

export { AutocompleteAddress };

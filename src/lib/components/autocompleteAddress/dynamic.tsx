import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import Input from '../input';
import { Address, countryNameFromAlphaCode } from '@popsure/public-models';

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
  const [isLoading, setIsLoading] = useState(false);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [address, setAddress] = useState(initialAddress);
  const [hasLoadedGoogleAPI, setHasLoadedGoogleAPI] = useState(
    window.google !== undefined
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

      if (isEqual(address, initialAddress) === false) {
        onAddressChange({ ...address });
      }
      handleEnterAddressManually();
    }
  }, [initialAddress, address, onAddressChange, hasLoadedGoogleAPI]);

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

  const handleEnterAddressManually = () => {
    setManualAddressEntry(true);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Input
          className="w100"
          id="autocomplete"
          data-cy="autocomplete"
          type="text"
          placeholder="Search for address"
          ref={autocompleteElement}
        />
        {hasLoadedGoogleAPI === false && (
          <div className={styles['loading-spinner']}>
            <div className="ds-spinner ds-spinner__m" />
          </div>
        )}
      </div>
      <div className="p-p mt8">
        Or{' '}
        <span
          className="p-a fw-bold c-pointer"
          onClick={handleEnterAddressManually}
        >
          Enter address manually
        </span>
      </div>
    </>
  );
};

export default AutoCompleteAddress;

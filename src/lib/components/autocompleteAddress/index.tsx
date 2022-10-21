import { MouseEventHandler, useState, useCallback } from 'react';
import _debounce from 'lodash.debounce';

import { Address } from '@popsure/public-models';
import { GoogleMapsWrapper } from './components/GoogleMapsWrapper';
import ManualAddressEntry from './modes/manual';
import DynamicAddressEntry from './modes/dynamic';
import { getGeocode } from 'use-places-autocomplete';
import { inlineAddress } from './util';
import { useJsApiLoader } from './util/googleMapsLoader';

type AutoCompleteAddressProps = {
  mapId?: string;
  apiKey: string;
  initialAddress?: Partial<Address>;
  staticVersion?: boolean;
  onAddressChange: (address: Partial<Address>) => void;
  manualAddressEntryTexts?: {
    preText?: string;
    cta?: string;
  };
  placeholders?: {
    manualAddressEntry?: string;
    street?: string;
    houseNumber?: string;
    additionalInformation?: string;
    postcode?: string;
    city?: string;
  };
};

const AutoCompleteAddress = ({
  mapId = 'map',
  apiKey,
  initialAddress,
  staticVersion = !!process.env.STORYBOOK_STATIC,
  onAddressChange,
  manualAddressEntryTexts,
}: AutoCompleteAddressProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(initialAddress);
  const [geometry, setGeometry] = useState<
    google.maps.places.PlaceGeometry | undefined
  >(undefined);
  const [manualAddressEntry, setManualAddressEntry] = useState(!!initialAddress);
  // you can read more about it here:
  // https://github.com/JustFly1984/react-google-maps-api/blob/develop/packages/react-google-maps-api/src/useJsApiLoader.md
  const { isLoaded: hasLoadedGoogleAPI, loadError: loadGoogleAPIError } =
    useJsApiLoader({
      googleMapsApiKey: apiKey,
    });

  const isGeometryEnabled = !staticVersion;

  const handleModeSwitch: MouseEventHandler<HTMLButtonElement> = (event) => {
    setManualAddressEntry(event.currentTarget.dataset.value === 'true');
  };

  const handleAddressChange = (address: Partial<Address>) => {
    setAddress(address);
    onAddressChange(address);
  };

  const handleDynamicAddress = (address: Partial<Address>) => {
    handleAddressChange(address);
    setManualAddressEntry(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateMapGeometry = useCallback(
    _debounce((address: Partial<Address>) => {
      const parameter = {
        address: inlineAddress(address),
      };

      getGeocode(parameter)
        .then((results) => {
          setGeometry(results[0].geometry);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    }, 1000),
    [_debounce]
  );

  const handleManualAddress = (address: Partial<Address>) => {
    handleAddressChange(address);
    if (isGeometryEnabled) {
      setIsLoading(true);
      updateMapGeometry(address);
    }
  };

  return (
    <>
      {isGeometryEnabled && address && (
        <GoogleMapsWrapper
          mapId={mapId}
          hasLoadedGoogleAPI={hasLoadedGoogleAPI}
          geometry={geometry}
          isLoading={isLoading}
        /> // this can be composable <AutocompleteAddress>{({geometry} ) => <GoogleMapsWrapper geometry={geometry}>}
      )}
      {loadGoogleAPIError && <p>Google API is not responding.</p>}
      {hasLoadedGoogleAPI && (
        <div className={`wmx8`}>
          {manualAddressEntry || loadGoogleAPIError ? (
            <ManualAddressEntry
              address={address}
              onAddressChange={handleManualAddress}
            />
          ) : (
            <DynamicAddressEntry
              address={address}
              onAddressChange={handleDynamicAddress}
              isGeometryEnabled={isGeometryEnabled}
              onGeometryChange={setGeometry}
            />
          )}
        </div>
      )}
      {manualAddressEntry ? (
        <div className="p-p mt8">
          {manualAddressEntryTexts?.preText || 'Or '}
          <button
            className="p-a bg-transparent fw-bold c-pointer"
            onClick={handleModeSwitch}
            data-value={'false'}
            type="button"
          >
            {manualAddressEntryTexts?.cta || 'Enter address dynamically'}
          </button>
        </div>
      ) : (
        <div className="p-p mt8">
          {manualAddressEntryTexts?.preText || 'Or '}
          <button
            className="p-a bg-transparent fw-bold c-pointer"
            onClick={handleModeSwitch}
            data-value={'true'}
            type="button"
          >
            {manualAddressEntryTexts?.cta || 'Enter address manually'}
          </button>
        </div>
      )}
    </>
  );
};

export default AutoCompleteAddress;

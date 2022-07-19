import { MouseEventHandler, useState } from 'react';

import { Address } from '@popsure/public-models';
import { GoogleMapsWrapper, loadGoogleMapsApiDynamically } from './util/gmaps';
import ManualAddressEntry from './modes/manual';
import DynamicAddressEntry from './modes/dynamic';

type AutoCompleteAddressProps = {
  apiKey: string;
  address?: Partial<Address>;
  staticVersion?: boolean;
  onAddressChange: (address: Partial<Address>) => void;
  manualAddressEntryTexts?: {
    preText?: string;
    cta?: string;
  };
};

const AutoCompleteAddress = ({
  apiKey,
  address: initialAddress,
  staticVersion = !!process.env.STORYBOOK_STATIC,
  onAddressChange,
  manualAddressEntryTexts,
}: AutoCompleteAddressProps) => {
  const [address, setAddress] = useState(initialAddress);
  const [geometry, setGeometry] = useState<
    google.maps.places.PlaceGeometry | undefined
  >(undefined);
  const [manualAddressEntry, setManualAddressEntry] = useState(false);
  const [hasLoadedGoogleAPI, setHasLoadedGoogleAPI] = useState(
    window.google !== undefined
  );

  if (!hasLoadedGoogleAPI) {
    loadGoogleMapsApiDynamically(() => {
      setHasLoadedGoogleAPI(true);
    }, apiKey);
  }

  const handleModeSwitch: MouseEventHandler<HTMLButtonElement> = (event) => {
    setManualAddressEntry(event.currentTarget.dataset.value === 'true');
  };

  const handleDynamicAddress = (address: Partial<Address>) => {
    setAddress(address);
    setManualAddressEntry(true);
  };

  // const setPlaceFromAddress = () => {
  //   // if PlaceAPI and map initialized then update the place object.
  // };
  // // const debouncedSetPlace = debounce(setPlaceFromAddress, 1000)

  return (
    <>
      {staticVersion && address && (
        <GoogleMapsWrapper
          hasLoadedGoogleAPI={hasLoadedGoogleAPI}
          geometry={geometry}
        />
      )}
      {hasLoadedGoogleAPI && (
        <div className={`wmx8`}>
          {manualAddressEntry ? (
            <ManualAddressEntry
              address={address}
              onAddressChange={setAddress}
            />
          ) : (
            <DynamicAddressEntry
              isGeometryEnabled={staticVersion}
              address={address}
              onAddressChange={handleDynamicAddress}
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
          >
            {manualAddressEntryTexts?.cta || 'Enter address manually'}
          </button>
        </div>
      )}
    </>
  );
};

export default AutoCompleteAddress;

import React, { useState } from 'react';
import { Address } from '@popsure/public-models';

import AutoCompleteAddress from '.';

export default () => {
  const [address, setAddress] = useState<Partial<Address> | undefined>(
    undefined
  );
  return (
    <AutoCompleteAddress
      onAddressChange={(address) => {
        setAddress(address);
      }}
      address={address}
    />
  );
};

import React, { useState } from "react";
import { Address } from "@popsure/public-models";

import AutoCompleteAddress from ".";

export default () => {
  const [address, setAddress] = useState<Address>(undefined);
  return <AutoCompleteAddress onAddressChange={setAddress} address={address} />;
};

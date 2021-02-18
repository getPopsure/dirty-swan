import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

import './style.scss';

export default (props: PhoneInputProps) => (
  <PhoneInput {...props} enableLongNumbers={true} />
);

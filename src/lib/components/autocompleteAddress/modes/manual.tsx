import Input from '../../input';
import { Address } from '@popsure/public-models';

import styles from '../style.module.scss';
import { ChangeEventHandler } from 'react';

const GERMANY_ALPHA_CODE = 'DE'; // default country can be cumbersome for new country implementation

const ManualAddressEntry = ({
  address,
  onAddressChange
}: {
  address?: Partial<Address>;
  onAddressChange: (address: Partial<Address>) => void;
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onAddressChange({
      ...address,
      [event.target.name]: event.target.value,
      ...(address?.country ? {} : { country: GERMANY_ALPHA_CODE })
    });
  }
  return (
    <>
      <div className={`d-flex c-gap16 ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete"
          type="text"
          placeholder="Street"
          value={address?.street || ''}
          name="street"
          onChange={handleInputChange}
        />
        <Input
          className={`wmx2 ${styles['house-number-input']}`}
          data-cy="autocomplete-house-number"
          placeholder="House Number"
          value={address?.houseNumber || ''}
          name="houseNumber"
          onChange={handleInputChange}
        />
      </div>
      <Input
        className="mt16"
        data-cy="autocomplete-additional-info"
        placeholder="Additional information (C/O, appartment…)"
        value={address?.additionalInformation || ''}
        name="additionalInformation"
        onChange={handleInputChange}
      />
      <div className={`d-flex c-gap16 mt16 ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete-postcode"
          placeholder="Postcode"
          value={address?.postcode || ''}
          name="postcode"
          onChange={handleInputChange}
        />
        <Input
          className="w100"
          data-cy="autocomplete-city"
          placeholder="City"
          value={address?.city || ''}
          name="city"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default ManualAddressEntry;

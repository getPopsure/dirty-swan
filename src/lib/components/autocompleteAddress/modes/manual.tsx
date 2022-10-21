import Input from '../../input';
import { Address } from '@popsure/public-models';

import styles from '../style.module.scss';
import { ChangeEventHandler } from 'react'; // default country can be cumbersome for new country implementation

import type { AutoCompleteAddressProps } from '../index'

const GERMANY_ALPHA_CODE = 'DE';

const ManualAddressEntry = ({
  address,
  onAddressChange,
  placeholders
}: {
  address?: Partial<Address>;
  onAddressChange: (address: Partial<Address>) => void;
  placeholders: AutoCompleteAddressProps['placeholders']
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onAddressChange({
      ...address,
      [event.target.name]: event.target.value,
      ...(address?.country
        ? { country: address.country }
        : { country: GERMANY_ALPHA_CODE }), // default country is germany
    });
  };

  return (
    <>
      <div className={`d-flex c-gap16 ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete"
          type="text"
          placeholder={placeholders?.street}
          value={address?.street || ''}
          name="street"
          onChange={handleInputChange}
        />
        <Input
          className={`wmx2 ${styles['house-number-input']}`}
          data-cy="autocomplete-house-number"
          placeholder={placeholders?.houseNumber}
          value={address?.houseNumber || ''}
          name="houseNumber"
          onChange={handleInputChange}
        />
      </div>
      <Input
        className="mt16"
        data-cy="autocomplete-additional-info"
        placeholder={placeholders?.additionalInformation}
        value={address?.additionalInformation || ''}
        name="additionalInformation"
        onChange={handleInputChange}
      />
      <div className={`d-flex c-gap16 mt16 ${styles['input-line']}`}>
        <Input
          className="w100"
          data-cy="autocomplete-postcode"
          placeholder={placeholders?.postcode}
          value={address?.postcode || ''}
          name="postcode"
          onChange={handleInputChange}
        />
        <Input
          className="w100"
          data-cy="autocomplete-city"
          placeholder={placeholders?.city}
          value={address?.city || ''}
          name="city"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default ManualAddressEntry;

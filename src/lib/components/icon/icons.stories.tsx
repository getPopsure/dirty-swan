import { ChangeEvent, useState } from 'react';
import { Input } from '../input';
import * as icons from './icons';
import Button from '../button';
import classNames from 'classnames';
import styles from './style.module.scss';

const story = {
  title: 'JSX/Icon/IconsList',
};

const iconsList = Object.entries(icons);

export const IconsList = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState(iconsList);

  const clearSearch = () => {
    setValue('');
    setOptions(iconsList);
  };

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(event.target.value);

    if (searchValue === '') {
      setOptions(iconsList);
      return;
    }

    setOptions(iconsList.filter(([key]) => 
      key.toLowerCase()
        .includes(searchValue.toLowerCase())
    ));
  };

  return (
    <div className={classNames(styles.wrapper, 'pt96')}>
      <div className={classNames(styles.searchBar, 'bg-white d-flex gap8 p16 pt0')}>
        <Input
          className='w70'
          onChange={handleOnSearch}
          placeholder='Search icon'
          value={value} 
        />
        <Button className='w30' disabled={!value} buttonTitle='Clear search' onClick={clearSearch} />
      </div>

      <div className='d-flex gap8'>
        {options.map(([iconKey, Icon]) => (
          <div key={iconKey} className="w20 d-flex fd-column ai-center br4 p24 pt16 pb16 bg-grey-100">
            <Icon size={32} />
            <span className='p-p--small'>{iconKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default story;

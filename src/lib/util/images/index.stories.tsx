import { ChangeEvent, useState } from 'react';
import { illustrations } from '../../util/images';
import classNames from 'classnames';
import { Button, Input } from '../..';
import styles from './style.module.scss';

const story = {
  title: 'Utils/Illustrations',
  parameters: {
    docs: {
      description: {
        component:
          'Use the `illustrations` object export to access our list of available images.',
      },
    },
  },
};

const initialImages = Object.entries(illustrations)

export const Illustrations = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState(initialImages);

  const clearSearch = () => {
    setValue('');
    setOptions(initialImages);
  };

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue(event.target.value);

    if (searchValue === '') {
      setOptions(initialImages);
      return;
    }

    setOptions(initialImages.filter(([key]) => 
      key.toLowerCase()
        .includes(searchValue.toLowerCase())
    ));
  };

  return (
    <div>
      <div className={classNames(styles.searchBar, 'bg-white')}>
        <div className='d-flex gap8 wmx12 m-auto'>
        <Input
          className='w70'
          onChange={handleOnSearch}
          placeholder='Search icon'
          value={value} 
        />
        <Button className='w30' disabled={!value} onClick={clearSearch}>
          Clear search
        </Button>
        </div>
      </div>

      <div className='d-flex f-wrap mt80'>
        {options.map(([iconKey, src]) => (
          <div key={iconKey} className="w20 p8">
            <div className='br4 p24 pt16 pb16 bg-neutral-50 w100 d-flex fd-column ai-center'>
              <div className={styles.imageWrapper}>
                <img src={src} alt={iconKey} />
              </div>
              <span className='p-p--small mt16'>{iconKey}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default story;

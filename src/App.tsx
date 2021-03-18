import React from 'react';
import './lib/scss/index.scss';

import DateSelector from './lib/components/dateSelector';
import Dropzone from './lib/components/dropzone';
import SignaturePad from './lib/components/signaturePad';
import { CardWithLeftIcon } from './lib/components/cards';
import AutocompleteAddress from './lib/components/autocompleteAddress';

function App() {
  return (
    <div>
      <div className="p-btn p-btn--primary">Hello world</div>
      <DateSelector
        onChange={() => {}}
        yearBoundaries={{ min: 1990, max: 2010 }}
      />
      <div className="p-notice p-notice--info d-flex">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        malesuada laoreet nulla, non maximus ante porta sit amet. Aenean non
        ipsum nec quam gravida convallis vitae sit amet nisi.
      </div>
      <Dropzone
        uploading={true}
        progress={32}
        onSelectedFile={() => {}}
        // uploadedFileUrl="http://foo.com/my-file.png"
      />
      <div style={{ backgroundColor: 'white', padding: '24px' }}>
        <SignaturePad
          onChange={(v) => {
            console.log(v);
          }}
        />
      </div>
      <div className="mt80"></div>
      <CardWithLeftIcon
        title="Lorem ipsum"
        titleSize="small"
        className="wmx6 mt8"
        rightIcon="arrow"
      >
        Praesent euismod porta odio at tempus. Aenean urna massa, facilisis
        malesuada eros at, rhoncus imperdiet nunc
      </CardWithLeftIcon>
    </div>
  );
}

export default App;

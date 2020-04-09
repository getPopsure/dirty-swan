import React from "react";
import "./lib/scss/index.scss";

import DateSelector from "./lib/components/dateSelector";
import Dropzone from "./lib/components/dropzone";
import SignaturePad from "./lib/components/signaturePad";
import AutocompleteAddress from "./lib/components/autocompleteAddress";

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
      <div style={{ backgroundColor: "white", padding: "24px" }}>
        <SignaturePad
          onChange={(v) => {
            console.log(v);
          }}
        />
      </div>
      <div className="mt80">
        <AutocompleteAddress onAddressChange={(a) => console.log(a)} />
      </div>
    </div>
  );
}

export default App;

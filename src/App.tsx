import React from "react";
import "./lib/scss/index.scss";

import DateSelector from "./lib/components/dateSelector";
import DropZone from "./lib/components/dropZone";

function App() {
  return (
    <div>
      <div className="p-btn p-btn--primary">Hello world</div>
      <DateSelector
        onChange={() => {}}
        yearBoundaries={{ min: 1990, max: 2010 }}
      />
      <div className="p-notice p-notice--info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        malesuada laoreet nulla, non maximus ante porta sit amet. Aenean non
        ipsum nec quam gravida convallis vitae sit amet nisi.
      </div>
      <DropZone
        uploading={true}
        progress={32}
        onSelectedFile={() => {}}
        // uploadedFileUrl="http://foo.com/my-file.png"
      />
    </div>
  );
}

export default App;

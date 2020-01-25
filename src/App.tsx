import React from "react";
import "./lib/scss/index.scss";
import DateSelector from "./lib/components/dateSelector";

function App() {
  return (
    <div>
      <div className="p-btn p-btn--primary">Hello world</div>
      <DateSelector
        onChange={() => {}}
        yearBoundaries={{ min: 1990, max: 2010 }}
      />
    </div>
  );
}

export default App;

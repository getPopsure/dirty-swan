import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  DateSelector,
  Dropzone,
  SignaturePad,
  AutocompleteAddress,
} from "./lib";

export { DateSelector, Dropzone, SignaturePad, AutocompleteAddress };

ReactDOM.render(<App />, document.getElementById("root"));

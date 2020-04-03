import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import DateSelector from "./lib/components/dateSelector";
import Dropzone from "./lib/components/dropzone";
import SignaturePad from "./lib/components/signaturePad";

export { DateSelector, Dropzone, SignaturePad };

ReactDOM.render(<App />, document.getElementById("root"));

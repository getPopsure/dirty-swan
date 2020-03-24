import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import DateSelector from "./lib/components/dateSelector";
import Dropzone from "./lib/components/dropzone";

export { DateSelector, Dropzone };

ReactDOM.render(<App />, document.getElementById("root"));

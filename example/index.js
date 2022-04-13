import React from "react";
import { render } from "react-dom";
import GengEditor from "../src";

const App = () => (
  <div style={{ width: 800 }}>
    <GengEditor />
  </div>
);
render(<App />, document.getElementById("root"));

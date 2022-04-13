import React from "react";
import { render } from "react-dom";
// 非link import时下面这个，并注释掉link import
// import GengEditor from "../src";

// link import 时用下面这两个，并注释掉非link import
import GengEditor from "geng-editor";
import "geng-editor/dist/gengEditor.css";

const App = () => (
  <div style={{ width: 800 }}>
    <GengEditor />
  </div>
);
render(<App />, document.getElementById("root"));

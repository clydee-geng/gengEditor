import React from "react";
import { render } from "react-dom";
// 开发时用 src的index
// import GengEditor from "../src";

// 测试包时用 先 yarn add geng-editor@file:./dist -D， 然后用下面的语句
import GengEditor from "geng-editor/gengEditor";
import "../dist/gengEditor.css";

const App = () => (
  <div style={{ width: 800 }}>
    <GengEditor />
  </div>
);
render(<App />, document.getElementById("root"));

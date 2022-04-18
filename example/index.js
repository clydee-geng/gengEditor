import React from "react";
import { render } from "react-dom";
// 开发时用 src的index
import GengEditor from "../src";

// 测试包时用 先 yarn add geng-editor@file:./dist -D， 然后用下面的语句
// import GengEditor from "geng-editor/gengEditor";
// import "../dist/gengEditor.css";

const App = () => {
  const mediaUploadConfig = {
    Image: {
      uploadFn: (info) =>
        new Promise((resolve, reject) => {
          console.log(info);
          setTimeout(() => {
            resolve("https://s2.ax1x.com/2020/02/29/3yhm8S.jpg");
          }, 3000);
        }),
      acceptArr: [".jpg"],
      limitMB: 5,
    },
  };

  return (
    <div style={{ width: 800 }}>
      <GengEditor mediaUploadConfig={mediaUploadConfig} />
    </div>
  );
};
render(<App />, document.getElementById("root"));

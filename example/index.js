import React from "react";
import { render } from "react-dom";
// 开发时用 src的index
import GengEditor from "../src";

// 测试包时用 先 yarn add geng-editor@file:./dist -D， 然后用下面的语句
// import GengEditor from "geng-editor/gengEditor";
// import "../dist/gengEditor.css";

const App = () => (
  <div style={{ width: 800 }}>
    <GengEditor
      uploadPropsFn={{
        image: (info) =>
          new Promise((resolve, reject) => {
            console.log(info);
            setTimeout(() => {
              resolve("https://s2.ax1x.com/2020/02/29/3yhm8S.jpg");
            }, 3000);
          }),
        audio: (info) =>
          new Promise((resolve, reject) => {
            console.log(info);
            setTimeout(() => {
              resolve(
                "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
              );
            }, 3000);
          }),
        video: (info) =>
          new Promise((resolve, reject) => {
            console.log(info);
            setTimeout(() => {
              resolve(
                "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
              );
            }, 3000);
          }),
      }}
    />
  </div>
);
render(<App />, document.getElementById("root"));

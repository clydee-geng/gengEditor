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
		Video: {
			uploadFn: (info) =>
				new Promise((resolve, reject) => {
					console.log(info);
					setTimeout(() => {
						resolve(
							"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
						);
					}, 3000);
				}),
			acceptArr: [".mp4"],
			limitMB: 6,
		},
		Audio: {
			uploadFn: (info) =>
				new Promise((resolve, reject) => {
					console.log(info);
					setTimeout(() => {
						resolve(
							"https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
						);
					}, 3000);
				}),
			acceptArr: [".mp3"],
			limitMB: 7,
		},
	};

	const defaultValue =
		'<p><strong>1111111</strong></p><p><em><span style="font-size:48px">2222222</span></em></p><p><span style="font-size:24px">3333333</span></p><p><u>44444</u></p><p><span style="text-decoration:line-through">55555</span></p><p><span style="color:#FF0000">66666</span></p><p><span style="background-color:#FFA500">77777</span></p><p><a href="88888">88888</a></p><ul><li>9999</li></ul><ol><li style="text-align:center;">101010</li></ol><h1 style="text-align:center;">11111111</h1><blockquote style="text-align:center;">121211212<br/>1211212<br/>12211</blockquote><pre>13131331313<br/>   13131313<br/></pre><span style="line-height: 3";>1414314414</span><p>15151515</p><p>16161616</p><p></p><p></p><figure style="text-align:center;"><img src="https://s2.ax1x.com/2020/02/29/3yhm8S.jpg" style="width:166px;height:237px;" /></figure><p></p><figure><video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" style="width:100%;" controls /></figure><p></p><figure><audio src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" style="width:100%;" controls /></figure><p></p><p></p><p></p>';
	const [value, setValue] = React.useState(defaultValue);

	return (
		<div style={{ width: 800 }}>
			<GengEditor
				mediaUploadConfig={mediaUploadConfig}
				value={value}
				onChange={(e) => {
					console.log("eeee", e);
					setValue(e);
				}}
			/>
			<button onClick={() => console.log("bt,", value)}>btn</button>
		</div>
	);
};
render(<App />, document.getElementById("root"));

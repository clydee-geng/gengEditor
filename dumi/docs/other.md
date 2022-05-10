# 其他用法

## 受控组件

```tsx
import React from 'react';
import GengEditor from 'geng-editor';
import 'geng-editor/dist/gengEditor.css';

const App = () => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <GengEditor
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
      />
      <div style={{ padding: 10, backgroundColor: '#efefef', marginTop: 10 }}>
        输出结果：{value}
      </div>
    </>
  );
};

export default App;
```

## 禁用模式

```tsx
import React from 'react';
import GengEditor from 'geng-editor';
import 'geng-editor/dist/gengEditor.css';

const value =
  '<p><strong>1111111</strong></p><p><em>2222222</em></p><p><span style="font-size:24px">3333333</span></p><p><u>44444</u></p><p><span style="text-decoration:line-through">55555</span></p><p><span style="color:#FF0000">66666</span></p><p><span style="background-color:#FFA500">77777</span></p><p><a href="88888">88888</a></p><ul><li>9999</li></ul><ol><li>101010</li></ol><h1>11111111</h1><blockquote>121211212<br/>1211212<br/>12211</blockquote><pre>13131331313<br/>   13131313<br/></pre><span style="line-height: 3";>1414314414</span><p style="text-indent:2em;">15151515</p><p style="text-align:center;">16161616</p><p></p><figure><img src="https://s2.ax1x.com/2020/02/29/3yhm8S.jpg" style="width:204.5px;height:292.435px;" /></figure><p></p><figure><video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" controls /></figure><p></p><figure><audio src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" controls /></figure><p></p>';

const App = () => {
  return <GengEditor value={value} disabled style={{ height: 300 }} />;
};

export default App;
```

## 自定义上传方法

```tsx
import React from 'react';
import GengEditor from 'geng-editor';
import 'geng-editor/dist/gengEditor.css';

const mediaUploadConfig = {
  Image: {
    uploadFn: (info) =>
      new Promise((resolve, reject) => {
        console.log(info);
        setTimeout(() => {
          resolve('https://s2.ax1x.com/2020/02/29/3yhm8S.jpg');
        }, 3000);
      }),
    acceptArr: ['.jpg'],
    limitMB: 5,
  },
  Video: {
    uploadFn: (info) =>
      new Promise((resolve, reject) => {
        console.log(info);
        setTimeout(() => {
          resolve(
            'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          );
        }, 3000);
      }),
    acceptArr: ['.mp4'],
    limitMB: 6,
  },
  Audio: {
    uploadFn: (info) =>
      new Promise((resolve, reject) => {
        console.log(info);
        setTimeout(() => {
          resolve(
            'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          );
        }, 3000);
      }),
    acceptArr: ['.mp3'],
    limitMB: 7,
  },
};
const App = () => {
  return <GengEditor mediaUploadConfig={mediaUploadConfig} />;
};

export default App;
```

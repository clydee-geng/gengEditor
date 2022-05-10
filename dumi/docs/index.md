# 介绍

## 什么 geng-editor？

`geng-editor` 是一个适用于 React 的富文本编辑器组件。

它基于 [ant design](https://ant.design/) 和 [draft-js](https://draftjs.org/) 。

## ✨ Feature

- 🔥 使用热门的 React hooks 和 Typescript 编写，紧跟时代潮流；
- 📦 开箱即用，和 antd 无缝结合；并且可作为受控组件，用于表单选项；
- 💪 基于和 React 师出同门的 draft.js 编写，和 React 无缝结合；
- 🎨 集成 color-pickr，轻松添加更多颜色
- ⬆️ 自定义媒体文件上传方法，上传文件更加灵活
- 👬 拖动式修改上传的图片大小，操作更友好

## use

1.安装

```
npm i geng-editor
```

2.在 react 组件中使用

```js
import React from 'react';
import { render } from 'react-dom';
import GengEditor from 'geng-editor';
import 'geng-editor/dist/gengEditor.css';

const App = () => {
  return (
    <div style={{ width: 1000 }}>
      <GengEditor />
    </div>
  );
};

render(<App />, document.getElementById('root'));
```

3.例子

```jsx
import React from 'react';
import GengEditor from 'geng-editor';
import 'geng-editor/dist/gengEditor.css';

const App = () => {
  return <GengEditor />;
};

export default App;
```

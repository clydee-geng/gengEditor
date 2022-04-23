# 介绍

## 什么 geng-editor？

`geng-editor` 是一个适用于 React 的富文本编辑器组件。

它基于 [ant design](https://ant.design/) 和 [draft-js](https://draftjs.org/) 。

## ✨ Feature

- 🚀 使用 React hooks 和 Typescript 编写；
- 👬 和 antd 无缝结合，上手简单；
- 💪 完全的受控组件，可用于表单选项；
- 💪 基于和 React 师出同门的 draft.js 编写，和 React 无缝结合；

## use

1.安装

```
yarn add geng-editor
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
import GengEditor from '../../dist/gengEditor.js';
import '../../dist/gengEditor.css';

const App = () => {
  return <GengEditor />;
};

export default App;
```

import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import { Button } from "antd";
import "antd/dist/antd.css";

const EditorComp = () => {
  /**
   * hooks
   */
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  /**
   * jsx
   */

  return (
    <div className={styles.EditorComp}>
      <div className={styles.text}>1111</div>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default EditorComp;

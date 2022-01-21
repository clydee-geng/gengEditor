import React from "react";
import { Editor, EditorState, ContentBlock } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import PresetsComps from "../PresetsComps";

interface IProps {
  style?: React.CSSProperties;
}

const EditorComp: React.FC<IProps> = (props) => {
  const { style } = props;
  /**
   * hooks
   */
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editorRef = React.useRef<any>(null);

  React.useEffect(() => {
    keepEditorFocusBindFn();
  }, [editorState]);

  /**
   * method
   */

  const keepEditorFocusBindFn = () => {
    editorRef.current?.focus();
  };

  /**
   * jsx
   */

  return (
    <div className={styles.EditorComp} style={style}>
      <PresetsComps.Bold
        editorState={editorState}
        setEditorState={setEditorState}
      ></PresetsComps.Bold>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="请输入..."
        ref={editorRef}
      />
    </div>
  );
};

export default EditorComp;

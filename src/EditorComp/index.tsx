import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import PresetsComps from "../PresetsComps";
import { useStateWithCallback } from "../hooks";

interface IProps {
  style?: React.CSSProperties;
}

const EditorComp: React.FC<IProps> = (props) => {
  const { style } = props;
  /**
   * hooks
   */
  const [editorState, setEditorState] = useStateWithCallback(() =>
    EditorState.createEmpty()
  );

  const editorRef = React.useRef<any>(null);

  /**
   * method
   */

  const keepEditorFocusBindFn = () => {
    editorRef.current?.focus();
  };

  /**
   * jsx
   */

  const PresetsCompsProps = {
    editorState,
    setEditorState,
    keepEditorFocusPropsFn: keepEditorFocusBindFn,
  };

  return (
    <div className={styles.EditorComp} style={style}>
      <PresetsComps.Bold {...PresetsCompsProps}></PresetsComps.Bold>
      <PresetsComps.Italic {...PresetsCompsProps}></PresetsComps.Italic>
      <PresetsComps.Underline {...PresetsCompsProps}></PresetsComps.Underline>
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

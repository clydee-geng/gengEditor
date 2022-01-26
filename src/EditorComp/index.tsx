import React from "react";
import { Editor, EditorState } from "draft-js";
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

  const [customStyleMap, setCustomStyleMap] = React.useState({});

  const editorRef = React.useRef<any>(null);

  React.useEffect(() => {
    keepEditorFocusBindFn();
  }, [editorState.getCurrentInlineStyle()]);

  /**
   * method
   */

  const keepEditorFocusBindFn = () => {
    editorRef.current?.focus();
  };

  /**
   * jsx
   */

  const commonCompsProps = {
    editorState,
    setEditorState,
    customStyleMap,
    setCustomStyleMap,
  };

  return (
    <div className={styles.EditorComp} style={style}>
      <PresetsComps.Bold {...commonCompsProps}></PresetsComps.Bold>
      <PresetsComps.Italic {...commonCompsProps}></PresetsComps.Italic>
      <PresetsComps.Underline {...commonCompsProps}></PresetsComps.Underline>
      <PresetsComps.Strikethrough
        {...commonCompsProps}
      ></PresetsComps.Strikethrough>
      <PresetsComps.FontColors
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.FontColors>
      <PresetsComps.BackGroundColors
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.BackGroundColors>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="请输入..."
        ref={editorRef}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};

export default EditorComp;

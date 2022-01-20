import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import PresetsComps from "../PresetsComps";

interface IProps {}

const EditorComp: React.FC<IProps> = (props) => {
  const {} = props;
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
      <PresetsComps.Bold></PresetsComps.Bold>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default EditorComp;

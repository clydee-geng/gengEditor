import React from "react";
import {
  Editor,
  EditorState,
  ContentBlock,
  DraftHandleValue,
  RichUtils,
} from "draft-js";
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

  const blockStyleBindFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return styles.blockquote;
    }
    return "";
  };

  const returnBindFn = (e: any): DraftHandleValue => {
    const selection = editorState.getSelection();
    const contentBlock = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    if (contentBlock.getType() === "blockquote") {
      if (
        e.getModifierState("Shift") ||
        e.getModifierState("Alt") ||
        e.getModifierState("Control")
      ) {
        // 如果同时按着shift、alt、ctrl键，按下的回车键
        console.log("同时按着shift、alt、ctrl键，按下的回车键");
      } else {
        // 普通回车
        setEditorState(RichUtils.insertSoftNewline(editorState));
        return "handled";
      }
    }
    return "not-handled";
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
      <PresetsComps.Link
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.Link>
      <PresetsComps.UL {...commonCompsProps}></PresetsComps.UL>
      <PresetsComps.OL {...commonCompsProps}></PresetsComps.OL>
      <PresetsComps.Header
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.Header>
      <PresetsComps.Blockquote {...commonCompsProps}></PresetsComps.Blockquote>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="请输入..."
        ref={editorRef}
        customStyleMap={customStyleMap}
        blockStyleFn={blockStyleBindFn}
        handleReturn={returnBindFn}
      />
    </div>
  );
};

export default EditorComp;

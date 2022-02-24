import React from "react";
import {
  Editor,
  EditorState,
  ContentBlock,
  DraftHandleValue,
  RichUtils,
  Modifier,
  DefaultDraftBlockRenderMap,
  DraftBlockRenderMap,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import PresetsComps from "../PresetsComps";
import { getCurrentContentBlock } from "@alias/utils";

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
  const [customBlockRenderMap, setCustomBlockRenderMap] =
    React.useState<DraftBlockRenderMap>(DefaultDraftBlockRenderMap);
  const editorRef = React.useRef<any>(null);

  React.useEffect(() => {
    keepEditorFocusBindFn();
  }, [
    editorState.getCurrentInlineStyle(),
    getCurrentContentBlock(editorState).getType(),
    getCurrentContentBlock(editorState).getData(),
  ]);

  /**
   * method
   */

  const keepEditorFocusBindFn = () => {
    editorRef.current?.focus();
  };

  const blockStyleBindFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    let classNames = "";
    if (type === "blockquote") {
      classNames = styles.blockquote;
    }
    if (type === "code-block") {
      classNames = styles.codeBlock;
    }
    if (type.includes("line-height")) {
      const typeArr = type.split("-");
      classNames = styles[`lineHeight${typeArr[typeArr.length - 1]}`];
    }

    // ====
    const blockData = contentBlock.getData();
    const textIndentVal = blockData.get("textIndent");
    if (textIndentVal) {
      classNames += " " + styles[`textIndent${textIndentVal}`];
    }

    return classNames;
  };

  const returnBindFn = (e: any): DraftHandleValue => {
    const contentBlock = getCurrentContentBlock(editorState);
    if (
      contentBlock.getType() === "blockquote" ||
      contentBlock.getType() === "code-block"
    ) {
      if (
        e.getModifierState("Shift") ||
        e.getModifierState("Alt") ||
        e.getModifierState("Control")
      ) {
        // 如果同时按着shift、alt、ctrl键，按下的回车键,新起一行
        const newContentState = Modifier.splitBlock(
          editorState.getCurrentContent(),
          editorState.getSelection()
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "split-block"
        );

        const nextContentState =
          RichUtils.tryToRemoveBlockStyle(newEditorState);
        if (nextContentState) {
          const nextEditorState = EditorState.push(
            newEditorState,
            nextContentState,
            "change-block-type"
          );
          setEditorState(nextEditorState);
          return "handled";
        }
      } else {
        // 普通回车，在当前的block换行
        setEditorState(RichUtils.insertSoftNewline(editorState));
        return "handled";
      }
    }
    return "not-handled";
  };

  const keyCommandBindFn = (command: string): DraftHandleValue => {
    const nextEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (nextEditorState) {
      setEditorState(nextEditorState);
      return "handled";
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
    setCustomBlockRenderMap,
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
      <PresetsComps.Code {...commonCompsProps}></PresetsComps.Code>
      <PresetsComps.LineHeight
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.LineHeight>
      <PresetsComps.AddIndent
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.AddIndent>
      <PresetsComps.MinusIndent
        {...commonCompsProps}
        keepEditorFocusBindFn={keepEditorFocusBindFn}
      ></PresetsComps.MinusIndent>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="请输入..."
        ref={editorRef}
        customStyleMap={customStyleMap}
        blockStyleFn={blockStyleBindFn}
        handleReturn={returnBindFn}
        handleKeyCommand={keyCommandBindFn}
        blockRenderMap={customBlockRenderMap}
      />
    </div>
  );
};

export default EditorComp;

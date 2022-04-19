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
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./index.less";
import PresetsComps from "../PresetsComps";
import { getCurrentContentBlock } from "@alias/utils";
import { convertToHTML, convertFromHTML } from "draft-convert";
import {
  styleToHTML,
  blockToHTML,
  entityToHTML,
  htmlToStyle,
  htmlToBlock,
  htmlToEntity,
} from "./config";
import MediaContent from "../PresetsComps/Media/Content";
import classnames from "classnames";
import { decorators } from "./decorators";
import { IMediaUploadConfig } from "@alias/types/interfaces";

const PresetsCompsList = Object.keys(PresetsComps).map((item: string) => {
  return {
    Comp: PresetsComps[item],
    key: item,
  };
});

interface IProps {
  style?: React.CSSProperties;
  disabled?: boolean;
  mediaUploadConfig?: IMediaUploadConfig;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

const EditorComp: React.FC<IProps> = (props) => {
  const {
    style,
    disabled,
    mediaUploadConfig,
    placeholder = "请输入...",
    value = "",
    onChange,
  } = props;
  /**
   * hooks
   */
  const [customStyleMap, setCustomStyleMap] = React.useState({});

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      convertFromHTML({
        htmlToStyle: (nodeName: string, node: HTMLElement, currentStyle: any) =>
          htmlToStyle(nodeName, node, currentStyle, {
            customStyleMap,
            setCustomStyleMap,
          }),
        htmlToBlock,
        htmlToEntity,
      })(value),
      decorators
    )
  );

  const [customBlockRenderMap, setCustomBlockRenderMap] =
    React.useState<DraftBlockRenderMap>(DefaultDraftBlockRenderMap);
  const editorRef = React.useRef<any>(null);
  const isNeedHidePlaceholder = React.useRef<boolean>(false);

  // 变量
  const contentState = editorState.getCurrentContent();
  const contentBlock = getCurrentContentBlock(editorState);
  const selectionState = editorState.getSelection();

  React.useEffect(() => {
    if (contentBlock.getType() !== "atomic") {
      keepEditorFocusBindFn();
    }
  }, [
    editorState.getCurrentInlineStyle(),
    contentBlock.getType(),
    contentBlock.getData(),
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
    const textAlignVal = blockData.get("textAlign");
    if (textAlignVal) {
      classNames += " " + styles[`textAlign${textAlignVal}`];
    }

    return classNames;
  };

  const blockRendererFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "atomic") {
      return {
        component: MediaContent,
        props: {
          editorState: editorState,
          setEditorState: setEditorState,
          editorContentDom: editorRef.current?.editor,
          curSelectBlock: contentBlock,
          disabled: disabled,
        },
        editable: false,
      };
    }
  };

  const returnBindFn = (e: any): DraftHandleValue => {
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

  const toHTMLStrBindFn = (editorState: EditorState) => {
    const htmlStr = convertToHTML({
      styleToHTML,
      blockToHTML: (block: any) => blockToHTML(block),
      entityToHTML,
    })(editorState.getCurrentContent());
    return htmlStr;
  };

  // 设置placeholder是否显示
  const changeIsNeedHidePlaceholder = () => {
    isNeedHidePlaceholder.current = false;
    const firstType = contentState.getBlockMap().first().getType();
    if (!contentState.hasText()) {
      if (
        firstType === "ordered-list-item" ||
        firstType === "unordered-list-item" ||
        firstType === "blockquote" ||
        firstType === "code-block"
      ) {
        isNeedHidePlaceholder.current = true;
      }
    }
  };

  changeIsNeedHidePlaceholder();

  /**
   * jsx
   */

  const commonCompsProps = {
    editorState,
    setEditorState,
    customStyleMap,
    setCustomStyleMap,
    setCustomBlockRenderMap,
    keepEditorFocusBindFn,
  };

  return (
    <div
      className={
        disabled
          ? classnames(styles.EditorComp, styles.EditorCompDisabled)
          : styles.EditorComp
      }
      style={style}
    >
      <div className={styles.Toolbar}>
        {PresetsCompsList.map((item, index) => {
          if (
            (item.key === "Image" ||
              item.key === "Video" ||
              item.key === "Audio") &&
            mediaUploadConfig
          ) {
            return (
              <item.Comp
                {...commonCompsProps}
                key={item.key}
                mediaUploadConfig={mediaUploadConfig[item.key]}
              />
            );
          }

          return <item.Comp {...commonCompsProps} key={item.key} />;
        })}
      </div>
      <div
        className={
          isNeedHidePlaceholder.current
            ? classnames(styles.hidePlaceholder, styles.Content)
            : styles.Content
        }
      >
        <Editor
          editorState={editorState}
          onChange={(e) => {
            setEditorState(e);
            typeof onChange === "function" && onChange(toHTMLStrBindFn(e));
          }}
          placeholder={placeholder}
          ref={editorRef}
          customStyleMap={customStyleMap}
          blockStyleFn={blockStyleBindFn}
          handleReturn={returnBindFn}
          handleKeyCommand={keyCommandBindFn}
          blockRenderMap={customBlockRenderMap}
          blockRendererFn={blockRendererFn}
          readOnly={disabled}
        />
      </div>
    </div>
  );
};

export default EditorComp;

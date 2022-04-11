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
import Media from "../PresetsComps/Media";
import classnames from "classnames";
import { decorators } from "./decorators";

const PresetsCompsList = Object.keys(PresetsComps).map((item: string) => {
  return {
    Comp: PresetsComps[item],
    key: item,
  };
});
interface IProps {
  style?: React.CSSProperties;
  disabled?: boolean;
}

const EditorComp: React.FC<IProps> = (props) => {
  const { style, disabled = true } = props;
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
      })(
        '<p><strong>1111111</strong></p><p><em>2222222</em></p><p><span style="font-size:24px">3333333</span></p><p><u>44444</u></p><p><span style="text-decoration:line-through">55555</span></p><p><span style="color:#FF0000">66666</span></p><p><span style="background-color:#FFA500">77777</span></p><p><a href="88888">88888</a></p><ul><li>9999</li></ul><ol><li>101010</li></ol><h1>11111111</h1><blockquote>121211212<br/>1211212<br/>12211</blockquote><pre>13131331313<br/>   13131313<br/></pre><span style="line-height: 3";>1414314414</span><p style="text-indent:2em;">15151515</p><p style="text-align:center;">16161616</p><p></p><figure><img src="https://s2.ax1x.com/2020/02/29/3yhm8S.jpg" style="width:204.5px;height:292.435px;" /></figure><p></p><figure><video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" controls /></figure><p></p><figure><audio src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" controls /></figure><p></p>'
      ),
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
        component: Media,
        props: {
          editorState: editorState,
          setEditorState: setEditorState,
          editorContentDom: editorRef.current?.editor,
          curSelectBlock: contentBlock,
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

  const toHTMLStrBindFn = () => {
    const htmlStr = convertToHTML({
      styleToHTML,
      blockToHTML: (block: any) => blockToHTML(block),
      entityToHTML,
    })(editorState.getCurrentContent());
    console.log(htmlStr);
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
    <div className={styles.EditorComp} style={style}>
      <div
        className={
          disabled
            ? classnames(styles.disabledToolbar, styles.Toolbar)
            : styles.Toolbar
        }
      >
        {PresetsCompsList.map((item, index) => {
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
          onChange={setEditorState}
          placeholder="请输入..."
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
      <button onClick={toHTMLStrBindFn}>toHtml</button>
    </div>
  );
};

export default EditorComp;

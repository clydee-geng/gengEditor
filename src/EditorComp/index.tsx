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

const PresetsCompsList = Object.keys(PresetsComps).map((item: string) => {
  return {
    Comp: PresetsComps[item],
    key: item,
  };
});
interface IProps {
  style?: React.CSSProperties;
}

const EditorComp: React.FC<IProps> = (props) => {
  const { style } = props;
  /**
   * hooks
   */
  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createEmpty()
  // );
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
        '<p>qwer<strong>qrq</strong>r<span style="font-size:48px">qr</span></p><p></p><figure><video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4" controls /></figure><p></p><p>ds<span style="color:#FFA500">fff</span>s</p><p>ds<span style="background-color:#FF0000">fsdf</span></p><p></p><p></p><figure style="text-align:center;"><img src="https://s2.ax1x.com/2020/02/29/3yhm8S.jpg" style="width:244px;height:348.92px;" /></figure><p></p><p></p><p></p>'
      )
    )
  );

  const [customBlockRenderMap, setCustomBlockRenderMap] =
    React.useState<DraftBlockRenderMap>(DefaultDraftBlockRenderMap);
  const editorRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (getCurrentContentBlock(editorState).getType() !== "atomic") {
      keepEditorFocusBindFn();
    }
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
        },
        editable: false,
      };
    }
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

  const toHTMLStrBindFn = () => {
    const htmlStr = convertToHTML({
      styleToHTML,
      blockToHTML,
      entityToHTML,
    })(editorState.getCurrentContent());
    console.log(htmlStr);
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
    keepEditorFocusBindFn,
  };

  return (
    <div className={styles.EditorComp} style={style}>
      {PresetsCompsList.map((item, index) => {
        return <item.Comp {...commonCompsProps} key={item.key} />;
      })}

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
      />

      <button onClick={toHTMLStrBindFn}>toHTMLStr</button>
    </div>
  );
};

export default EditorComp;

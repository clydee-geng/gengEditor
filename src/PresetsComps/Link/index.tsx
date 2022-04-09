import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { EditorState, Modifier, RichUtils, CompositeDecorator } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import { Button, Input, message, Tooltip } from "antd";
import styles from "./index.less";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const Link: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    keepEditorFocusBindFn,
  } = props;
  /**
   * hooks
   */

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    keepEditorFocusBindFn();
    if (visible) {
      const nextLinkText = getCurSelectedText();
      setLinkText(nextLinkText);
      if (nextLinkText) {
        setLinkUrl(getCurSelectedLinkUrl());
      }
    } else {
      setLinkText("");
      setLinkUrl("");
    }
  }, [visible]);

  const [linkText, setLinkText] = React.useState<string>();
  const [linkUrl, setLinkUrl] = React.useState<string>();

  /**
   * methods
   */

  const getCurSelectedText = () => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };

  const getCurSelectedLinkUrl = () => {
    let url = "";
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
    }

    return url;
  };

  const renderActiveColor = () => {
    return Boolean(getCurSelectedLinkUrl());
  };

  const confirmLinkBindFn = () => {
    if (!linkText) {
      return message.warning("请输入链接文字");
    }

    if (!linkUrl) {
      return message.warning("请输入链接地址");
    }

    const LinkDecorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkDecoratorComp,
      },
    ]);

    let editorStateWithLinK = EditorState.set(editorState, {
      decorator: LinkDecorator,
    });

    const contentState = editorStateWithLinK.getCurrentContent();
    let contentStateWithEntityForLink = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: linkUrl }
    );
    const entityKey = contentStateWithEntityForLink.getLastCreatedEntityKey();

    const selectionState = editorStateWithLinK.getSelection();

    if (selectionState.isCollapsed()) {
      // 如果没有选中
      contentStateWithEntityForLink = Modifier.insertText(
        contentStateWithEntityForLink,
        selectionState,
        linkText,
        undefined,
        entityKey
      );
      editorStateWithLinK = EditorState.push(
        editorStateWithLinK,
        contentStateWithEntityForLink,
        "insert-fragment"
      );
    }

    const nextEditorState = EditorState.set(editorStateWithLinK, {
      currentContent: contentStateWithEntityForLink,
    });
    setEditorState(
      RichUtils.toggleLink(
        nextEditorState,
        nextEditorState.getSelection(),
        entityKey
      )
    );
    setVisible(false);
  };

  const cancelLinkBindFn = () => {
    const SelectionState = editorState.getSelection();
    setEditorState(RichUtils.toggleLink(editorState, SelectionState, null));
    setVisible(false);
  };

  const findLinkEntities = (
    contentBlock: any,
    callback: any,
    contentState: any
  ) => {
    contentBlock.findEntityRanges((character: any) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  };

  /** jsx */

  const LinkDecoratorComp: React.FC<any> = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <Tooltip title={`链接url：${url}`}>
        <a href={url} className={styles.link}>
          {props.children}
        </a>
      </Tooltip>
    );
  };

  const PopoverContent = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div>链接文字：</div>
          <div>
            <Input
              value={linkText}
              onChange={(e) => setLinkText(e.target.value.trim())}
              placeholder="请输入链接文字"
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>链接地址：</div>
          <div>
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value.trim())}
              placeholder="请输入链接地址"
            />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          {getCurSelectedText() && getCurSelectedLinkUrl() && (
            <Button size="small" onClick={cancelLinkBindFn}>
              取消链接
            </Button>
          )}

          <Button
            type="primary"
            size="small"
            onClick={confirmLinkBindFn}
            style={{ marginLeft: "10px" }}
          >
            {editorState.getSelection().isCollapsed() ? "插入链接" : "修改链接"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PopoverBtn
      PopoverTitle="设置链接"
      tip="链接"
      icon={<LinkOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default Link;

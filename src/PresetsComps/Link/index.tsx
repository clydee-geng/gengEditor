import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { EditorState, Modifier, RichUtils, CompositeDecorator } from "draft-js";
import ToogleBtnByPopover from "../ToogleBtnByPopover";
import { Button, Input, message } from "antd";
import styles from "./index.less";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const FontColors: React.FC<IProps> = (props) => {
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
      setLinkText(getCurSelectedText());
      setLinkUrl(getCurSelectedLinkUrl());
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
    let url = null;
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
    let activeColor: any = "#000000";
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("FONT_COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("FONT_COLOR_", "");
    }
    return activeColor;
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

    const editorStateWithLinK = EditorState.set(editorState, {
      decorator: LinkDecorator,
    });

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: linkUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log("entitiy key", entityKey);
    const newEditorState = EditorState.set(editorStateWithLinK, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  const cancelLinkBindFn = () => {};

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
      <a href={url} className={styles.link}>
        {props.children}
      </a>
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
          <Button size="small" onClick={cancelLinkBindFn}>
            取消链接
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={confirmLinkBindFn}
            style={{ marginLeft: "10px" }}
          >
            插入
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
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

export default FontColors;

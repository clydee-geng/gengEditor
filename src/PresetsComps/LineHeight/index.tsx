import React from "react";
import { EditorState, RichUtils, Modifier } from "draft-js";
import ToogleBtnByPopover from "../ToogleBtnByPopover";
import styles from "./index.less";
import classnames from "classnames";
import { Button } from "antd";
import { getCurrentContentBlock } from "@alias/utils";
import { LineHeightOutlined } from "@ant-design/icons";

const LineHeightData = [
  { text: "1", styleStr: "LINE_HEIGHT_1" },
  { text: "1.15", styleStr: "LINE_HEIGHT_1.15" },
  { text: "1.6", styleStr: "LINE_HEIGHT_1.6" },
  { text: "2", styleStr: "LINE_HEIGHT_2" },
  { text: "2.5", styleStr: "LINE_HEIGHT_2.5" },
  { text: "3", styleStr: "LINE_HEIGHT_3" },
];

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const LineHeight: React.FC<IProps> = (props) => {
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
  }, [visible]);

  /**
   * methods
   */

  const renderActiveColor = () => {
    let isActive = false;
    const blockType = getCurBlockType();
    if (LineHeightData.map((item) => item.styleStr).includes(blockType)) {
      isActive = true;
    }
    return isActive;
  };

  const setTitleBindFn = (item: any) => {
    setVisible(false);
    if (item.styleStr) {
      setEditorState(RichUtils.toggleBlockType(editorState, item.styleStr));
    }
  };

  const getCurBlockType = () => {
    return getCurrentContentBlock(editorState).getType();
  };

  const cancelSetTitleBindFn = () => {
    setVisible(false);
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const nextContentState = Modifier.setBlockType(
      contentState,
      selection,
      "unstyled"
    );

    const nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-block-type"
    );

    setEditorState(nextEditorState);
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div className={styles.popverContent}>
        {LineHeightData.map((item) => {
          return (
            <div
              className={
                visible && getCurBlockType() === item.styleStr
                  ? classnames(styles.popverContentItem, styles.active)
                  : styles.popverContentItem
              }
              key={item.styleStr}
              onClick={() => setTitleBindFn(item)}
            >
              {item.text}
            </div>
          );
        })}
        <Button style={{ marginTop: "10px" }} onClick={cancelSetTitleBindFn}>
          默认
        </Button>
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
      PopoverTitle="设置行高"
      tip="行高"
      icon={<LineHeightOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default LineHeight;

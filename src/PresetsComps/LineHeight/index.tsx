import React from "react";
import {
  EditorState,
  RichUtils,
  Modifier,
  DraftBlockRenderMap,
} from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import classnames from "classnames";
import { Button } from "antd";
import { LineHeightOutlined } from "@ant-design/icons";
import { Map } from "immutable";
import { getCurrentContentBlock } from "@alias/utils";

const LineHeightData = [
  { text: "1", styleStr: "line-height-100" },
  { text: "1.15", styleStr: "line-height-115" },
  { text: "1.6", styleStr: "line-height-160" },
  { text: "2", styleStr: "line-height-200" },
  { text: "2.5", styleStr: "line-height-250" },
  { text: "3", styleStr: "line-height-300" },
];

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  setCustomBlockRenderMap: any;
  keepEditorFocusBindFn: () => void;
}

const LineHeight: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    setCustomBlockRenderMap,
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
   * lifeCycle
   */

  React.useEffect(() => {
    let blockRenderMap: DraftBlockRenderMap = Map();

    LineHeightData.some((item, index) => {
      blockRenderMap = blockRenderMap.set(item.styleStr, { element: "div" });
    });

    setCustomBlockRenderMap((preState: DraftBlockRenderMap) => {
      return preState.merge(blockRenderMap);
    });
  }, []);

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

  const getCurBlockType = () => {
    return getCurrentContentBlock(editorState).getType();
  };

  const setLineHeightBindFn = (item: any) => {
    setVisible(false);
    if (item.styleStr) {
      setEditorState(RichUtils.toggleBlockType(editorState, item.styleStr));
    }
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
              onClick={() => setLineHeightBindFn(item)}
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
    <PopoverBtn
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

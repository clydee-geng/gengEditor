import React from "react";
import {
  EditorState,
  RichUtils,
  Modifier,
  DraftBlockRenderMap,
} from "draft-js";
import ToogleBtnByPopover from "../ToogleBtnByPopover";
import styles from "./index.less";
import classnames from "classnames";
import { Button } from "antd";
import { LineHeightOutlined } from "@ant-design/icons";
import { Map } from "immutable";

const LineHeightData = [
  { text: "1", styleStr: "line-height-1" },
  { text: "1.15", styleStr: "line-height-1.15" },
  { text: "1.6", styleStr: "line-height-1.6" },
  { text: "2", styleStr: "line-height-2" },
  { text: "2.5", styleStr: "line-height-2.5" },
  { text: "3", styleStr: "line-height-3" },
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
      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          [item.styleStr]: { lineHeight: item.text },
        };
      });
      blockRenderMap = blockRenderMap.set(item.styleStr, { element: "p" });
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
    const currentStyle = editorState.getCurrentInlineStyle();
    LineHeightData.some((item) => {
      if (currentStyle.has(item.styleStr)) {
        isActive = true;
        return true;
      }
    });
    return isActive;
  };

  const setLineHeightBindFn = (item: any) => {
    setVisible(false);
    if (item.styleStr) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, item.styleStr));
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
                visible &&
                editorState.getCurrentInlineStyle().has(item.styleStr)
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

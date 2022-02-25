import React from "react";
import { EditorState, RichUtils, Modifier } from "draft-js";
import ToogleBtnByPopover from "../ToogleBtnByPopover";
import styles from "./index.less";
import classnames from "classnames";
import { Button, InputNumber } from "antd";
import { getCurrentContentBlock } from "@alias/utils";
import { FontSizeOutlined } from "@ant-design/icons";

const FontSizeData = [10, 13, 14, 18, 24, 32, 48];

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const FontSize: React.FC<IProps> = (props) => {
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
  const [curFontSize, setCurFontSize] = React.useState();

  React.useEffect(() => {
    keepEditorFocusBindFn();
  }, [visible]);

  /**
   * methods
   */

  const renderActiveColor = () => {
    let isActive = false;
    return isActive;
  };

  const saveBindFn = () => {
    setVisible(false);
    const SelectionState = editorState.getSelection();
    if (!SelectionState.isCollapsed()) {
      console.log("//有选中");

      // 先去除所以Color_的style
      const currentStyle = editorState.getCurrentInlineStyle();
      let ContentState = editorState.getCurrentContent();

      currentStyle.forEach((item) => {
        if (item?.includes("FONT_SIZE_")) {
          ContentState = Modifier.removeInlineStyle(
            ContentState,
            SelectionState,
            item
          );
        }
      });

      const nextContentState = Modifier.applyInlineStyle(
        ContentState,
        SelectionState,
        "FONT_COLOR_" + curFontSize
      );

      const nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["FONT_COLOR_" + curFontSize]: { fontSize: curFontSize + "px" },
        };
      });
      setEditorState(nextEditorState);
    }
  };

  const clickBindFn = (item: any) => {
    setCurFontSize(item);
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div className={styles.popverContent}>
        {FontSizeData.map((item) => {
          return (
            <div
              className={
                visible
                  ? classnames(styles.popverContentItem, styles.active)
                  : styles.popverContentItem
              }
              key={item}
              onClick={() => clickBindFn(item)}
            >
              {item}px
            </div>
          );
        })}
        <div className={styles.operateArea}>
          <InputNumber
            className={styles.input}
            placeholder="请输入"
            addonAfter={"px"}
            value={curFontSize}
            onChange={(e: any) => setCurFontSize(e)}
          />
          <Button className={styles.btn} onClick={saveBindFn}>
            确定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
      PopoverTitle="设置文字大小"
      tip="文字大小"
      icon={<FontSizeOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default FontSize;

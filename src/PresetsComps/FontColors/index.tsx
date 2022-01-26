import React from "react";
import { FontColorsOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { EditorState, DraftStyleMap, Modifier } from "draft-js";
import ButtonLayout from "@alias/components/ButtonLayout";
import ReactPickr from "@alias/components/reactPickr";
import { Button, Popover } from "antd";

const fontColorsCustomStyleMap: DraftStyleMap = {
  "COLOR_#000000": {
    color: "#000000",
  },
  "COLOR_#FFFFFF": {
    color: "#FFFFFF",
  },
  "COLOR_#FF0000": {
    color: "#FF0000",
  },
  "COLOR_#FFA500": {
    color: "#FFA500",
  },
  "COLOR_#FFFF00": {
    color: "#FFFF00",
  },
  "COLOR_#008000": {
    color: "#008000",
  },
  "COLOR_#00FFFF": {
    color: "#00FFFF",
  },
  "COLOR_#0000FF": {
    color: "#0000FF",
  },
  "COLOR_#800080": {
    color: "#800080",
  },
  "COLOR_#FFC0CB": {
    color: "#FFC0CB",
  },
};

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  customStyleMap: DraftStyleMap;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const FontColors: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    customStyleMap,
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

  const setColorBindFn = (colorStr: string) => {
    setVisible(false);
    const SelectionState = editorState.getSelection();
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      console.log("//有选中");

      // 先去除所以Color_的style
      const currentStyle = editorState.getCurrentInlineStyle();
      let ContentState = editorState.getCurrentContent();

      currentStyle.forEach((item) => {
        if (item?.includes("COLOR_")) {
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
        "COLOR_" + colorStr
      );

      const nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["COLOR_" + colorStr]: { color: colorStr },
        };
      });
      setEditorState(nextEditorState);
    }
  };

  const renderActiveColor = () => {
    let activeColor: any = "#000000";
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("COLOR_", "");
    }
    return activeColor;
  };

  /** jsx */
  return (
    <Popover
      trigger="click"
      title="选择文本颜色"
      destroyTooltipOnHide
      content={
        <div className={styles.popoverContent}>
          <ReactPickr
            changePropsFn={setColorBindFn}
            defaultColor={renderActiveColor()}
          />
        </div>
      }
      visible={visible}
      onVisibleChange={(e) => {
        setVisible(e);
      }}
    >
      <div style={{ display: "inline" }}>
        <ButtonLayout
          icon={<FontColorsOutlined />}
          activeColor={renderActiveColor()}
          tip="文本颜色"
        />
      </div>
    </Popover>
  );
};

export default FontColors;

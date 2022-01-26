import React from "react";
import { FontColorsOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { RichUtils, EditorState, DraftStyleMap, Modifier } from "draft-js";
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

      const EditorStateRemoveAllCOLOR_ = EditorState.push(
        editorState,
        ContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["COLOR_" + colorStr]: { color: colorStr },
        };
      });
      setEditorState(
        RichUtils.toggleInlineStyle(
          EditorStateRemoveAllCOLOR_,
          "COLOR_" + colorStr
        )
      );
    }
  };

  const renderActiveColor = () => {
    let activeColor: any = false;
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("COLOR_", "");
    }
    console.log("renderActiveColor: ", activeColor);
    return activeColor;
  };

  /** jsx */
  return (
    <Popover
      trigger="click"
      title="选择文本颜色"
      content={
        <div className={styles.popoverContent}>
          {/* {convertFontColorsCustomStyleMap().map((item, index) => {
            return (
              <div
                key={"FontColors" + index}
                className={styles.popoverContentItem}
              >
                <div
                  className={styles.popoverContentItemIcon}
                  style={item.val}
                  onClick={() => setColorBindFn(item)}
                >
                  <FontColorsOutlined />
                </div>
              </div>
            );
          })} */}
          <ReactPickr changePropsFn={setColorBindFn} />
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

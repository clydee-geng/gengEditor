import React from "react";
import { FontColorsOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { RichUtils, EditorState, DraftStyleMap } from "draft-js";
import ButtonLayout from "@components/ButtonLayout";
import { Popover } from "antd";

const fontColorsCustomStyleMap: DraftStyleMap = {
  "COLOR:#000000": {
    color: "#000000",
  },
  "COLOR:#FFFFFF": {
    color: "#FFFFFF",
  },
  "COLOR:#FF0000": {
    color: "#FF0000",
  },
  "COLOR:#FFA500": {
    color: "#FFA500",
  },
  "COLOR:#FFFF00": {
    color: "#FFFF00",
  },
  "COLOR:#008000": {
    color: "#008000",
  },
  "COLOR:#00FFFF": {
    color: "#00FFFF",
  },
  "COLOR:#0000FF": {
    color: "#0000FF",
  },
  "COLOR:#800080": {
    color: "#800080",
  },
  "COLOR:#FFC0CB": {
    color: "#FFC0CB",
  },
};

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  keepEditorFocusPropsFn: () => void;
  customStyleMap: DraftStyleMap;
  setCustomStyleMap: any;
}

const FontColors: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    keepEditorFocusPropsFn,
    setCustomStyleMap,
  } = props;

  /**
   * hooks
   */

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setCustomStyleMap(fontColorsCustomStyleMap);
  }, []);

  /**
   * methods
   */

  const setColorBindFn = (itemData: any) => {
    console.log(itemData);
    setVisible(false);
    const SelectionState = editorState.getSelection();
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      //有选中
      setEditorState(
        RichUtils.toggleInlineStyle(editorState, itemData.key),
        () => {
          keepEditorFocusPropsFn();
        }
      );
    }
  };

  const convertFontColorsCustomStyleMap = () => {
    let arr = [];
    for (let k in fontColorsCustomStyleMap) {
      arr.push({
        key: k,
        val: fontColorsCustomStyleMap[k],
      });
    }
    return arr;
  };

  /** jsx */
  return (
    <Popover
      trigger="click"
      title="颜色"
      content={
        <div className={styles.popoverContent}>
          {convertFontColorsCustomStyleMap().map((item, index) => {
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
          })}
        </div>
      }
      visible={visible}
      onVisibleChange={(e) => setVisible(e)}
    >
      <div style={{ display: "inline" }}>
        <ButtonLayout
          icon={<FontColorsOutlined />}
          // isActive={isActiveBindFn()}
          tip="文本颜色"
        />
      </div>
    </Popover>
  );
};

export default FontColors;

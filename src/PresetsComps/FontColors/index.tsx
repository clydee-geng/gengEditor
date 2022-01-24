import React from "react";
import { FontColorsOutlined } from "@ant-design/icons";
import styles from "./index.less";
import { RichUtils, EditorState } from "draft-js";
import ButtonLayout from "@components/ButtonLayout";
import { Popover } from "antd";

interface FontColorsDataItem {
  color: string;
}

const fontColorsData: FontColorsDataItem[] = [
  {
    color: "black",
  },
  {
    color: "white",
  },
  {
    color: "red",
  },
  {
    color: "yellow",
  },
  {
    color: "blue",
  },
  {
    color: "green",
  },
  {
    color: "pink",
  },
  {
    color: "purple",
  },
  {
    color: "orange",
  },
];

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  keepEditorFocusPropsFn: () => void;
}

const FontColors: React.FC<IProps> = (props) => {
  const { editorState, setEditorState, keepEditorFocusPropsFn } = props;

  /**
   * hooks
   */

  /** jsx */
  return (
    <Popover
      trigger="click"
      title="颜色"
      content={
        <div className={styles.popoverContent}>
          {fontColorsData.map((item, index) => {
            return (
              <div
                key={"FontColors" + index}
                className={styles.popoverContentItem}
              >
                <div
                  className={styles.popoverContentItemIcon}
                  style={{ color: item.color }}
                >
                  <FontColorsOutlined />
                </div>
              </div>
            );
          })}
        </div>
      }
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

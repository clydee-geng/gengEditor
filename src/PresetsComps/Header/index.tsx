import React from "react";
import Icon from "@ant-design/icons";
import { EditorState, RichUtils } from "draft-js";
import ToogleBtnByPopover from "../ToogleBtnByPopover";
import styles from "./index.less";
import classnames from "classnames";

const HeadeIcon = () => (
  <Icon component={() => <i className="iconfont icon-header"></i>} />
);

const HeaderData = [
  { text: "H1", styleStr: "header-one", fontSize: 36 },
  { text: "H2", styleStr: "header-two", fontSize: 24 },
  { text: "H3", styleStr: "header-three", fontSize: 21 },
  { text: "H4", styleStr: "header-four", fontSize: 18 },
  { text: "H5", styleStr: "header-five", fontSize: 16 },
  { text: "H6", styleStr: "header-six", fontSize: 14 },
];

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const Header: React.FC<IProps> = (props) => {
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
    if (HeaderData.map((item) => item.styleStr).includes(blockType)) {
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
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return blockType;
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div className={styles.popverContent}>
        {HeaderData.map((item) => {
          return (
            <div
              className={
                visible && getCurBlockType() === item.styleStr
                  ? classnames(styles.popverContentItem, styles.active)
                  : styles.popverContentItem
              }
              key={item.styleStr}
              style={{ fontSize: item.fontSize }}
              onClick={() => setTitleBindFn(item)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
      PopoverTitle="设置标题"
      tip="标题"
      icon={<HeadeIcon />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default Header;

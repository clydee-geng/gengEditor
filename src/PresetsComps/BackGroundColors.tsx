import React from "react";
import { BgColorsOutlined } from "@ant-design/icons";
import { EditorState, Modifier } from "draft-js";
import ReactPickr from "@alias/components/reactPickr";
import ToogleBtnByPopover from "./ToogleBtnByPopover";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const BackGroundColors: React.FC<IProps> = (props) => {
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

  const setColorBindFn = (colorStr: string) => {
    setVisible(false);
    const SelectionState = editorState.getSelection();
    if (!SelectionState.isCollapsed()) {
      console.log("//有选中");

      // 先去除所以Color_的style
      const currentStyle = editorState.getCurrentInlineStyle();
      let ContentState = editorState.getCurrentContent();

      currentStyle.forEach((item) => {
        if (item?.includes("BG_COLOR_")) {
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
        "BG_COLOR_" + colorStr
      );

      const nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["BG_COLOR_" + colorStr]: { backgroundColor: colorStr },
        };
      });
      setEditorState(nextEditorState);
    }
  };

  const renderActiveColor = () => {
    let activeColor: any = "#fff";
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("BG_COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("BG_COLOR_", "");
    }
    return activeColor;
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div>
        <ReactPickr
          savePropsFn={setColorBindFn}
          defaultColor={renderActiveColor()}
        />
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
      PopoverTitle="设置背景颜色"
      tip="背景颜色"
      icon={<BgColorsOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
      activeColorCSSProp="backgroundColor"
    />
  );
};

export default BackGroundColors;

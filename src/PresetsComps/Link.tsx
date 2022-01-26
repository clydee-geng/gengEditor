import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { EditorState, Modifier } from "draft-js";
import ReactPickr from "@alias/components/reactPickr";
import ToogleBtnByPopover from "./ToogleBtnByPopover";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const FontColors: React.FC<IProps> = (props) => {
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
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      console.log("//有选中");

      // 先去除所以Color_的style
      const currentStyle = editorState.getCurrentInlineStyle();
      let ContentState = editorState.getCurrentContent();

      currentStyle.forEach((item) => {
        if (item?.includes("FONT_COLOR_")) {
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
        "FONT_COLOR_" + colorStr
      );

      const nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["FONT_COLOR_" + colorStr]: { color: colorStr },
        };
      });
      setEditorState(nextEditorState);
    }
  };

  const renderActiveColor = () => {
    let activeColor: any = "#000000";
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("FONT_COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("FONT_COLOR_", "");
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
      PopoverTitle="设置链接"
      tip="链接"
      icon={<LinkOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default FontColors;

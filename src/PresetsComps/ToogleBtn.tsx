import React from "react";
import ButtonLayout from "@alias/components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";
import { getCurrentContentBlock } from "@alias/utils";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  styleStr: string;
  icon: React.ReactNode;
  tip: React.ReactNode;
  type: "inline" | "block";
}

const ToogleBtn: React.FC<IProps> = (props) => {
  const { editorState, setEditorState, styleStr, icon, tip, type } = props;

  /**
   * hooks
   */

  /**
   * methods
   */

  const renderActiveColor = () => {
    let isActive = false;
    if (type === "inline") {
      const currentStyle = editorState.getCurrentInlineStyle();
      if (currentStyle.has(styleStr)) {
        isActive = true;
      }
    } else if (type === "block") {
      const contentBlock = getCurrentContentBlock(editorState);
      if (contentBlock.getType() === styleStr) {
        isActive = true;
      }
    }

    return isActive;
  };

  const clickBindFn = () => {
    if (type === "inline") {
      const SelectionState = editorState.getSelection();
      if (!SelectionState.isCollapsed()) {
        //有选中
        setEditorState(RichUtils.toggleInlineStyle(editorState, styleStr));
      }
    } else if (type === "block") {
      setEditorState(RichUtils.toggleBlockType(editorState, styleStr));
    }
  };

  /**
   * jsx
   */
  return (
    <ButtonLayout
      icon={icon}
      activeColor={renderActiveColor()}
      tip={tip}
      clickPropsFn={clickBindFn}
    />
  );
};
export default ToogleBtn;

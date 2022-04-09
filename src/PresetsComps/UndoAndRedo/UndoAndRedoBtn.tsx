import React from "react";
import ButtonLayout from "@alias/components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";
import { getCurrentContentBlock } from "@alias/utils";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  icon: React.ReactNode;
  tip: React.ReactNode;
  type: "undo" | "redo";
  disabled: boolean;
}

const UndoAndRedoBtn: React.FC<IProps> = (props) => {
  const { editorState, setEditorState, icon, tip, type, disabled } = props;

  /**
   * hooks
   */

  /**
   * methods
   */

  // const renderActiveColor = () => {
  //   let isActive = false;
  //   if (type === "inline") {
  //     const currentStyle = editorState.getCurrentInlineStyle();
  //     if (currentStyle.has(styleStr)) {
  //       isActive = true;
  //     }
  //   } else if (type === "block") {
  //     const contentBlock = getCurrentContentBlock(editorState);
  //     if (contentBlock.getType() === styleStr) {
  //       isActive = true;
  //     }
  //   }

  //   return isActive;
  // };

  const clickBindFn = () => {
    if (type === "undo") {
      setEditorState(EditorState.undo(editorState));
    } else if (type === "redo") {
      setEditorState(EditorState.redo(editorState));
    }
  };

  /**
   * jsx
   */
  return (
    <ButtonLayout
      disabled={disabled}
      icon={icon}
      activeColor={false}
      tip={tip}
      clickPropsFn={clickBindFn}
    />
  );
};
export default UndoAndRedoBtn;

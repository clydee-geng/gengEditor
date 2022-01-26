import React from "react";
import ButtonLayout from "@alias/components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  inlineStyleStr: string;
  icon: React.ReactNode;
  tip: React.ReactNode;
}

const InlineStyleCtrl: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    inlineStyleStr,
    icon,
    tip,
  } = props;

  /**
   * hooks
   */

  /**
   * methods
   */

  const renderActiveColor = () => {
    let isActive = false;
    const currentStyle = editorState.getCurrentInlineStyle();
    if (currentStyle.has(inlineStyleStr)) {
      isActive = true;
    }
    return isActive;
  };

  const clickBindFn = () => {
    const SelectionState = editorState.getSelection();
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      //有选中
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyleStr));
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
export default InlineStyleCtrl;

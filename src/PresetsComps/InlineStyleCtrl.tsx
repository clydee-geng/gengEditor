import React from "react";
import ButtonLayout from "@components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  keepEditorFocusPropsFn: () => void;
  inlineStyleStr: string;
  icon: React.ReactNode;
  tip: React.ReactNode;
}

const InlineStyleCtrl: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    keepEditorFocusPropsFn,
    inlineStyleStr,
    icon,
    tip,
  } = props;

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
      setEditorState(
        RichUtils.toggleInlineStyle(editorState, inlineStyleStr),
        () => {
          keepEditorFocusPropsFn();
        }
      );
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

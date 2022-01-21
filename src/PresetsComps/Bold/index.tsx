import React from "react";
import { BoldOutlined } from "@ant-design/icons";
import ButtonLayout from "../../components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  keepEditorFocusPropsFn: () => void;
}

const Bold: React.FC<IProps> = (props) => {
  const { editorState, setEditorState, keepEditorFocusPropsFn } = props;

  /**
   * methods
   */

  const isActiveBindFn = () => {
    let isActive = false;
    const currentStyle = editorState.getCurrentInlineStyle();
    if (currentStyle.has("BOLD")) {
      isActive = true;
    }
    return isActive;
  };

  const clickBindFn = () => {
    const SelectionState = editorState.getSelection();
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      //有选中
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"), () => {
        keepEditorFocusPropsFn();
      });
    }
  };

  /**
   * jsx
   */
  return (
    <ButtonLayout
      icon={<BoldOutlined />}
      isActive={isActiveBindFn()}
      tip="加粗"
      clickPropsFn={clickBindFn}
    />
  );
};
export default Bold;

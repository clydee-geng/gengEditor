import React, { Dispatch, SetStateAction } from "react";
import { BoldOutlined } from "@ant-design/icons";
import ButtonLayout from "../../components/ButtonLayout";
import { RichUtils, EditorState } from "draft-js";

interface IProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const Bold: React.FC<IProps> = (props) => {
  const { editorState, setEditorState } = props;
  return (
    <ButtonLayout
      icon={<BoldOutlined />}
      tip="加粗"
      clickPropsFn={() =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
      }
    />
  );
};
export default Bold;

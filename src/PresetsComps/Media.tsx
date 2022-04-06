import React from "react";
import { EditorState, ContentBlock, ContentState } from "draft-js";
import ResizeImg from "./Image/resizeImg";
import VideoContent from "./Video/Content";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: {
    editorContentDom: HTMLElement;
    editorState: EditorState;
    setEditorState: any;
  };
}
const Media: React.FC<IProps> = (props) => {
  const { block, contentState } = props;
  const entitykey = block.getEntityAt(0);
  const type = contentState.getEntity(entitykey).getType();
  return (
    <>
      {type === "IMAGE" && <ResizeImg {...props} />}
      {type === "VIDEO" && <VideoContent {...props} />}
    </>
  );
};

export default Media;

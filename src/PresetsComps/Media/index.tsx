import React from "react";
import { EditorState, ContentBlock, ContentState } from "draft-js";
import ImageContent from "../Image/Content";
import VideoContent from "../Video/Content";
import AudioContent from "../Audio/Content";
import styles from "./index.less";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: {
    editorContentDom: HTMLElement;
    editorState: EditorState;
    setEditorState: any;
    curSelectBlock?: ContentBlock;
  };
}
const Media: React.FC<IProps> = (props) => {
  const { block, contentState, blockProps } = props;
  const entitykey = block.getEntityAt(0);
  const type = contentState.getEntity(entitykey).getType();

  return (
    <div className={styles.Media}>
      {type === "IMAGE" && <ImageContent {...props} />}
      {type === "VIDEO" && <VideoContent {...props} />}
      {type === "AUDIO" && <AudioContent {...props} />}
    </div>
  );
};

export default Media;

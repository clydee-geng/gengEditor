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
    entityType: string;
  };
}
const Media: React.FC<IProps> = (props) => {
  const { blockProps } = props;
  const { entityType } = blockProps;

  return (
    <div className={styles.Media}>
      {entityType === "IMAGE" && <ImageContent {...props} />}
      {entityType === "VIDEO" && <VideoContent {...props} />}
      {entityType === "AUDIO" && <AudioContent {...props} />}
    </div>
  );
};

export default Media;

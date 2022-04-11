import React from "react";
import { EditorState, ContentBlock, ContentState } from "draft-js";
import ImageContent from "../Image/Content";
import VideoContent from "../Video/Content";
import AudioContent from "../Audio/Content";
import styles from "./index.less";
import classnames from "classnames";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: {
    editorContentDom: HTMLElement;
    editorState: EditorState;
    setEditorState: any;
    curSelectBlock?: ContentBlock;
    disabled: boolean;
  };
}
const Media: React.FC<IProps> = (props) => {
  const { block, contentState, blockProps } = props;
  const { disabled } = blockProps;
  const entitykey = block.getEntityAt(0);
  const type = contentState.getEntity(entitykey).getType();

  return (
    <div
      className={
        disabled ? classnames(styles.Media, styles.MediaDisable) : styles.Media
      }
    >
      {type === "IMAGE" && <ImageContent {...props} />}
      {type === "VIDEO" && <VideoContent {...props} />}
      {type === "AUDIO" && <AudioContent {...props} />}
    </div>
  );
};

export default Media;

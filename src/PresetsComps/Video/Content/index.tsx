import React from "react";
import styles from "./index.less";
import { ContentBlock, ContentState } from "draft-js";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
}

const Content: React.FC<IProps> = (props) => {
  const { block, contentState } = props;
  const entitykey = block.getEntityAt(0);
  const data = contentState.getEntity(entitykey).getData();

  /**
   * hooks
   */

  /**
   * life
   */

  /**
   * jsx
   */

  return (
    <div className={styles.content}>
      <video
        src={data?.src}
        style={{ width: "100%" }}
        controls
        draggable="false"
      />
    </div>
  );
};

export default Content;

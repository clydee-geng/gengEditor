import React from "react";
import { ContentBlock, ContentState, CompositeDecorator } from "draft-js";
import { Tooltip } from "antd";
import styles from "./index.less";
import { IentityData } from "../index";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: {
    entityData: IentityData;
  };
}
const LinkContent: React.FC<IProps> = (props) => {
  const { blockProps } = props;
  const { entityData } = blockProps;

  /**
   * variable
   */

  return (
    <Tooltip title={`链接url：${entityData.url}`}>
      <a href={entityData.url} className={styles.link}>
        {entityData.text}
      </a>
    </Tooltip>
  );
};

export default LinkContent;

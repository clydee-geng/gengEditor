import { Tooltip } from "antd";
import { CompositeDecorator } from "draft-js";
import styles from "./index.less";

const LinkDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock: any, callback: any, contentState: any) => {
      contentBlock.findEntityRanges((character: any) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === "LINK"
        );
      }, callback);
    },
    component: (props: any) => {
      const { url } = props.contentState.getEntity(props.entityKey).getData();
      return (
        <Tooltip title={`链接url：${url}`}>
          <a href={url} className={styles.link}>
            {props.children}
          </a>
        </Tooltip>
      );
    },
  },
]);

export { LinkDecorator };

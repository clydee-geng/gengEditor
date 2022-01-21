import { Button, Tooltip } from "antd";
import { ReactNode } from "react";
import styles from "./index.less";
import classnames from "classnames";
interface IProps {
  icon: ReactNode;
  tip?: ReactNode;
  clickPropsFn?: () => void;
  isActive?: boolean;
}

const ButtonLayout: React.FC<IProps> = (props) => {
  const { icon, tip, clickPropsFn, isActive } = props;

  /**
   * jsx
   */

  return (
    <Tooltip title={tip}>
      <Button
        type="text"
        icon={icon}
        onClick={clickPropsFn}
        className={
          isActive
            ? classnames(styles.active, styles.ButtonLayout)
            : styles.ButtonLayout
        }
      ></Button>
    </Tooltip>
  );
};

export default ButtonLayout;

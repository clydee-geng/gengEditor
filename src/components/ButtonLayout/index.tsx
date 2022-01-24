import { Button, Tooltip } from "antd";
import { ReactNode } from "react";
import styles from "./index.less";
import classnames from "classnames";
interface IProps {
  icon: ReactNode;
  tip?: ReactNode;
  clickPropsFn?: () => void;
  activeColor?: string | boolean;
}

const ButtonLayout: React.FC<IProps> = (props) => {
  const { icon, tip, clickPropsFn, activeColor } = props;

  /**
   * jsx
   */
  return (
    <Tooltip title={tip}>
      <Button
        type="text"
        icon={icon}
        onClick={clickPropsFn}
        style={typeof activeColor === "string" ? { color: activeColor } : {}}
        className={
          activeColor
            ? classnames(styles.active, styles.ButtonLayout)
            : styles.ButtonLayout
        }
      ></Button>
    </Tooltip>
  );
};

export default ButtonLayout;

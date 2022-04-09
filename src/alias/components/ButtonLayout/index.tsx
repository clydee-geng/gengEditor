import { Button, Tooltip } from "antd";
import { ReactNode } from "react";
import styles from "./index.less";
import classnames from "classnames";
interface IProps {
  icon: ReactNode;
  tip?: ReactNode;
  clickPropsFn?: () => void;
  activeColor?: string | boolean;
  activeColorCSSProp?: "color" | "backgroundColor";
  disabled?: boolean;
}

const ButtonLayout: React.FC<IProps> = (props) => {
  const {
    icon,
    tip,
    clickPropsFn,
    activeColor,
    activeColorCSSProp = "color",
    disabled = false,
  } = props;

  /**
   * jsx
   */
  return (
    <Tooltip title={tip}>
      <Button
        disabled={disabled}
        type="text"
        icon={icon}
        onClick={clickPropsFn}
        style={
          typeof activeColor === "string"
            ? { [activeColorCSSProp]: activeColor }
            : {}
        }
        className={
          activeColor
            ? activeColorCSSProp === "color"
              ? classnames(styles.activeForColor, styles.ButtonLayout)
              : classnames(styles.activeForBgColor, styles.ButtonLayout)
            : styles.ButtonLayout
        }
      ></Button>
    </Tooltip>
  );
};

export default ButtonLayout;

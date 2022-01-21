import { Button, Tooltip } from "antd";
import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  tip?: ReactNode;
  clickPropsFn?: () => void;
}

const ButtonLayout: React.FC<IProps> = (props) => {
  const { icon, tip, clickPropsFn } = props;

  /**
   * jsx
   */

  return (
    <Tooltip title={tip}>
      <Button type="text" icon={icon} onClick={clickPropsFn}></Button>
    </Tooltip>
  );
};

export default ButtonLayout;

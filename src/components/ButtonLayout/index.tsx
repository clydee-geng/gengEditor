import { Button, Tooltip } from "antd";
import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  tip?: ReactNode;
}

const ButtonLayout: React.FC<IProps> = (props) => {
  const { icon, tip } = props;

  /**
   * jsx
   */

  return (
    <Tooltip title={tip}>
      <Button type="text" icon={icon}></Button>
    </Tooltip>
  );
};

export default ButtonLayout;

import React from "react";
import ButtonLayout from "@alias/components/ButtonLayout";
import { Popover } from "antd";
interface IProps {
  PopoverTitle: React.ReactNode;
  PopoverContent: React.ReactNode;
  tip: string;
  icon: React.ReactNode;
  activeColor?: string | boolean;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  activeColorCSSProp?: "color" | "backgroundColor";
}

const PopoverBtn: React.FC<IProps> = (props) => {
  const {
    PopoverTitle,
    PopoverContent,
    tip,
    icon,
    activeColor,
    visible,
    onVisibleChange,
    activeColorCSSProp,
  } = props;

  /**
   * hooks
   */

  /**
   * methods
   */

  /** jsx */
  return (
    <Popover
      trigger="click"
      title={PopoverTitle}
      destroyTooltipOnHide
      content={PopoverContent}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      <div style={{ display: "inline" }}>
        <ButtonLayout
          icon={icon}
          activeColor={activeColor}
          tip={tip}
          activeColorCSSProp={activeColorCSSProp}
        />
      </div>
    </Popover>
  );
};

export default PopoverBtn;

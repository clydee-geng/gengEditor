import React from "react";
import { EditorState, DraftStyleMap, Modifier } from "draft-js";
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
}

const ToogleBtnByPopover: React.FC<IProps> = (props) => {
  const {
    PopoverTitle,
    PopoverContent,
    tip,
    icon,
    activeColor,
    visible,
    onVisibleChange,
    ...rest
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
        <ButtonLayout icon={icon} activeColor={activeColor} tip={tip} />
      </div>
    </Popover>
  );
};

export default ToogleBtnByPopover;

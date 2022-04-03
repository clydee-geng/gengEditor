import React from "react";
import { EditorState, Modifier } from "draft-js";
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import { getCurrentContentBlock } from "@alias/utils";
import ButtonLayout from "@alias/components/ButtonLayout";
import { Map } from "immutable";

const JustifyIcon = () => <i className="iconfont icon-align-justify"></i>;

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  setCustomBlockRenderMap: any;
  keepEditorFocusBindFn: () => void;
  type: "left" | "center" | "right" | "justify";
}

const TextAlignLogic: React.FC<IProps> = (props) => {
  const { editorState, setEditorState, type } = props;

  /**
   * hooks
   */

  /**
   * lifeCycle
   */

  /**
   * methods
   */

  const renderActiveColor = () => {
    let isActive = false;
    const textAlignVal = getCurrentContentBlockData("textAlign");
    if (type === textAlignVal) {
      isActive = true;
    }
    return isActive;
  };

  const getCurrentContentBlockData = (name?: string) => {
    const blockData = getCurrentContentBlock(editorState).getData();
    return name ? blockData.get(name) : blockData;
  };

  const clickBindFn = () => {
    let nextBlockData = Map();
    const curBlockData = getCurrentContentBlock(editorState).getData();
    if (curBlockData.get("textAlign") !== type) {
      nextBlockData = nextBlockData.set("textAlign", type);
    }
    const nextContentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      nextBlockData
    );
    const nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-block-data"
    );
    setEditorState(nextEditorState);
  };

  /** jsx */

  const typeFormat = () => {
    const obj: any = {};
    switch (type) {
      case "left":
        obj.tip = "靠左";
        obj.icon = <AlignLeftOutlined />;
        break;
      case "center":
        obj.tip = "居中";
        obj.icon = <AlignCenterOutlined />;
        break;
      case "right":
        obj.tip = "靠右";
        obj.icon = <AlignRightOutlined />;
        break;
      case "justify":
        obj.tip = "两端";
        obj.icon = <JustifyIcon />;
        break;
    }
    return obj;
  };

  return (
    <ButtonLayout
      tip={typeFormat()?.tip}
      icon={typeFormat()?.icon}
      activeColor={renderActiveColor()}
      clickPropsFn={clickBindFn}
    />
  );
};

export default TextAlignLogic;

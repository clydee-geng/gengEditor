import React from "react";
import {
  EditorState,
  RichUtils,
  Modifier,
  DraftBlockRenderMap,
} from "draft-js";
import classnames from "classnames";
import { Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { getCurrentContentBlock } from "@alias/utils";
import ButtonLayout from "@alias/components/ButtonLayout";
import { Map } from "immutable";

const maxIndent = 6;

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  setCustomBlockRenderMap: any;
  keepEditorFocusBindFn: () => void;
}

const AddIndent: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    setCustomBlockRenderMap,
    keepEditorFocusBindFn,
  } = props;

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
    const textIndentVal = getCurrentContentBlockData("textIndent");
    if (textIndentVal) {
      isActive = true;
    }
    return isActive;
  };

  const getCurBlockType = () => {
    return getCurrentContentBlock(editorState).getType();
  };

  const getCurrentContentBlockData = (name?: string) => {
    const blockData = getCurrentContentBlock(editorState).getData();
    return name ? blockData.get(name) : blockData;
  };

  const clickBindFn = () => {
    let nextBlockData = Map();
    const curTextIndentVal = getCurrentContentBlockData("textIndent") || 0;
    nextBlockData = nextBlockData.set(
      "textIndent",
      curTextIndentVal + 1 > maxIndent ? maxIndent : curTextIndentVal + 1
    );
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

  return (
    <ButtonLayout
      tip="增加缩进"
      icon={<MenuUnfoldOutlined />}
      activeColor={renderActiveColor()}
      clickPropsFn={clickBindFn}
    />
  );
};

export default AddIndent;

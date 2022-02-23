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
    const blockType = getCurBlockType();
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
    const nextBlockData = Map({ textIndent: 1 });
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
    setTimeout(()=>{
      console.log(getCurrentContentBlockData().toJS())
    })
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

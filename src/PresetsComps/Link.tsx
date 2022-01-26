import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { EditorState, Modifier } from "draft-js";
import ReactPickr from "@alias/components/reactPickr";
import ToogleBtnByPopover from "./ToogleBtnByPopover";
import { Button, Input } from "antd";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const FontColors: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    keepEditorFocusBindFn,
  } = props;

  /**
   * hooks
   */

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    keepEditorFocusBindFn();
    if (visible) {
      setLinkText(getCurSelectedText());
    }
  }, [visible]);

  const [linkText, setLinkText] = React.useState<string>();

  /**
   * methods
   */

  const getCurSelectedText = () => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };

  const setColorBindFn = (colorStr: string) => {
    setVisible(false);
    const SelectionState = editorState.getSelection();
    if (SelectionState.getEndOffset() > SelectionState.getStartOffset()) {
      console.log("//有选中");

      // 先去除所以Color_的style
      const currentStyle = editorState.getCurrentInlineStyle();
      let ContentState = editorState.getCurrentContent();

      currentStyle.forEach((item) => {
        if (item?.includes("FONT_COLOR_")) {
          ContentState = Modifier.removeInlineStyle(
            ContentState,
            SelectionState,
            item
          );
        }
      });

      const nextContentState = Modifier.applyInlineStyle(
        ContentState,
        SelectionState,
        "FONT_COLOR_" + colorStr
      );

      const nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style"
      );

      setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          ["FONT_COLOR_" + colorStr]: { color: colorStr },
        };
      });
      setEditorState(nextEditorState);
    }
  };

  const renderActiveColor = () => {
    let activeColor: any = "#000000";
    const currentStyle = editorState.getCurrentInlineStyle();
    const itemData = currentStyle.filter((item: any, index: any) => {
      return item.includes("FONT_COLOR_");
    });
    if (itemData.last()) {
      activeColor = itemData.last().replace("FONT_COLOR_", "");
    }
    return activeColor;
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div>链接文字：</div>
          <div>
            <Input
              value={linkText}
              onChange={(e) => setLinkText(e.target.value.trim())}
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>链接地址：</div>
          <div>
            <Input />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button type="primary" size="small">
            插入
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ToogleBtnByPopover
      PopoverTitle="设置链接"
      tip="链接"
      icon={<LinkOutlined />}
      activeColor={renderActiveColor()}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default FontColors;

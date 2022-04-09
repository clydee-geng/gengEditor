import React from "react";
import { EditorState, RichUtils, Modifier, AtomicBlockUtils } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import classnames from "classnames";
import { Button, Tabs, Upload, Input, message } from "antd";
import { PictureOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
}

const Image: React.FC<IProps> = (props) => {
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
  const [curUrl, setCurUrl] = React.useState(
    "https://s2.ax1x.com/2020/02/29/3yhm8S.jpg"
  );

  React.useEffect(() => {
    keepEditorFocusBindFn();
  }, [visible]);

  /**
   * methods
   */

  const saveBindFn = () => {
    if (!curUrl) {
      return message.warning("请上传图片或者输入图片url");
    }
    setVisible(false);

    const contentState = editorState.getCurrentContent();
    const entity = contentState.createEntity("IMAGE", "IMMUTABLE", {
      src: curUrl,
    });
    const entityKey = entity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: entity,
    });
    const nextEditorState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );
    setEditorState(nextEditorState);
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div className={styles.popverContent}>
        <Tabs>
          <Tabs.TabPane tab="上传图片" key="1">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => {}}
              onChange={() => {}}
            >
              {curUrl ? (
                <img
                  src={curUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div>选择图片</div>
                </div>
              )}
            </Upload>
          </Tabs.TabPane>
          <Tabs.TabPane tab="网络图片" key="2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div>图片Url：</div>
              <div>
                <Input
                  value={curUrl}
                  onChange={(e) => setCurUrl(e.target.value.trim())}
                  placeholder="请输入图片Url"
                />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button className={styles.btn} onClick={saveBindFn} type="primary">
            插入图片
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PopoverBtn
      PopoverTitle="插入图片"
      tip="插入图片"
      icon={<PictureOutlined />}
      activeColor={false}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default Image;

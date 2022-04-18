import React from "react";
import { EditorState, RichUtils, Modifier, AtomicBlockUtils } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import { Button, Tabs, Upload, Input, message } from "antd";
import { PictureOutlined, PlusOutlined } from "@ant-design/icons";
import { checkFileType } from "@alias/utils";
import { IMediaUploadItemConfig } from "@alias/types/interfaces";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
  mediaUploadConfig: IMediaUploadItemConfig;
}

const Image: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    keepEditorFocusBindFn,
    mediaUploadConfig,
  } = props;

  const { uploadFn, limitMB, acceptArr } = mediaUploadConfig || {};

  /**
   * hooks
   */

  const [visible, setVisible] = React.useState(false);
  const [curUrl, setCurUrl] = React.useState<string>();

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

  const customRequest = (info: any) => {
    if (typeof uploadFn === "function") {
      uploadFn(info).then((res) => {
        setCurUrl(res);
      });
    }
  };

  const beforeUpload = (file: File) => {
    if (Array.isArray(acceptArr) && !acceptArr.includes("*")) {
      // 检查文件后缀
      const error = checkFileType(file, acceptArr);
      if (error) {
        message.warn(error);
        return false;
      }
    }

    // 检查文件大小

    if (typeof limitMB === "number") {
      const isLtSize = file.size / 1024 / 1024 < limitMB;
      if (!isLtSize) {
        message.warn(`上传的图片需小于${limitMB}MB!`);
        return false;
      }
    }
  };

  /** jsx */

  const PopoverContent = () => {
    return (
      <div className={styles.popverContent}>
        <Tabs>
          <Tabs.TabPane tab="上传图片" key="1">
            <Upload
              accept={acceptArr?.join(", ")}
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
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

import React from "react";
import { EditorState, RichUtils, Modifier, AtomicBlockUtils } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import classnames from "classnames";
import { Button, Tabs, Upload, Input, message } from "antd";
import {
  CustomerServiceOutlined,
  PlusOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  setCustomStyleMap: any;
  keepEditorFocusBindFn: () => void;
  uploadPropsFn?:
    | ((info: any) => Promise<() => string>)
    | {
        image: (info: any) => Promise<() => string>;
        audio: (info: any) => Promise<() => string>;
        video: (info: any) => Promise<() => string>;
      };
}

const Audio: React.FC<IProps> = (props) => {
  const {
    editorState,
    setEditorState,
    setCustomStyleMap,
    keepEditorFocusBindFn,
    uploadPropsFn,
  } = props;

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
      return message.warning("请上传音频或者输入音频url");
    }
    setVisible(false);

    const contentState = editorState.getCurrentContent();
    const entity = contentState.createEntity("AUDIO", "IMMUTABLE", {
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
          <Tabs.TabPane tab="上传音频" key="1">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => {}}
              customRequest={(info) => {
                if (typeof uploadPropsFn === "function") {
                  uploadPropsFn(info).then((res) => {
                    setCurUrl(res);
                  });
                } else if (
                  typeof uploadPropsFn === "object" &&
                  typeof uploadPropsFn.audio === "function"
                ) {
                  uploadPropsFn.audio(info).then((res) => {
                    setCurUrl(res);
                  });
                }
              }}
            >
              {curUrl ? (
                <div className={styles.vidoeBox}>
                  <div className={styles.videoMask}>
                    <CaretRightOutlined />
                  </div>
                  <video src={curUrl} autoPlay={false} />
                </div>
              ) : (
                <div>
                  <PlusOutlined />
                  <div>选择音频</div>
                </div>
              )}
            </Upload>
          </Tabs.TabPane>
          <Tabs.TabPane tab="网络音频" key="2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div>音频Url：</div>
              <div>
                <Input
                  value={curUrl}
                  onChange={(e) => setCurUrl(e.target.value.trim())}
                  placeholder="请输入音频Url"
                />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button className={styles.btn} onClick={saveBindFn} type="primary">
            插入音频
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PopoverBtn
      PopoverTitle="插入音频"
      tip="插入音频"
      icon={<CustomerServiceOutlined />}
      activeColor={false}
      PopoverContent={PopoverContent}
      visible={visible}
      onVisibleChange={(e: boolean) => {
        setVisible(e);
      }}
    />
  );
};

export default Audio;

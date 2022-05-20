import React from "react";
import { EditorState, AtomicBlockUtils } from "draft-js";
import PopoverBtn from "../../PopoverBtn";
import styles from "./index.less";
import {
	Button,
	Tabs,
	Upload,
	Input,
	message,
	Spin,
	UploadProps,
	Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { checkFileType } from "@alias/utils";
import { IMediaUploadItemConfig } from "@alias/types/interfaces";

interface IProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	keepEditorFocusBindFn: () => void;
	mediaUploadConfig?: IMediaUploadItemConfig;
	type: "Image" | "Audio" | "Video";
	renderUploadedComp: (curUrl: string) => React.ReactElement;
	icon: React.ReactElement;
}

const Comp: React.FC<IProps> = (props) => {
	const {
		editorState,
		setEditorState,
		keepEditorFocusBindFn,
		mediaUploadConfig,
		type,
		renderUploadedComp,
		icon,
	} = props;

	const { uploadFn, limitMB, acceptArr } = mediaUploadConfig || {};
	/**
	 * hooks
	 */

	const [visible, setVisible] = React.useState(false);
	const [curUrl, setCurUrl] = React.useState<string>();
	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	React.useEffect(() => {
		keepEditorFocusBindFn();
		setCurUrl("");
	}, [visible]);

	/**
	 * methods
	 */

	const typeFormatFn = () => {
		let jsx;
		switch (type) {
			case "Image":
				jsx = "图片";
				break;
			case "Video":
				jsx = "视频";
				break;
			case "Audio":
				jsx = "音频";
				break;
		}
		return jsx;
	};

	const saveBindFn = () => {
		if (!curUrl) {
			return message.warning(
				`请上传${typeFormatFn()}或者输入${typeFormatFn()}url`
			);
		}
		setVisible(false);

		const contentState = editorState.getCurrentContent();
		const entity = contentState.createEntity(type.toUpperCase(), "IMMUTABLE", {
			src: curUrl,
			width: "100%",
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

	const customRequest = (info: UploadProps) => {
		if (typeof uploadFn === "function") {
			setIsUploading(true);
			uploadFn(info)
				.then((res) => {
					setCurUrl(res);
				})
				.catch()
				.finally(() => {
					setIsUploading(false);
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
				message.warn(`上传的${typeFormatFn()}需小于${limitMB}MB!`);
				return false;
			}
		}
	};

	/** jsx */

	const PopoverContent = () => {
		return (
			<div className={styles.popverContent}>
				<Tabs>
					<Tabs.TabPane tab={`上传${typeFormatFn()}`} key="1">
						<Tooltip title={curUrl && !isUploading ? "点击再次上传" : ""}>
							<Spin spinning={isUploading} tip="上传中...">
								<Upload
									accept={acceptArr?.join(", ")}
									name="avatar"
									listType="picture-card"
									showUploadList={false}
									beforeUpload={beforeUpload}
									customRequest={customRequest}
								>
									{curUrl ? (
										typeof renderUploadedComp === "function" &&
										renderUploadedComp(curUrl)
									) : (
										<div>
											<PlusOutlined />
											<div>{`选择${typeFormatFn()}`}</div>
										</div>
									)}
								</Upload>
							</Spin>
						</Tooltip>
					</Tabs.TabPane>
					<Tabs.TabPane tab={`网络${typeFormatFn()}`} key="2">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
							}}
						>
							<div>{`${typeFormatFn()}Url：`}</div>
							<div>
								<Input
									value={curUrl}
									onChange={(e) => setCurUrl(e.target.value.trim())}
									placeholder={`请输入${typeFormatFn()}Url`}
								/>
							</div>
						</div>
					</Tabs.TabPane>
				</Tabs>
				<div style={{ textAlign: "right", marginTop: "10px" }}>
					<Button className={styles.btn} onClick={saveBindFn} type="primary">
						{`插入${typeFormatFn()}`}
					</Button>
				</div>
			</div>
		);
	};

	return (
		<PopoverBtn
			PopoverTitle={`插入${typeFormatFn()}`}
			tip={`插入${typeFormatFn()}`}
			icon={icon}
			activeColor={false}
			PopoverContent={PopoverContent}
			visible={visible}
			onVisibleChange={(e: boolean) => {
				setVisible(e);
			}}
		/>
	);
};

export default Comp;

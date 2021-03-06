import React from "react";
import { EditorState, RichUtils, Modifier, DraftStyleMap } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import classnames from "classnames";
import { Button } from "antd";
import { getCurrentContentBlock } from "@alias/utils";

const HeadeIcon = () => <i className="iconfont icon-header"></i>;

interface IHeaderDataItem {
	text: string;
	styleStr: string;
	fontSize: number;
}

const HeaderData: IHeaderDataItem[] = [
	{ text: "H1", styleStr: "header-one", fontSize: 36 },
	{ text: "H2", styleStr: "header-two", fontSize: 24 },
	{ text: "H3", styleStr: "header-three", fontSize: 21 },
	{ text: "H4", styleStr: "header-four", fontSize: 18 },
	{ text: "H5", styleStr: "header-five", fontSize: 16 },
	{ text: "H6", styleStr: "header-six", fontSize: 14 },
];

interface IProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
	keepEditorFocusBindFn: () => void;
}

const Header: React.FC<IProps> = (props) => {
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
	}, [visible]);

	/**
	 * methods
	 */

	const renderActiveColor = () => {
		let isActive = false;
		const blockType = getCurBlockType();
		if (HeaderData.map((item) => item.styleStr).includes(blockType)) {
			isActive = true;
		}
		return isActive;
	};

	const setTitleBindFn = (item: IHeaderDataItem) => {
		setVisible(false);
		if (item.styleStr) {
			setEditorState(RichUtils.toggleBlockType(editorState, item.styleStr));
		}
	};

	const getCurBlockType = () => {
		return getCurrentContentBlock(editorState).getType();
	};

	const cancelSetTitleBindFn = () => {
		setVisible(false);
		const selection = editorState.getSelection();
		const contentState = editorState.getCurrentContent();
		const nextContentState = Modifier.setBlockType(
			contentState,
			selection,
			"unstyled"
		);

		const nextEditorState = EditorState.push(
			editorState,
			nextContentState,
			"change-block-type"
		);

		setEditorState(nextEditorState);
	};

	/** jsx */

	const PopoverContent = () => {
		return (
			<div className={styles.popverContent}>
				{HeaderData.map((item) => {
					return (
						<div
							className={
								visible && getCurBlockType() === item.styleStr
									? classnames(styles.popverContentItem, styles.active)
									: styles.popverContentItem
							}
							key={item.styleStr}
							style={{ fontSize: item.fontSize }}
							onClick={() => setTitleBindFn(item)}
						>
							{item.text}
						</div>
					);
				})}
				<Button style={{ marginTop: "10px" }} onClick={cancelSetTitleBindFn}>
					??????????????????
				</Button>
			</div>
		);
	};

	return (
		<PopoverBtn
			PopoverTitle="????????????"
			tip="??????"
			icon={<HeadeIcon />}
			activeColor={renderActiveColor()}
			PopoverContent={PopoverContent}
			visible={visible}
			onVisibleChange={(e: boolean) => {
				setVisible(e);
			}}
		/>
	);
};

export default Header;

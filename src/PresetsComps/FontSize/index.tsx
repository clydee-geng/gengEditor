import React from "react";
import { EditorState, RichUtils, Modifier, DraftStyleMap } from "draft-js";
import PopoverBtn from "../PopoverBtn";
import styles from "./index.less";
import classnames from "classnames";
import { Button, InputNumber } from "antd";
import { removeAllInlineStyle } from "@alias/utils";
import { FontSizeOutlined } from "@ant-design/icons";

const FontSizeData = [10, 13, 14, 18, 24, 32, 48];

interface IProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
	keepEditorFocusBindFn: () => void;
}

const FontSize: React.FC<IProps> = (props) => {
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
	const [curFontSize, setCurFontSize] = React.useState<number | string>();

	React.useEffect(() => {
		keepEditorFocusBindFn();
		if (visible) {
			setCurFontSize(getCurrentStyleStrArr());
		}
	}, [visible]);

	/**
	 * methods
	 */

	const renderActiveColor = () => {
		let isActive = false;
		const currentStyle = editorState.getCurrentInlineStyle();
		if (currentStyle.has("FONT_SIZE_" + getCurrentStyleStrArr())) {
			isActive = true;
		}
		return isActive;
	};

	const getCurrentStyleStrArr = (): number | string => {
		let curStyleFontSize: number | string = "";
		const currentStyle = editorState.getCurrentInlineStyle();
		const currentStyleStr = currentStyle.first();
		if (typeof currentStyleStr === "string") {
			const currentStyleStrArr = currentStyleStr.split("_");
			curStyleFontSize = Number(
				currentStyleStrArr[currentStyleStrArr.length - 1]
			);
		}
		return curStyleFontSize;
	};

	const saveBindFn = () => {
		setVisible(false);
		const SelectionState = editorState.getSelection();
		if (!SelectionState.isCollapsed()) {
			const nextContentState = Modifier.applyInlineStyle(
				removeAllInlineStyle(editorState, "FONT_SIZE_"),
				SelectionState,
				"FONT_SIZE_" + curFontSize
			);

			const nextEditorState = EditorState.push(
				editorState,
				nextContentState,
				"change-inline-style"
			);

			setCustomStyleMap((preState: DraftStyleMap) => {
				return {
					...preState,
					["FONT_SIZE_" + curFontSize]: { fontSize: curFontSize + "px" },
				};
			});
			setEditorState(nextEditorState);
		}
	};

	const cancelBindFn = () => {
		setVisible(false);
		const SelectionState = editorState.getSelection();
		if (!SelectionState.isCollapsed()) {
			const nextEditorState = EditorState.push(
				editorState,
				removeAllInlineStyle(editorState, "FONT_SIZE_"),
				"change-inline-style"
			);
			setEditorState(nextEditorState);
		}
	};

	/** jsx */

	const PopoverContent = () => {
		return (
			<div className={styles.popverContent}>
				{FontSizeData.map((item: number) => {
					return (
						<div
							className={
								visible && curFontSize === item
									? classnames(styles.popverContentItem, styles.active)
									: styles.popverContentItem
							}
							key={item}
							onClick={() => setCurFontSize(item)}
						>
							{item}px
						</div>
					);
				})}
				<div className={styles.operateArea}>
					<InputNumber
						min={10}
						max={144}
						className={styles.input}
						placeholder="?????????"
						addonAfter={"px"}
						value={curFontSize}
						onChange={(e: number | string) => setCurFontSize(e)}
					/>
					<Button className={styles.btn} onClick={saveBindFn}>
						??????
					</Button>
					<Button
						className={styles.btn}
						style={{ backgroundColor: "#E15156", marginLeft: "5px" }}
						onClick={cancelBindFn}
					>
						??????
					</Button>
				</div>
			</div>
		);
	};

	return (
		<PopoverBtn
			PopoverTitle="??????????????????"
			tip="????????????"
			icon={<FontSizeOutlined />}
			activeColor={renderActiveColor()}
			PopoverContent={PopoverContent}
			visible={visible}
			onVisibleChange={(e: boolean) => {
				setVisible(e);
			}}
		/>
	);
};

export default FontSize;

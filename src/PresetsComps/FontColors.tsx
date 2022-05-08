import React from "react";
import { FontColorsOutlined } from "@ant-design/icons";
import { EditorState, Modifier, DraftStyleMap } from "draft-js";
import ReactPickr from "@alias/components/reactPickr";
import PopoverBtn from "./PopoverBtn";
import { removeAllInlineStyle } from "@alias/utils";

interface IProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
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
	}, [visible]);

	/**
	 * methods
	 */

	const setColorBindFn = (colorStr: string) => {
		setVisible(false);
		const SelectionState = editorState.getSelection();
		if (!SelectionState.isCollapsed()) {
			const nextContentState = Modifier.applyInlineStyle(
				removeAllInlineStyle(editorState, "FONT_COLOR_"),
				SelectionState,
				"FONT_COLOR_" + colorStr
			);

			const nextEditorState = EditorState.push(
				editorState,
				nextContentState,
				"change-inline-style"
			);

			setCustomStyleMap((preState: DraftStyleMap) => {
				return {
					...preState,
					["FONT_COLOR_" + colorStr]: { color: colorStr },
				};
			});
			setEditorState(nextEditorState);
		}
	};

	const cancelColorBindFn = () => {
		const SelectionState = editorState.getSelection();
		if (!SelectionState.isCollapsed()) {
			const nextEditorState = EditorState.push(
				editorState,
				removeAllInlineStyle(editorState, "FONT_COLOR_"),
				"change-inline-style"
			);
			setEditorState(nextEditorState);
		}
		setVisible(false);
	};

	const renderActiveColor = () => {
		let activeColor = "#000000";
		const currentStyle = editorState.getCurrentInlineStyle();
		const itemData = currentStyle.filter((item, index) => {
			return item?.includes("FONT_COLOR_") || false;
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
				<ReactPickr
					savePropsFn={setColorBindFn}
					defaultColor={renderActiveColor()}
					cancelPropsFn={cancelColorBindFn}
				/>
			</div>
		);
	};

	return (
		<PopoverBtn
			PopoverTitle="设置文本颜色"
			tip="文本颜色"
			icon={<FontColorsOutlined />}
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

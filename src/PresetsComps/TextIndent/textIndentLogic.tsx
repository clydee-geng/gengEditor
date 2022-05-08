import React from "react";
import {
	EditorState,
	Modifier,
	DraftStyleMap,
	DraftBlockRenderMap,
} from "draft-js";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { getCurrentContentBlock } from "@alias/utils";
import ButtonLayout from "@alias/components/ButtonLayout";
import { Map } from "immutable";

const maxIndent = 6;

interface IProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
	setCustomBlockRenderMap: React.Dispatch<
		React.SetStateAction<DraftBlockRenderMap>
	>;
	keepEditorFocusBindFn: () => void;
	type: "add" | "minus";
}

const TextIndentLogic: React.FC<IProps> = (props) => {
	const { editorState, setEditorState, type } = props;

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
			// textIndentVal = 0 时，不高亮
			isActive = true;
		}
		return isActive;
	};

	const getCurrentContentBlockData = (name?: string) => {
		const blockData = getCurrentContentBlock(editorState).getData();
		return name ? blockData.get(name) : blockData;
	};

	const clickBindFn = () => {
		let nextBlockData = Map();
		const curTextIndentVal = getCurrentContentBlockData("textIndent") || 0;

		let nextTextIndentVal = curTextIndentVal;
		if (type === "add") {
			nextTextIndentVal =
				curTextIndentVal + 1 > maxIndent ? maxIndent : curTextIndentVal + 1;
		} else {
			nextTextIndentVal = curTextIndentVal - 1 < 0 ? 0 : curTextIndentVal - 1;
		}

		nextBlockData = nextBlockData.set("textIndent", nextTextIndentVal);

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
			tip={type === "add" ? "增加缩进" : "减少缩进"}
			icon={type === "add" ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			activeColor={type === "add" && renderActiveColor()}
			clickPropsFn={clickBindFn}
		/>
	);
};

export default TextIndentLogic;

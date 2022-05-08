import UndoAndRedoBtn from "./UndoAndRedoBtn";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import { ICommonCompsProps } from "@alias/types/interfaces";
const Undo = (props: ICommonCompsProps) => (
	<UndoAndRedoBtn
		{...props}
		type="undo"
		icon={<ArrowLeftOutlined />}
		tip="撤销"
		disabled={props.editorState.getUndoStack().size <= 0}
	/>
);
const Redo = (props: ICommonCompsProps) => (
	<UndoAndRedoBtn
		{...props}
		type="redo"
		icon={<ArrowRightOutlined />}
		tip="重做"
		disabled={props.editorState.getRedoStack().size <= 0}
	/>
);
export { Undo, Redo };

import React from "react";
import styles from "./index.less";
import {
	ContentBlock,
	ContentState,
	EditorState,
	SelectionState,
} from "draft-js";
import classnames from "classnames";

interface IProps {
	block: ContentBlock;
	contentState: ContentState;
	blockProps: {
		editorState: EditorState;
		setEditorState: any;
		disabled: boolean;
	};
}

const Content: React.FC<IProps> = (props) => {
	const { block, contentState, blockProps } = props;
	const { editorState, setEditorState, disabled } = blockProps;
	const entitykey = block.getEntityAt(0);
	const data = contentState.getEntity(entitykey).getData();

	/**
	 * hooks
	 */

	/**
	 * life
	 */
	/**
	 * methods
	 */

	const clickBindFn = (e: any) => {
		const nextEditorState = EditorState.forceSelection(
			editorState,
			SelectionState.createEmpty(block.getKey())
		);
		setEditorState(nextEditorState);
	};

	/**
	 * jsx
	 */

	return (
		<div
			className={
				disabled
					? classnames(styles.content, styles.contentDisabled)
					: styles.content
			}
			onClick={clickBindFn}
		>
			<audio
				src={data?.src}
				style={{ width: data?.width }}
				controls
				draggable="false"
			/>
		</div>
	);
};

export default Content;

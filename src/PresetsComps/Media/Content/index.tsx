import React from "react";
import { EditorState, ContentBlock, ContentState } from "draft-js";
import ImageContent from "./Image";
import VideoContent from "./Video";
import AudioContent from "./Audio";
import styles from "./index.less";
import classnames from "classnames";

interface IProps {
	block: ContentBlock;
	contentState: ContentState;
	blockProps: {
		editorContentDom: HTMLElement;
		editorState: EditorState;
		setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
		curSelectBlock?: ContentBlock;
		disabled: boolean;
	};
}
const Media: React.FC<IProps> = (props) => {
	const { block, contentState, blockProps } = props;
	const { disabled } = blockProps;
	const entitykey = block.getEntityAt(0);
	const type = entitykey && contentState.getEntity(entitykey).getType();

	return (
		<div
			className={
				disabled ? classnames(styles.Media, styles.MediaDisable) : styles.Media
			}
		>
			{type === "IMAGE" && <ImageContent {...props} />}
			{type === "VIDEO" && <VideoContent {...props} />}
			{type === "AUDIO" && <AudioContent {...props} />}
		</div>
	);
};

export default Media;

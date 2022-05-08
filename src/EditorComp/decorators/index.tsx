import { Tooltip } from "antd";
import {
	CompositeDecorator,
	ContentBlock,
	ContentState,
	CharacterMetadata,
} from "draft-js";
import styles from "./index.less";
import React from "react";

interface IProps {
	url: string;
	contentState: ContentState;
	entityKey: string;
	children: React.ReactChildren;
}

const LinkDecorator = {
	strategy: (
		contentBlock: ContentBlock,
		callback: (start: number, end: number) => void,
		contentState: ContentState
	) => {
		contentBlock.findEntityRanges((character: CharacterMetadata) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === "LINK"
			);
		}, callback);
	},
	component: (props: IProps) => {
		const { url } = props.contentState.getEntity(props.entityKey).getData();
		return (
			<Tooltip title={`链接url：${url}`}>
				<a href={url} className={styles.link}>
					{props.children}
				</a>
			</Tooltip>
		);
	},
};

const decorators = new CompositeDecorator([LinkDecorator]);

export { decorators };

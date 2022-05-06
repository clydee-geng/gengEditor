import React from "react";
import { blockTypeMapTag } from "./methods";
import { IhtmlToBlockData } from "@alias/types/interfaces";
import { TtextAlign } from "@alias/types/type";

const htmlToBlock = (nodeName: string, node: HTMLElement) => {
	// console.log("xxx:", nodeName, node.style);
	const data: IhtmlToBlockData = {};
	if (node.style.textIndent) {
		data.textIndent = Math.max(parseInt(node.style.textIndent) / 2, 0);
	}

	if (node.style.textAlign) {
		data.textAlign = node.style.textAlign as TtextAlign;
	}

	if (Object.keys(blockTypeMapTag.reverseObj).includes(nodeName)) {
		return {
			type: blockTypeMapTag.getReverse(nodeName) as string,
			data,
		};
	} else if (node.style.lineHeight) {
		return {
			type: `line-height-${parseFloat(node.style.lineHeight) * 100}`,
			data,
		};
	}
};

export default htmlToBlock;

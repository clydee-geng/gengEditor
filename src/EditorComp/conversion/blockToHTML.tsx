import React from "react";
import { blockTypeMapTag, styleObjToStr } from "./methods";

const blockToHTML = (block: any) => {
	const blockType = block.type;
	const { textIndent, textAlign } = block.data;
	const blockStyle = styleObjToStr({ textIndent, textAlign });
	const inlineStyleStr = blockStyle ? ` style="${blockStyle}"` : "";

	if (blockType === "unordered-list-item") {
		return {
			start: `<li${inlineStyleStr}>`,
			end: "</li>",
			nest: <ul />,
		};
	} else if (blockType === "ordered-list-item") {
		return {
			start: `<li${inlineStyleStr}>`,
			end: "</li>",
			nest: <ol />,
		};
	} else if (blockType.includes("line-height-")) {
		const lineHeight = blockType.replace("line-height-", "");
		return {
			start: `<span style="line-height: ${lineHeight / 100}";>`,
			end: `</span>`,
		};
	}
	return {
		start: `<${blockTypeMapTag.getForward(blockType)}${inlineStyleStr}>`,
		end: `</${blockTypeMapTag.getForward(blockType)}>`,
	};
};

export default blockToHTML;

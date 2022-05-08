import React from "react";
import { blockTypeMapTag, styleObjToStr } from "./methods";
import { RawDraftContentBlockWithCustomType } from "draft-convert";
import { DraftBlockType } from "draft-js";

interface IBlockData {
	textIndent: number;
	textAlign: string;
}

const blockToHTML = (
	block: RawDraftContentBlockWithCustomType<DraftBlockType>
) => {
	const blockType = block.type;
	const { textIndent, textAlign } = block.data as IBlockData;
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
		const lineHeight: string = blockType.replace("line-height-", "");
		return {
			start: `<span style="line-height: ${Number(lineHeight) / 100}";>`,
			end: `</span>`,
		};
	}
	return {
		start: `<${blockTypeMapTag.getForward(blockType)}${inlineStyleStr}>`,
		end: `</${blockTypeMapTag.getForward(blockType)}>`,
	};
};

export default blockToHTML;

import { getHEXAColor, BidirectionalMap } from "@alias/utils";
import { DEFAULT_BLOCK_TYPE } from "./constant";

const blockTypeMapTag = new BidirectionalMap(DEFAULT_BLOCK_TYPE);

const styleObjToStr = (obj: any) => {
	const { textIndent, textAlign, width, height } = obj;
	let styleStr = "";
	if (textIndent) {
		styleStr = `text-indent:${textIndent * 2}em;`;
	}
	if (textAlign) {
		styleStr += `text-align:${textAlign};`;
	}
	if (width) {
		styleStr += `width:${width};`;
	}
	if (height) {
		styleStr += `height:${height};`;
	}
	return styleStr;
};

export { blockTypeMapTag, styleObjToStr };

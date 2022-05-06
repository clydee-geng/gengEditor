import { getHEXAColor, BidirectionalMap } from "@alias/utils";
import { IhtmlToBlockData, IhtmlToEntityData } from "@alias/types/interfaces";
import { TtextAlign } from "@alias/types/type";
import { DraftBlockRenderMap } from "draft-js";
import React from "react";

const blockTypeMapTag = new BidirectionalMap({
	"header-one": "h1",
	"header-two": "h2",
	"header-three": "h3",
	"header-four": "h4",
	"header-five": "h5",
	"header-six": "h6",
	unstyled: "p",
	blockquote: "blockquote",
	"code-block": "pre",
	atomic: "figure",
});

const styleToHTML = (style: string) => {
	// console.log(style);
	if (style === "STRIKETHROUGH") {
		return <span style={{ textDecoration: "line-through" }} />;
	} else if (style.includes("FONT_COLOR_")) {
		return <span style={{ color: getStyleValDistillFn(style) }} />;
	} else if (style.includes("BG_COLOR_")) {
		return <span style={{ backgroundColor: getStyleValDistillFn(style) }} />;
	} else if (style.includes("FONT_SIZE_")) {
		return (
			<span
				style={{
					fontSize: getStyleValDistillFn(style) + "px",
				}}
			/>
		);
	}
};

const getStyleValDistillFn = (styleStr: string) => {
	const arr = styleStr.split("_");
	return arr[arr.length - 1];
};

const blockToHTML = (block: any, extraData?: any) => {
	const blockType = block.type;
	const { textIndent, textAlign } = block.data;
	// console.log("block-type:::", blockType, block.data);

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

const entityToHTML = (entity: any) => {
	const { type, data } = entity;
	const { src, width, height } = data;
	const nextBlockStyle = styleObjToStr({ width, height });
	const inlineStyleStr = nextBlockStyle ? ` style="${nextBlockStyle}"` : "";
	if (type === "IMAGE") {
		return `<img src="${src}"${inlineStyleStr} />`;
	} else if (type === "VIDEO") {
		return `<video src="${src}"${inlineStyleStr} controls />`;
	} else if (type === "AUDIO") {
		return `<audio src="${src}"${inlineStyleStr} controls />`;
	} else if (type === "LINK") {
		return `<a href="${data.url}">${data.text}</a>`;
	}
	return "";
};

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

const htmlToStyle = (
	nodeName: string,
	node: HTMLElement,
	currentStyle: Set<string>,
	extraData?: any
) => {
	let nextCurrentStyle = currentStyle;
	if (nodeName === "span" && node.style.color) {
		nextCurrentStyle = getNextCurrentStyleDistillFn(
			node,
			nextCurrentStyle,
			extraData,
			"FONT_COLOR_",
			"color",
			getHEXAColor(node.style.color)
		);
	}
	if (nodeName === "span" && node.style.backgroundColor) {
		nextCurrentStyle = getNextCurrentStyleDistillFn(
			node,
			nextCurrentStyle,
			extraData,
			"BG_COLOR_",
			"backgroundColor",
			getHEXAColor(node.style.backgroundColor)
		);
	}
	if (nodeName === "span" && node.style.fontSize) {
		nextCurrentStyle = getNextCurrentStyleDistillFn(
			node,
			nextCurrentStyle,
			extraData,
			"FONT_SIZE_",
			"fontSize",
			parseFloat(node.style.fontSize).toString(),
			"px"
		);
	}
	// console.log(nodeName, node, node.style, nextCurrentStyle.toJS());
	return nextCurrentStyle;
};

const getNextCurrentStyleDistillFn = (
	node: HTMLElement,
	currentStyle: Set<string>,
	extraData: any,
	styleStrPrefix: string,
	key: string,
	val: string,
	unit?: string
): Set<string> => {
	const nextCurrentStyle = currentStyle;
	const styleStr = `${styleStrPrefix}${val}`;
	if (
		typeof extraData.setCustomStyleMap === "function" &&
		!Object.prototype.hasOwnProperty.call(extraData.customStyleMap, styleStr)
	) {
		extraData.setCustomStyleMap((preState: any) => {
			return {
				...preState,
				[styleStr]: { [key]: val + (unit || "") },
			};
		});
	}

	return nextCurrentStyle.add(styleStr);
};

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

const htmlToEntity = (
	nodeName: string,
	node: HTMLElement,
	createEntity: any
) => {
	// console.log("node::::", nodeName, node.style);
	const data: IhtmlToEntityData = {};
	if (node.style?.width) {
		data.width = node.style.width;
	}

	if (node.style?.height) {
		data.height = node.style.height;
	}

	if (node.attributes?.getNamedItem("src")) {
		data.src = node.attributes.getNamedItem("src")?.value;
	}
	if (nodeName === "img") {
		return createEntity("IMAGE", "IMMUTABLE", data);
	} else if (nodeName === "video") {
		return createEntity("VIDEO", "IMMUTABLE", data);
	} else if (nodeName === "audio") {
		return createEntity("AUDIO", "IMMUTABLE", data);
	} else if (nodeName === "a") {
		return createEntity("LINK", "MUTABLE", {
			url: node.attributes.getNamedItem("href")?.value,
			text: node.innerText,
		});
	}
};

export {
	blockToHTML,
	styleToHTML,
	entityToHTML,
	htmlToStyle,
	htmlToBlock,
	htmlToEntity,
};

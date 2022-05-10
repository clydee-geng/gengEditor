import React from "react";
import { getHEXAColor } from "./methods";
import { DraftStyleMap } from "draft-js";

interface IExtraData {
	customStyleMap: DraftStyleMap;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
}

const htmlToStyle = (
	nodeName: string,
	node: HTMLElement,
	currentStyle: Set<string>,
	extraData: IExtraData
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
	return nextCurrentStyle;
};

const getNextCurrentStyleDistillFn = (
	node: HTMLElement,
	currentStyle: Set<string>,
	extraData: IExtraData,
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
		extraData.setCustomStyleMap((preState: DraftStyleMap) => {
			return {
				...preState,
				[styleStr]: { [key]: val + (unit || "") },
			};
		});
	}

	return nextCurrentStyle.add(styleStr);
};

export default htmlToStyle;

import { EditorState, ContentBlock, Modifier } from "draft-js";
const getCurrentContentBlock = (editorState: EditorState): ContentBlock => {
	const selection = editorState.getSelection();
	const contentBlock = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey());
	return contentBlock;
};

const removeAllInlineStyle = (editorState: EditorState, styleStr: string) => {
	const currentStyle = editorState.getCurrentInlineStyle();
	let ContentState = editorState.getCurrentContent();

	currentStyle.forEach((item) => {
		if (item?.includes(styleStr)) {
			ContentState = Modifier.removeInlineStyle(
				ContentState,
				editorState.getSelection(),
				item
			);
		}
	});

	return ContentState;
};

const checkFileType = (file: File, fileTypeList: string[]) => {
	// 获取后缀
	// const d = /\.[^\.]+$/.exec(file.name);
	// 校验/**/
	let info = "";
	// eslint-disable-next-line prefer-destructuring
	const name = file.name;
	const suffixA = name.lastIndexOf(".");
	const suffixB = name.length;
	const Osuffix = name.substring(suffixA, suffixB);
	const Msuffix = Osuffix.toLowerCase();

	if (!fileTypeList.includes(Msuffix)) {
		info = `不支持上传${Msuffix}格式的文件`;
		return info;
	}

	return info;
};

class BidirectionalMap {
	forwardObj = {};
	reverseObj = {};

	constructor(map: { [key: string]: string }) {
		this.forwardObj = { ...map };
		this.reverseObj = Object.keys(map).reduce(
			(totalRes: object, itemKey: string) => {
				return {
					...totalRes,
					[map[itemKey]]: itemKey,
				};
			},
			{}
		);
	}

	getForward(key: string): string | undefined {
		return this.forwardObj[key];
	}
	getReverse(key: string): string | undefined {
		return this.reverseObj[key];
	}
}

export {
	getCurrentContentBlock,
	removeAllInlineStyle,
	checkFileType,
	BidirectionalMap,
};

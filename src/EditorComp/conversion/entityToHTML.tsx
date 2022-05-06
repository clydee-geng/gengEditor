import React from "react";
import { styleObjToStr } from "./methods";

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

export default entityToHTML;

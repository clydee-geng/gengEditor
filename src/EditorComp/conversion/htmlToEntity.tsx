import React from "react";
import { IhtmlToEntityData } from "@alias/types/interfaces";
import { EntityKey } from "draft-convert";
import { DraftEntityMutability, RawDraftEntity } from "draft-js";

const htmlToEntity = (
	nodeName: string,
	node: HTMLElement,
	createEntity: (
		type: RawDraftEntity["type"],
		mutability: DraftEntityMutability,
		data: RawDraftEntity["data"]
	) => EntityKey
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

export default htmlToEntity;

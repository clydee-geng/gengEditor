import TextIndentLogic from "./textIndentLogic";
import React from "react";
import { ICommonCompsProps } from "@alias/types/interfaces";
const AddIndent = (props: ICommonCompsProps) => (
	<TextIndentLogic {...props} type="add" />
);
const MinusIndent = (props: ICommonCompsProps) => (
	<TextIndentLogic {...props} type="minus" />
);
export { AddIndent, MinusIndent };

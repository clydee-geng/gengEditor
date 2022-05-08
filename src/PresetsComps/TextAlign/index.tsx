import TextAlignLogic from "./TextAlignLogic";
import React from "react";
import { ICommonCompsProps } from "@alias/types/interfaces";

const LeftAlign = (props: ICommonCompsProps) => (
	<TextAlignLogic {...props} type="left" />
);
const CenterAlign = (props: ICommonCompsProps) => (
	<TextAlignLogic {...props} type="center" />
);
const RightAlign = (props: ICommonCompsProps) => (
	<TextAlignLogic {...props} type="right" />
);
const JustifyAlign = (props: ICommonCompsProps) => (
	<TextAlignLogic {...props} type="justify" />
);
export { LeftAlign, CenterAlign, RightAlign, JustifyAlign };

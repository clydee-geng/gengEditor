import TextAlignLogic from "./TextAlignLogic";
import React from "react";

const LeftAlign = (props: any) => <TextAlignLogic {...props} type="left" />;
const CenterAlign = (props: any) => <TextAlignLogic {...props} type="center" />;
const RightAlign = (props: any) => <TextAlignLogic {...props} type="right" />;
const JustifyAlign = (props: any) => (
	<TextAlignLogic {...props} type="justify" />
);
export { LeftAlign, CenterAlign, RightAlign, JustifyAlign };

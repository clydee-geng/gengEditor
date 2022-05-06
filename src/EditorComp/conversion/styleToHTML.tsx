import React from "react";

const getStyleValDistillFn = (styleStr: string) => {
	const arr = styleStr.split("_");
	return arr[arr.length - 1];
};

const styleToHTML = (style: string) => {
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

export default styleToHTML;

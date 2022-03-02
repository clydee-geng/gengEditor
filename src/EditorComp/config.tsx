import { rgbOrRgbaToHex } from "@alias/utils";

export const styleToHTML = (style: string) => {
  console.log(style);
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

export const blockToHTML = (block: any) => {
  const blockType = block.type;
  const { textIndent, textAlign } = block.data;

  let blockStyle = "";
  if (textIndent) {
    blockStyle = ` style="text-indent:${textIndent * 2}em"`;
  } else if (textAlign) {
    blockStyle = ` style="text-align:${textAlign}"`;
  }

  if (blockType === "unordered-list-item") {
    return {
      start: `<li${blockStyle}>`,
      end: "</li$>",
      nest: <ul />,
    };
  } else if (blockType === "ordered-list-item") {
    return {
      start: `<li${blockStyle}>`,
      end: "</li$>",
      nest: <ol />,
    };
  }
  return {
    start: `<${defaultBlockType[blockType]}${blockStyle}>`,
    end: `</${defaultBlockType[blockType]}>`,
  };
};

const defaultBlockType = {
  "header-one": "h1",
  "header-two": "h2",
  "header-three": "h3",
  "header-four": "h4",
  "header-five": "h5",
  "header-six": "h6",
  unstyled: "p",
  blockquote: "blockquote",
};

export const htmlToStyle = (
  nodeName: string,
  node: HTMLElement,
  currentStyle: any,
) => {
  let nextCurrentStyle = currentStyle;
  if (nodeName === "span" && node.style.color) {
    const colorStr = rgbOrRgbaToHex(node.style.color);
    const styleStr = `FONT_COLOR_${colorStr}`;
    nextCurrentStyle = nextCurrentStyle.add(styleStr);
  }
  if (nodeName === "span" && node.style.backgroundColor) {
    nextCurrentStyle = nextCurrentStyle.add(
      `BG_COLOR_${rgbOrRgbaToHex(node.style.backgroundColor)}`
    );
  }
  console.log(nodeName, node, nextCurrentStyle.toJS());
  return nextCurrentStyle;
};

import { getHEXAColor } from "@alias/utils";
import { IhtmlToBlockData } from "@alias/types/interfaces";
import { TtextAlign } from "@alias/types/type";

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

const blockToHTML = (block: any) => {
  const blockType = block.type;
  const { textIndent, textAlign } = block.data;
  // console.log(blockType);

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
  "code-block": "pre",
};

const htmlToStyle = (
  nodeName: string,
  node: HTMLElement,
  currentStyle: any,
  extraData?: any
) => {
  let nextCurrentStyle = currentStyle;
  if (nodeName === "span" && node.style.color) {
    const colorStr = getHEXAColor(node.style.color);
    const styleStr = `FONT_COLOR_${colorStr}`;
    if (
      typeof extraData.setCustomStyleMap === "function" &&
      !extraData.customStyleMap.hasOwnProperty(styleStr)
    ) {
      extraData.setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          [styleStr]: { color: colorStr },
        };
      });
    }
    nextCurrentStyle = nextCurrentStyle.add(styleStr);
  }
  if (nodeName === "span" && node.style.backgroundColor) {
    const bgColorStr = getHEXAColor(node.style.backgroundColor);
    const styleStr = `BG_COLOR_${bgColorStr}`;
    if (
      typeof extraData.setCustomStyleMap === "function" &&
      !extraData.customStyleMap.hasOwnProperty(styleStr)
    ) {
      extraData.setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          [styleStr]: { backgroundColor: bgColorStr },
        };
      });
    }

    nextCurrentStyle = nextCurrentStyle.add(styleStr);
  }
  // console.log(nodeName, node, node.style, nextCurrentStyle.toJS());
  return nextCurrentStyle;
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

  if (nodeName === "blockquote") {
    return {
      type: "blockquote",
      data,
    };
  } else if (nodeName === "pre") {
    return {
      type: "code-block",
      data,
    };
  }
};

export { blockToHTML, styleToHTML, htmlToStyle, htmlToBlock };

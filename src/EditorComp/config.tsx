import { getHEXAColor } from "@alias/utils";
import { IhtmlToBlockData, IhtmlToEntityData } from "@alias/types/interfaces";
import { TtextAlign } from "@alias/types/type";
import { EditorState } from "draft-js";

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
  atomic: "figure",
};

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

  let blockStyle = styleObjToStr({ textIndent, textAlign });
  let inlineStyleStr = blockStyle ? ` style="${blockStyle}"` : "";

  if (blockType === "unordered-list-item") {
    return {
      start: `<li${inlineStyleStr}>`,
      end: "</li>",
      nest: <ul />,
    };
  } else if (blockType === "ordered-list-item") {
    return {
      start: `<li${inlineStyleStr}>`,
      end: "</li>",
      nest: <ol />,
    };
  }
  return {
    start: `<${defaultBlockType[blockType]}${inlineStyleStr}>`,
    end: `</${defaultBlockType[blockType]}>`,
  };
};

const entityToHTML = (entity: any) => {
  const { type, data } = entity;
  const { src, width, height } = data;
  const nextBlockStyle = styleObjToStr({ width, height });
  let inlineStyleStr = nextBlockStyle ? ` style="${nextBlockStyle}"` : "";
  if (type === "IMAGE") {
    return `<img src="${src}"${inlineStyleStr} />`;
  }
  return "";
};

const styleObjToStr = (obj: any) => {
  const { textIndent, textAlign, width, height } = obj;
  let styleStr = "";
  if (textIndent) {
    styleStr = `text-indent:${textIndent * 2}em;`;
  }
  if (textAlign) {
    styleStr += `text-align:${textAlign};`;
  }
  if (width) {
    styleStr += `width:${width}px;`;
  }
  if (height) {
    styleStr += `height:${height}px;`;
  }
  return styleStr;
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
  if (nodeName === "span" && node.style.fontSize) {
    const fontSize = parseFloat(node.style.fontSize);
    const styleStr = `FONT_SIZE_${fontSize}`;
    if (
      typeof extraData.setCustomStyleMap === "function" &&
      !extraData.customStyleMap.hasOwnProperty(styleStr)
    ) {
      extraData.setCustomStyleMap((preState: any) => {
        return {
          ...preState,
          [styleStr]: { fontSize: fontSize + "px" },
        };
      });
    }

    nextCurrentStyle = nextCurrentStyle.add(styleStr);
  }
  // console.log(nodeName, node, node.style, nextCurrentStyle.toJS());
  return nextCurrentStyle;
};

const htmlToBlock = (nodeName: string, node: HTMLElement) => {
  // console.log(
  //   "xxx:",
  //   nodeName,
  // );
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
  } else if (nodeName === "figure") {
    return {
      type: "atomic",
      data,
    };
  }
};

const htmlToEntity = (
  nodeName: string,
  node: HTMLElement,
  createEntity: any
) => {
  // console.log("node::::", node.style);
  let data: IhtmlToEntityData = {};
  if (node.style?.width) {
    data.width = parseFloat(node.style.width);
  }

  if (node.style?.height) {
    data.height = parseFloat(node.style.height);
  }

  if (node.attributes?.getNamedItem("src")) {
    data.src = node.attributes.getNamedItem("src")?.value;
  }
  if (nodeName === "img") {
    return createEntity("IMAGE", "IMMUTABLE", data);
  }
};

export {
  blockToHTML,
  styleToHTML,
  entityToHTML,
  htmlToStyle,
  htmlToBlock,
  htmlToEntity,
};

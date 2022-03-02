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
  console.log(block, blockType);

  return {
    start: `<${defaultBlockType[blockType]}>`,
    end: `</${defaultBlockType[blockType]}>`,
  };
};

export const defaultBlockType = {
  "header-one": "h1",
  "header-two": "h2",
  "header-three": "h3",
  "header-four": "h4",
  "header-five": "h5",
  "header-six": "h6",
  unstyled: "p",
  blockquote: "blockquote",
};

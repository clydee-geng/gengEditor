import { EditorState, ContentBlock } from "draft-js";
export const getCurrentContentBlock = (
  editorState: EditorState
): ContentBlock => {
  const selection = editorState.getSelection();
  const contentBlock = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  return contentBlock;
};

export const rgbOrRgbaToHex = (
  red: any,
  green?: any,
  blue?: any,
  alpha?: any
) => {
  const isPercent = (red + (alpha || "")).toString().includes("%");

  if (typeof red === "string") {
    [red, green, blue, alpha] = (red.match(/(0?\.?\d{1,3})%?\b/g) || []).map(
      (component) => Number(component)
    );
  } else if (alpha !== undefined) {
    alpha = Number.parseFloat(alpha);
  }

  if (
    typeof red !== "number" ||
    typeof green !== "number" ||
    typeof blue !== "number" ||
    red > 255 ||
    green > 255 ||
    blue > 255
  ) {
    throw new TypeError("Expected three numbers below 256");
  }

  if (typeof alpha === "number") {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha);
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round((255 * alpha) / 100);
    } else {
      throw new TypeError(
        `Expected alpha value (${alpha}) as a fraction or percentage`
      );
    }

    alpha = (alpha | (1 << 8)).toString(16).slice(1);
  } else {
    alpha = "";
  }
  const result: string =
    (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) +
    alpha;
  return "#" + result.toUpperCase();
};

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

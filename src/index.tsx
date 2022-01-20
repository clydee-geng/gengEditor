import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div>
      <button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
        }
      >
        Bold
      </button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

ReactDOM.render(<MyEditor />, document.getElementById("container"));

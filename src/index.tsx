import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button } from "antd";
import "antd/dist/antd.css";

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div>
      <Button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
        }
      >
        Bold
      </Button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

ReactDOM.render(<MyEditor />, document.getElementById("container"));

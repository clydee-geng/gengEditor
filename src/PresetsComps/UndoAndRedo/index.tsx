import UndoAndRedoBtn from "./UndoAndRedoBtn";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const Undo = (props: any) => (
  <UndoAndRedoBtn
    {...props}
    type="undo"
    icon={<ArrowLeftOutlined />}
    tip="撤销"
    disabled={props.editorState.getUndoStack().size <= 0}
  />
);
const Redo = (props: any) => (
  <UndoAndRedoBtn
    {...props}
    type="redo"
    icon={<ArrowRightOutlined />}
    tip="重做"
    disabled={props.editorState.getRedoStack().size <= 0}
  />
);
export { Undo, Redo };

import TextIndentLogic from "./textIndentLogic";
const AddIndent = (props: any) => <TextIndentLogic {...props} type="add" />;
const MinusIndent = (props: any) => <TextIndentLogic {...props} type="minus" />;
export { AddIndent, MinusIndent };

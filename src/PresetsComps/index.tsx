import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import InlineStyleCtrl from "./InlineStyleCtrl";

const Bold = (props: any) => (
  <InlineStyleCtrl
    {...props}
    icon={<BoldOutlined />}
    tip="加粗"
    inlineStyleStr="BOLD"
  />
);

const Italic = (props: any) => (
  <InlineStyleCtrl
    {...props}
    icon={<ItalicOutlined />}
    tip="斜体"
    inlineStyleStr="ITALIC"
  />
);

const Underline = (props: any) => (
  <InlineStyleCtrl
    {...props}
    icon={<UnderlineOutlined />}
    tip="下划线"
    inlineStyleStr="UNDERLINE"
  />
);

export default {
  Bold,
  Italic,
  Underline,
};

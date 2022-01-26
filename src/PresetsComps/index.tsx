import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import ToogleBtn from "./ToogleBtn";
import FontColors from "./FontColors";
import BackGroundColors from "./BackGroundColors";
import Link from "./Link";

const Bold = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<BoldOutlined />}
    tip="加粗"
    inlineStyleStr="BOLD"
  />
);

const Italic = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<ItalicOutlined />}
    tip="斜体"
    inlineStyleStr="ITALIC"
  />
);

const Underline = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<UnderlineOutlined />}
    tip="下划线"
    inlineStyleStr="UNDERLINE"
  />
);

const Strikethrough = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<StrikethroughOutlined />}
    tip="删除线"
    inlineStyleStr="STRIKETHROUGH"
  />
);

export default {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  FontColors,
  BackGroundColors,
  Link,
};

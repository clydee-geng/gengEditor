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
    styleStr="BOLD"
    type="inline"
  />
);

const Italic = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<ItalicOutlined />}
    tip="斜体"
    styleStr="ITALIC"
    type="inline"
  />
);

const Underline = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<UnderlineOutlined />}
    tip="下划线"
    styleStr="UNDERLINE"
    type="inline"
  />
);

const Strikethrough = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<StrikethroughOutlined />}
    tip="删除线"
    styleStr="STRIKETHROUGH"
    type="inline"
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

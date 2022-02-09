import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
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

const UL = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<UnorderedListOutlined />}
    tip="无序列表"
    styleStr="unordered-list-item"
    type="block"
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
  UL,
};

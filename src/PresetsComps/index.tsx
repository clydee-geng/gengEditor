import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import ToogleBtn from "./ToogleBtn";
import FontColors from "./FontColors";
import BackGroundColors from "./BackGroundColors";
import Link from "./Link";
import Header from "./Header";
import LineHeight from "./LineHeight";
import { AddIndent, MinusIndent } from "./TextIndent";
import { LeftAlign, CenterAlign, RightAlign, JustifyAlign } from "./TextAlign";
import FontSize from "./FontSize";
import Image from "./Image";
import Video from "./Video";

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

const OL = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<OrderedListOutlined />}
    tip="有序列表"
    styleStr="ordered-list-item"
    type="block"
  />
);

const Blockquote = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<i className="iconfont icon-blockquote"></i>}
    tip="引用"
    styleStr="blockquote"
    type="block"
  />
);

const Code = (props: any) => (
  <ToogleBtn
    {...props}
    icon={<CodeOutlined />}
    tip="代码"
    styleStr="code-block"
    type="block"
  />
);

export default {
  FontSize,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  FontColors,
  BackGroundColors,
  Link,
  UL,
  OL,
  Header,
  Blockquote,
  Code,
  LineHeight,
  AddIndent,
  MinusIndent,
  LeftAlign,
  CenterAlign,
  RightAlign,
  JustifyAlign,
  Image,
  Video,
};

import { TtextAlign } from "./type";
interface IhtmlToBlockData {
  textIndent?: number;
  textAlign?: TtextAlign;
}

interface IhtmlToEntityData {
  width?: number;
  height?: number;
  src?: string;
}

export { IhtmlToBlockData, IhtmlToEntityData };

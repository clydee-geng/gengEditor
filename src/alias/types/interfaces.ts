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

interface IMediaUploadItemConfig {
  uploadFn: (info: any) => Promise<() => string>;
  acceptArr: string[];
  limitMB: number;
}
interface IMediaUploadConfig {
  Image?: IMediaUploadItemConfig;
  Video?: IMediaUploadItemConfig;
  Audio?: IMediaUploadItemConfig;
}

export {
  IhtmlToBlockData,
  IhtmlToEntityData,
  IMediaUploadConfig,
  IMediaUploadItemConfig,
};

import GengEditor from "./dist/gengEditor";
import { UploadProps } from "antd";

export interface IMediaUploadItemConfig {
	uploadFn: (info: UploadProps) => Promise<() => string>;
	acceptArr: string[];
	limitMB: number;
}

export interface IMediaUploadConfig {
	Image?: IMediaUploadItemConfig;
	Video?: IMediaUploadItemConfig;
	Audio?: IMediaUploadItemConfig;
}
export interface IProps {
	style?: React.CSSProperties;
	disabled?: boolean;
	mediaUploadConfig?: IMediaUploadConfig;
	value?: string;
	onChange?: (val: string) => void;
	placeholder?: string;
}

export default GengEditor;

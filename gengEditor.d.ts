import React from "react";
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

declare const GengEditor: React.FC<IProps>;
export default GengEditor;

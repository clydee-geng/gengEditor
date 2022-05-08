import { TtextAlign } from "./type";
import { UploadProps } from "antd";
import { EditorState, DraftStyleMap, DraftBlockRenderMap } from "draft-js";
interface IhtmlToBlockData {
	textIndent?: number;
	textAlign?: TtextAlign;
}

interface IhtmlToEntityData {
	width?: string;
	height?: string;
	src?: string;
}

interface IMediaUploadItemConfig {
	uploadFn: (info: UploadProps) => Promise<() => string>;
	acceptArr: string[];
	limitMB: number;
}
interface IMediaUploadConfig {
	Image?: IMediaUploadItemConfig;
	Video?: IMediaUploadItemConfig;
	Audio?: IMediaUploadItemConfig;
}

interface ICommonCompsProps {
	editorState: EditorState;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
	customStyleMap: DraftStyleMap;
	setCustomStyleMap: React.Dispatch<React.SetStateAction<DraftStyleMap>>;
	setCustomBlockRenderMap: React.Dispatch<
		React.SetStateAction<DraftBlockRenderMap>
	>;
	keepEditorFocusBindFn: () => void;
}

export {
	IhtmlToBlockData,
	IhtmlToEntityData,
	IMediaUploadConfig,
	IMediaUploadItemConfig,
	ICommonCompsProps,
};

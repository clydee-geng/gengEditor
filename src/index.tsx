import React from "react";
import EditorComp from "./EditorComp";
import "./icontfont.css";
import { IMediaUploadConfig } from "@alias/types/interfaces";

export interface ICommonProps {
	style?: React.CSSProperties;
	disabled?: boolean;
	mediaUploadConfig?: IMediaUploadConfig;
	onChange?: (val: string) => void;
	placeholder?: string;
}

interface IProps extends ICommonProps {
	value?: string;
}

const GengEditor: React.FC<IProps> = (props) => {
	const {
		value = "",
		onChange = () => {
			//
		},
		...rest
	} = props;
	/**
	 * hooks
	 */

	const [firstValue] = React.useState(value);
	const [isReload, setIsReload] = React.useState(true);
	const isInited = React.useRef(false);
	const changeValue = React.useRef<string>();

	React.useEffect(() => {
		if (
			!isInited.current &&
			changeValue.current !== value &&
			value !== firstValue
		) {
			// 由于EditorState.createWithContent会导致1.光标回到最开头 2.元素重新加载。
			// 所以通过真实的受控组件写法，比如：直接绑定value，或者使用React.useEffect(()=>{}, [value])会有各种各样的问题。
			// 所以通过模拟受控组件的写法来实现一个伪受控组件
			// 具体逻辑为：组件正常渲染，会执行EditorState.createWithContent一次，然后value的变化，会触发组件的再次重载
			// 但是要保证，是纯value变化，而不是onChange导致的value变化
			// 组件只重载一次，获取到真正的初始值即可，后边由内部state和外部value实时同步即可
			setIsReload(false);
		}
	}, [value]);

	React.useEffect(() => {
		if (!isInited.current && !isReload) {
			setIsReload(true);
			isInited.current = true;
		}
	}, [isReload]);

	/**
	 * methods
	 */
	const bindChangeFn = (e: string) => {
		changeValue.current = e;
		onChange(e);
	};

	/**
	 * tsx
	 */
	return (
		<>
			{isReload && (
				<EditorComp {...rest} initValue={value} onChange={bindChangeFn} />
			)}
		</>
	);
};

export default GengEditor;

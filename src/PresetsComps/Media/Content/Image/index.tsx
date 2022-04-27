import React, { MouseEvent } from "react";
import styles from "./index.less";
import {
  EditorState,
  ContentBlock,
  ContentState,
  SelectionState,
} from "draft-js";
import classnames from "classnames";

interface IProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: {
    editorContentDom: HTMLElement;
    editorState: EditorState;
    setEditorState: any;
    disabled: boolean;
  };
}

const Content: React.FC<IProps> = (props) => {
  const { block, contentState, blockProps } = props;
  const { editorContentDom, setEditorState, editorState, disabled } =
    blockProps;
  const entitykey = block.getEntityAt(0);
  const data = contentState.getEntity(entitykey).getData();

  /**
   * hooks
   */
  const [isShow, setIsShow] = React.useState(false);
  const imgWHRatio = React.useRef<number | null>(null);
  const [imgData, setImgData] = React.useState(
    data.width && data.height ? { width: data.width, height: data.height } : {}
  ); // 触发组件重新加载，需要通过data设置
  const [ractSelectData, setRactSelectData] = React.useState(
    data.width && data.height ? { width: data.width, height: data.height } : {}
  );
  const ractSelectDataRef = React.useRef<any>(
    data.width && data.height
      ? { width: data.width, height: data.height }
      : null
  );
  const dotRef = React.useRef<HTMLDivElement>(null);
  const clickToLeftBorder = React.useRef<number | null>(null);
  const ractSelectRef = React.useRef<HTMLDivElement>(null);

  /**
   * life
   */

  const ractSelectMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (dotRef.current && !disabled) {
      clickToLeftBorder.current =
        e.pageX - dotRef.current.getBoundingClientRect().left;

      document.addEventListener("mousemove", documentMouseMove);
      document.addEventListener("mouseup", documentMouseUp);
    }
  };

  const documentMouseMove = (e: any) => {
    if (clickToLeftBorder.current && ractSelectRef.current) {
      let ractSelectNextWidth =
        e.pageX -
        clickToLeftBorder.current -
        editorContentDom.getBoundingClientRect().left -
        (ractSelectRef.current.getBoundingClientRect().left -
          editorContentDom.getBoundingClientRect().left);

      if (ractSelectNextWidth < 0) {
        ractSelectNextWidth = 0;
      }

      let maxRactSelectNextWidth = editorContentDom.offsetWidth;
      if (ractSelectNextWidth > maxRactSelectNextWidth) {
        ractSelectNextWidth = maxRactSelectNextWidth;
      }

      if (imgWHRatio.current) {
        const nextRactSelectData = {
          width: ractSelectNextWidth,
          height: ractSelectNextWidth / imgWHRatio.current,
        };
        setRactSelectData(nextRactSelectData);
        ractSelectDataRef.current = nextRactSelectData;
      }
    }
  };

  const documentMouseUp = () => {
    document.removeEventListener("mouseup", documentMouseUp);
    document.removeEventListener("mousemove", documentMouseMove);
    const nextEditorState = EditorState.push(
      editorState,
      contentState.mergeEntityData(entitykey, ractSelectDataRef.current),
      "change-block-data"
    );
    setEditorState(nextEditorState);
    setImgData(ractSelectDataRef.current);
  };

  const imgLoadBindFn = (e: any) => {
    const nextRactSelectData = {
      width: e.target.width,
      height: e.target.height,
    };
    setRactSelectData(nextRactSelectData);
    setImgData(nextRactSelectData);
    ractSelectDataRef.current = nextRactSelectData;
    imgWHRatio.current = e.target.width / e.target.height;
  };

  const clickBindFn = (e: any) => {
    console.log('clickBindFn', e.target)
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsShow(true);
    const nextEditorState = EditorState.forceSelection(
      editorState,
      SelectionState.createEmpty(block.getKey())
    );
    setEditorState(nextEditorState);
    document.addEventListener("click", cancelMask);
  };
  const cancelMask = () => {
    setIsShow(false);
    document.removeEventListener("click", cancelMask);
  };
  /**
   * jsx
   */

  return (
    <div
      className={
        disabled
          ? classnames(styles.contentDisabled, styles.content)
          : styles.content
      }
      onClick={clickBindFn}
    >
      {isShow && (
        <div
          className={styles.ractSelect}
          style={{ ...ractSelectData }}
          ref={ractSelectRef}
        >
          <div className={styles.info}>{`${parseInt(
            ractSelectData.width
          )}px * ${parseInt(ractSelectData.height)}px`}</div>
          <div
            className={styles.dot}
            onMouseDown={ractSelectMouseDown}
            onDragStart={() => false}
            ref={dotRef}
          ></div>
        </div>
      )}
      <img
        src={data?.src}
        onLoad={imgLoadBindFn}
        draggable="false"
        style={{ ...imgData }}
      />
    </div>
  );
};

export default Content;

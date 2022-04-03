import React, { MouseEvent } from "react";
import styles from "./index.less";
import { EditorState, ContentBlock, ContentState } from "draft-js";

interface IProps {
  editorState: EditorState;
  setEditorState: any;
  block: ContentBlock;
  contentState: ContentState;
  editorContentDom: HTMLElement;
}

const ResizeImg: React.FC<IProps> = (props) => {
  const { block, contentState, editorContentDom, setEditorState, editorState } =
    props;
  const entitykey = block.getEntityAt(0);
  const data = contentState.getEntity(entitykey).getData();

  console.log("ResizeImg:::::", data);

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

  /**
   * life
   */
  React.useEffect(() => {
    const cancelMask = () => {
      console.log("document click");
      setIsShow(false);
    };
    document.addEventListener("click", cancelMask);
    return () => {
      document.removeEventListener("click", cancelMask);
    };
  }, []);

  const ractSelectMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (dotRef.current) {
      clickToLeftBorder.current =
        e.pageX - dotRef.current.getBoundingClientRect().left;

      document.addEventListener("mousemove", documentMouseMove);
      document.addEventListener("mouseup", documentMouseUp);
    }
  };

  const documentMouseMove = (e: any) => {
    if (clickToLeftBorder.current) {
      let newLeft =
        e.pageX -
        clickToLeftBorder.current -
        editorContentDom.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = editorContentDom.offsetWidth;
      if (dotRef.current) {
        rightEdge = rightEdge - dotRef.current?.offsetWidth;
      }

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (imgWHRatio.current) {
        console.log(newLeft);
        const nextRactSelectData = {
          width: newLeft,
          height: newLeft / imgWHRatio.current,
        };
        setRactSelectData(nextRactSelectData);
        ractSelectDataRef.current = nextRactSelectData;
      }
    }
  };

  const documentMouseUp = () => {
    console.log("鼠标台期", ractSelectDataRef.current);
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

  return (
    <div
      className={styles.resizeImg}
      onClick={(e) => {
        e.stopPropagation();
        setIsShow(true);
      }}
    >
      {isShow && (
        <div className={styles.ractSelect} style={{ ...ractSelectData }}>
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

export default React.memo(ResizeImg);

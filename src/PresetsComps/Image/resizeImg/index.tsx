import React, { MouseEvent } from "react";
import styles from "./index.less";

interface IProps {}
interface ImoveData {
  startPageX?: number;
  startPageY?: number;
  endPageX?: number;
  endPageY?: number;
}

const ResizeImg: React.FC<IProps> = (atomicprops: any) => {
  const { block, contentState } = atomicprops;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();

  const [isShow, setIsShow] = React.useState(false);
  const moveData = React.useRef<ImoveData>({});

  React.useEffect(() => {
    const cancelMask = () => setIsShow(false);
    document.addEventListener("click", cancelMask);
    document.addEventListener("mousemove", documentMouseMove);
    return () => {
      document.removeEventListener("click", cancelMask);
      document.removeEventListener("mousemove", documentMouseMove);
    };
  }, [isShow]);

  const ractSelectMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    moveData.current.startPageX = e.pageX;
    moveData.current.startPageY = e.pageY;
  };
  const documentMouseMove = (e: any) => {
    if (isShow) {
      moveData.current.endPageX = e.pageX;
      moveData.current.endPageY = e.pageY;
      console.log(moveData.current);
    }
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
        <div className={styles.ractSelect}>
          <div className={styles.dot} onMouseDown={ractSelectMouseDown}></div>
        </div>
      )}
      <img src={data?.src} />
    </div>
  );
};

export default ResizeImg;

import Comp from "./Comp";
import styles from "./index.less";
import {
  CaretRightOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const Image = (props: any) => (
  <Comp
    {...props}
    type="Image"
    icon={<PictureOutlined />}
    renderUploadedComp={(curUrl: string) => (
      <img
        src={curUrl}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    )}
  />
);

const Video = (props: any) => (
  <Comp
    {...props}
    type="Video"
    icon={<PlaySquareOutlined />}
    renderUploadedComp={(curUrl: string) => (
      <div className={styles.vidoeBox}>
        {console.log("curUrl", curUrl)}
        <div className={styles.videoMask}>
          <CaretRightOutlined />
        </div>
        <video src={curUrl} autoPlay={false} />
      </div>
    )}
  />
);

const Audio = (props: any) => (
  <Comp
    {...props}
    type="Audio"
    icon={<CustomerServiceOutlined />}
    renderUploadedComp={(curUrl: string) => (
      <CustomerServiceOutlined style={{ fontSize: "30px" }} />
    )}
  />
);

export { Image, Audio, Video };

import React from "react";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";

interface IProps {
  defaultColor?: string;
  savePropsFn?: (colorStr: string) => void;
  cancelPropsFn?: () => void;
}

const ReactPickr: React.FC<IProps> = (props) => {
  const {
    defaultColor = "#000000",
    savePropsFn = () => {},
    cancelPropsFn = () => {},
  } = props;

  /**
   * hooks
   */

  const pickrRef = React.useRef(null);

  /**
   * life
   */

  React.useEffect(() => {
    let pickr: any;
    if (pickrRef.current) {
      pickr = Pickr.create({
        el: pickrRef.current,
        container: pickrRef.current,
        useAsButton: true,
        theme: "nano", // or 'monolith', or 'nano'
        showAlways: true,
        inline: true,
        swatches: [
          "#000000",
          "#808080",
          "#C0C0C0",
          "#F5F5F5",
          "#FFFFFF",
          "#FF0000",
          "#FFA500",
          "#FFFF00",
          "#008000",
          "#00FFFF",
          "#0000FF",
          "#800080",
          "#FF69B4",
          "#FFC0CB",
        ],
        defaultRepresentation: "HEXA",
        default: defaultColor,
        components: {
          // Main components
          preview: true,
          opacity: true,
          hue: true,

          // Input / output Options
          interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true,
          },
        },
        i18n: {
          "btn:save": "确定",
          "btn:clear": "取消",
        },
      });
      pickr.on("save", (color: any) => {
        if (color) {
          const colorStr = color.toHEXA().toString();
          savePropsFn(colorStr);
        } else {
          cancelPropsFn();
        }
      });
    }
    return () => {
      pickr.destroy();
    };
  }, []);

  /**
   * methods
   */

  /**
   * jsx
   */
  return <div ref={pickrRef}></div>;
};

export default ReactPickr;

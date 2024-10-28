import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";
import { CSSProperties } from "react";
import { extractColor } from "./util/extractColor";

const DefaultLoading = ({
  dotSize = "12px",
  color = "skyblue-01",
  center = true,
  className = "",
}: Props) => {
  const style: CSSProperties = {
    width: dotSize,
    height: dotSize,
    backgroundColor: extractColor(color),
  };

  return (
    <div>
      <ul
        className={classNames(
          className,
          "flex gap-[8px]",
          center
            ? "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]"
            : ""
        )}
      >
        <li
          className={classNames("rounded-full animate-bounce1")}
          style={style}
        ></li>
        <li
          className={classNames("rounded-full animate-bounce2")}
          style={style}
        ></li>
        <li
          className={classNames("rounded-full animate-bounce3")}
          style={style}
        ></li>
      </ul>
    </div>
  );
};

export default DefaultLoading;

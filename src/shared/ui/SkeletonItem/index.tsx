import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";
import { colors } from "@/shared/style/color";

const SkeletonItem = ({
  className = "",
  rounded = "4px",
  width,
  height,
  backgroundColor = colors["grey"]["01"],
}: Props) => {
  return (
    <div
      className={classNames(className)}
      style={{
        borderRadius: rounded,
        width,
        height,
        backgroundColor,
      }}
    ></div>
  );
};

export default SkeletonItem;

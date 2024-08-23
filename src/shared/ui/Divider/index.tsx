import { colors } from "@/shared/style/color";
import { Props } from "./types";

const Divider = ({
  height,
  width,
  margin,
  orientation = "horizontal",
}: Props) => {
  if (orientation === "vertical") {
    return (
      <div
        style={{
          borderLeft: `${width} solid ${colors.grey["01"]}`,
          height,
          margin,
        }}
      />
    );
  }

  return (
    <hr
      style={{
        width,
        margin,
        borderTop: `${height} solid ${colors.grey["01"]}`,
      }}
    />
  );
};

export default Divider;

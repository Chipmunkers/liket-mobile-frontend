import { colors } from "@/shared/style/color";

type DividerProps = {
  /**
   * 세로 길이
   */
  height: string;

  /**
   * 가로 길이
   */
  width: string;

  /**
   * 마진 값
   */
  margin?: string;

  /**
   * 방향
   *
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";
};

const Divider = ({
  height,
  width,
  margin,
  orientation = "horizontal",
}: DividerProps) => {
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

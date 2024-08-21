import { colors } from "@/utils/style";

interface DividerProps {
  height: string;
  width: string;
  margin?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * @deprecated
 */
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

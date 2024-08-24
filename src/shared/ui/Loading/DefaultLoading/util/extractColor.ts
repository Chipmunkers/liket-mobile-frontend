import { colors } from "@/shared/style/color";

export const extractColor = (color: "white" | "skyblue-01" | "grey-01") => {
  if (color === "white") return colors.grey.white;

  if (color === "grey-01") return colors.grey["01"];

  return colors.skyblue["01"];
};

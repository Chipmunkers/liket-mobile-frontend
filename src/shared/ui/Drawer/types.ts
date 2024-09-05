import { StrictPropsWithChildren } from "@/shared/types/react";
import { DrawerProps } from "@mui/material";

export type Props = StrictPropsWithChildren<DrawerProps> & {
  /**
   * 바텀 영역 safe area만큼 띄워줄 지 여부
   *
   * @default true
   */
  bottomSafeArea?: boolean;
};

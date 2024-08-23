import { SetState } from "@/shared/types/react";
import { CSSProperties, SetStateAction } from "react";

export type Props<T = any> = {
  small?: boolean;
  list: T[];
  selectedTab: string;
  wrapperStyle?: CSSProperties;
  onClickTab: SetState<T>;
  customTabNames?: T[];
};

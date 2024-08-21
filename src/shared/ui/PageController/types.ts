import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  isSelected: boolean;
  onClick: () => void;
}>;

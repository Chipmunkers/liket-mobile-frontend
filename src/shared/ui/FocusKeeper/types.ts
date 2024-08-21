import { StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<{
  ariaLabel: string;
  onEscape: () => void;
}>;

import { StrictPropsWithChildren } from "@/shared/types/react";
import { ReactNode } from "react";

export type Props = StrictPropsWithChildren<{
  /**
   * 제목
   */
  title: string;
  footer: ReactNode;

  /**
   * 열려있는지 여부
   */
  isOpen: boolean;
  ariaLabel: string;
  isCloseOnTop?: boolean;
  onClose: () => void;
}>;

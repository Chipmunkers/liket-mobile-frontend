import { SetState } from "@/shared/types/react";

export type Props = {
  idx: number;

  isOpen: boolean;

  setIsOpen: SetState<boolean>;
};

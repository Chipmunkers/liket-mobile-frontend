import { DateAndTime } from "@/app/create/review/_types/DateAndTime";
import { SetState } from "@/shared/types/react";

export type Props = {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  time: DateAndTime;
  setTime: SetState<DateAndTime>;
};

"use client";

import dayjs from "dayjs";
import { DateAndTime } from "../../_types/DateAndTime";
import { SetState } from "@/shared/types/react";
import Button from "@/shared/ui/Button";
import Drawer from "@/shared/ui/Drawer";
import { DateCalendar } from "@/shared/ui/MuiDateComponent/MuiDateComponent";

interface Props {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  date: DateAndTime;
  setDate: SetState<DateAndTime>;
}

const DateDrawer = (props: Props) => {
  const { isOpen, setIsOpen, date, setDate } = props;

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DateCalendar
        value={date.before}
        maxDate={dayjs(new Date())}
        onChange={(date) => {
          setDate({
            ...date,
            before: date,
          });
        }}
      />
      <div className="flex mb-[8px] px-[24px]">
        <Button
          className="flex-1 h-[48px]"
          onClick={() => {
            setDate({
              ...date,
              selected: date.before,
            });

            setIsOpen(false);
          }}
        >
          확인
        </Button>
      </div>
    </Drawer>
  );
};

export default DateDrawer;

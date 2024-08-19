"use client";

import CustomDrawer from "@/components/CustomDrawer";
import { SetState } from "@/types/react";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DateAndTime } from "../../_types/DateAndTime";
import Button from "@/components/Button";

interface Props {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  date: DateAndTime;
  setDate: SetState<DateAndTime>;
}

const DateDrawer = (props: Props) => {
  const { isOpen, setIsOpen, date, setDate } = props;

  return (
    <CustomDrawer open={isOpen} onClose={() => setIsOpen(false)}>
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
      <div className="flex h-[98px] px-[24px]">
        <Button
          height={48}
          fullWidth
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
    </CustomDrawer>
  );
};

export default DateDrawer;

"use client";

import CustomDrawer from "@/components/CustomDrawer";
import { SetState } from "@/types/react";
import { DateAndTime } from "../../_types/DateAndTime";
import Button from "@/components/Button";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers";

interface Props {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  time: DateAndTime;
  setTime: SetState<DateAndTime>;
}

const TimeDrawer = (props: Props) => {
  const { isOpen, setIsOpen, time, setTime } = props;

  return (
    <CustomDrawer open={isOpen} onClose={() => setIsOpen(false)}>
      <MultiSectionDigitalClock
        value={time.before}
        onChange={(time) => setTime({ ...time, before: time })}
      />
      <div className="flex h-[98px] px-[24px]">
        <Button
          height={48}
          fullWidth
          onClick={() => {
            setTime({
              ...time,
              selected: time.before,
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

export default TimeDrawer;

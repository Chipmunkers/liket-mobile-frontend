"use client";

import { Props } from "./types";
import Button from "@/shared/ui/Button";
import Drawer from "@/shared/ui/Drawer";
import { MultiSectionDigitalClock } from "@/shared/ui/MuiDateComponent/MuiDateComponent";

const TimeDrawer = (props: Props) => {
  const { isOpen, setIsOpen, time, setTime } = props;

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <MultiSectionDigitalClock
        value={time.before}
        onChange={(time) => setTime({ ...time, before: time })}
      />
      <div className="flex h-[98px] px-[24px]">
        <Button
          className="flex-1 h-[48px]"
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
    </Drawer>
  );
};

export default TimeDrawer;

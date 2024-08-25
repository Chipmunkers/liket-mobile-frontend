import Drawer from "@/shared/ui/Drawer";
import { Props } from "./types";
import { ButtonBase } from "@mui/material";
import customToast from "@/shared/helpers/customToast";

const AdjustDrawer = ({ idx, isOpen, setIsOpen }: Props) => {
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <li className="bottom-sheet-list">
        <ButtonBase
          onClick={() => {
            return customToast("열심히 준비중입니다!");
          }}
          className="bottom-sheet-button flex justify-start px-[24px]"
        >
          수정하기
        </ButtonBase>
      </li>
      <li className="bottom-sheet-list">
        <ButtonBase
          onClick={() => {}}
          className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
        >
          삭제
        </ButtonBase>
      </li>
    </Drawer>
  );
};

export default AdjustDrawer;

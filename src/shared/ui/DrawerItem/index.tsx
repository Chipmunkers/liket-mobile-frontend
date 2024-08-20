import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { classNames } from "@/utils/helpers";

const DrawerItem = ({ children, onClick, className }: Props) => {
  return (
    <li className={classNames("bottom-sheet-list", className || "")}>
      <ButtonBase
        onClick={(e) => {
          onClick && onClick(e);
        }}
        className="pl-[24px] w-[100%] flex justify-start items-center"
      >
        {children}
      </ButtonBase>
    </li>
  );
};

export default DrawerItem;

import { SelectLocation } from "../../_types/types";
import { Sido } from "@/shared/consts/region/sido";
import { Sigungu } from "@/shared/consts/region/sigungu";
import { SetState } from "@/shared/types/react";

export type Props = {
  isOpen: boolean;

  selectSido: Sido;
  setSelectSido: SetState<Sido>;

  selectSigungu: Sigungu | null;
  setSelectSigungu: SetState<Sigungu | null>;

  selectLocation: SelectLocation;
  setSelectLocation: SetState<SelectLocation>;
};

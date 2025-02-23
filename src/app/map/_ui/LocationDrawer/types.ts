import { SelectLocation } from "../../_types/types";
import { SetState } from "@/shared/types/react";

export type Props = {
  isOpen: boolean;
  selectLocation: SelectLocation;
  setSelectLocation: SetState<SelectLocation>;
  setLatLng: SetState<{ lat: number; lng: number }>;
};

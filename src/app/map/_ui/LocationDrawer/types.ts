import { SelectLocation } from "../../_types/types";
import { SetState } from "@/shared/types/react";

export type Props = {
  isOpen: boolean;
  selectLocation: SelectLocation;
  onChangeRegion: (
    newRegion: SelectLocation,
    newLatLng: { lat: number; lng: number }
  ) => void;
};

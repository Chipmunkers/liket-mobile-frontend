import { Dispatch } from "react";
import { SelectLocation } from "../../_types/types";
import { SelectLocationAction } from "../../_util/locationFilterReducer";

export type Props = {
  isOpen: boolean;
  selectedLocation: {
    draft: SelectLocation;
    applied: SelectLocation;
  };
  dispatchSelectedLocation: Dispatch<SelectLocationAction>;
  onChangeRegion: (
    newRegion: SelectLocation,
    newLatLng: { lat: number; lng: number }
  ) => void;
};

import { MapFilter } from "@/app/map/_types/types";
import { Dispatch } from "react";
import { MapFilterAction } from "../../_util/mapFilterReducer";

export type Props = {
  isOpen: boolean;
  mapFilter: {
    draft: MapFilter;
    applied: MapFilter;
  };
  dispatchMapFilter: Dispatch<MapFilterAction>;
};

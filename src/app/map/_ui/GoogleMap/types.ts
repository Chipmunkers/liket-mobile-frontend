import { ReactNode } from "react";
import { SetState } from "@/shared/types/react";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import { MapFilter } from "../../_types/types";

export type Props = {
  children?: ReactNode;
  contentList: MapContentEntity[];
  setContentList: SetState<MapContentEntity[]>;
  clickedContent: MapContentEntity | undefined;
  setClickedContent: SetState<MapContentEntity | undefined>;
  mapFilter: MapFilter;
  latLng: {
    lat: number;
    lng: number;
  };
  setLatLng: SetState<{
    lat: number;
    lng: number;
  }>;
  setClickedClusteredContents: SetState<MapContentEntity[]>;
};

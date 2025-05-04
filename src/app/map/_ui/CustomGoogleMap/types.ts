import { MutableRefObject } from "react";
import { SetState } from "@/shared/types/react";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import { MapInfo } from "../../_types/types";
import Supercluster from "supercluster";
import { Coordinate } from "@/shared/types/ui/map/type";

export type Props = {
  isOnlyOneSingleIconMarkerVisibleInMap: boolean;
  googleMapRef: MutableRefObject<google.maps.Map | null>;
  selectedMarkerId?: number;
  markerClusteredContents: (
    | Supercluster.PointFeature<MapContentEntity>
    | Supercluster.PointFeature<Supercluster.ClusterProperties & any>
  )[];
  mapInfo: MapInfo;
  userPosition: {
    lat: number | null;
    lng: number | null;
  };
  latLng: {
    lat: number;
    lng: number;
  };
  onChangeMapInfo: (
    bound: MapInfo["bound"],
    center: Coordinate,
    zoomLevel: number
  ) => void;
  onDragStart: () => void;
  onClickMap: () => void;
  setMapInfo: SetState<MapInfo>;
  onClickMarkerCluster: (id: number) => void;
  onChangeMap: () => void;
};

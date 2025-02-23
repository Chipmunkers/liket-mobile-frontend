import { ReactNode } from "react";
import { SetState } from "@/shared/types/react";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import { MapInfo } from "../../_types/types";
import Supercluster from "supercluster";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";

export type Props = {
  children?: ReactNode;
  selectedMarkerId?: number;
  circleClusteredContentList?: ClusteredContentEntity[] | null;
  markerClusteredContents: (
    | Supercluster.PointFeature<MapContentEntity>
    | Supercluster.PointFeature<Supercluster.ClusterProperties & any>
  )[];
  mapInfo: MapInfo;
  latLng: {
    lat: number;
    lng: number;
  };
  setMapInfo: SetState<MapInfo>;
  onClickMarkerCluster: (id: number) => void;
  onClickGoogleMap: () => void;
};

import { Place, RouteSegment } from "@/page/CreatePlan/type";
import { SetState } from "@/shared/types/react";

export type Props = {
  placeList: (Place | null)[];
  routeList: any[];
  setRouteList: SetState<any[]>;
  routeSegmentList: (RouteSegment | null)[];
  googleMap: google.maps.Map | null;
  setGoogleMap: SetState<google.maps.Map | null>;
};

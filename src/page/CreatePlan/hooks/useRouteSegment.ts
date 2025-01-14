import { Place, RouteSegment } from "@/page/CreatePlan/type";
import { useEffect, useState } from "react";

export const useRouteSegment = ({
  origin,
  stopoverList,
  destination,
}: {
  origin?: Place;
  stopoverList: Place[];
  destination?: Place;
}) => {
  const [routeSegmentList, setRouteSegmentList] = useState<RouteSegment[]>([]);

  useEffect(() => {
    if (!origin) return;

    if (!destination) return;
  }, [origin]);
};

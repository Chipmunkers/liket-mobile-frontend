import { Place, RouteSegment } from "@/page/CreatePlan/type";
import { useEffect, useState } from "react";

export const useRouteSegment = ({
  placeList,
}: {
  placeList: (Place | null)[];
}) => {
  const [routeSegmentList, setRouteSegmentList] = useState<
    (RouteSegment | null)[]
  >([]);

  useEffect(() => {
    const segmentList: (RouteSegment | null)[] = [];

    for (let i = 0; i < placeList.length - 1; i++) {
      const startPlace = placeList[i];
      const endPlace = placeList[i + 1];

      if (!startPlace || !endPlace) {
        segmentList.push(null);
        continue;
      }

      segmentList.push({
        start: startPlace,
        end: endPlace,
        type: "transit",
      });
    }

    setRouteSegmentList(segmentList);
  }, [placeList]);

  return {
    routeSegmentList,
    setRouteSegmentList,
  };
};

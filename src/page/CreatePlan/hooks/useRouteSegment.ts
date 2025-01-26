import { Place, RouteSegment } from "@/page/CreatePlan/type";
import { SetState } from "@/shared/types/react";
import { useEffect } from "react";

/**
 * Place가 변경되었을 때 작동하는 훅.
 */
export const useRouteSegment = ({
  placeList,
  routeSegmentList,
  setRouteSegmentList,
}: {
  placeList: (Place | null)[];
  routeSegmentList: (RouteSegment | null)[];
  setRouteSegmentList: SetState<(RouteSegment | null)[]>;
}) => {
  useEffect(() => {
    const tempRouteSegmentList = placeList.map(
      (place, i) => routeSegmentList[i]
    );

    for (let i = 0; i < placeList.length; i++) {
      const startPlace = placeList[i];
      const endPlace = placeList[i + 1];

      // 출발/도착 이 아직 정해지지 않은 경우
      if (!startPlace || !endPlace) {
        tempRouteSegmentList[i] = null;
        continue;
      }

      const routeSegment = routeSegmentList[i];

      // 기존 route segment가 존재하지 않는 경우
      if (!routeSegment) {
        tempRouteSegmentList[i] = {
          start: startPlace,
          end: endPlace,
          type: "transit",
          createdAt: new Date(),
        };
        continue;
      }

      // 기존 route segment와 start와 end가 동일한 경우
      if (routeSegment.start === startPlace && routeSegment.end === endPlace) {
        continue;
      }

      tempRouteSegmentList[i] = {
        start: startPlace,
        end: endPlace,
        type: "transit",
        createdAt: new Date(),
      };
    }

    setRouteSegmentList([...tempRouteSegmentList]);
  }, [placeList]);

  return {
    routeSegmentList,
    setRouteSegmentList,
  };
};

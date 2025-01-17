import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Route, RouteSegment } from "@/page/CreatePlan/type";
import axiosInstance from "@/shared/helpers/axios";
import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";
import { SetState } from "@/shared/types/react";
import { useEffect, useMemo } from "react";

export const usePlaceRoute = ({
  i,
  setRouteList,
  routeList,
  routeSegmentList,
}: {
  i: number;
  setRouteList: SetState<(Route | null)[]>;
  routeList: (Route | null)[];
  routeSegmentList: (RouteSegment | null)[];
}) => {
  const { extractCoordinate } = useGetUtils();

  /**
   * 대중교통 경로 가져오기
   */
  const getTransitRoute = async (
    routeSegment: RouteSegment
  ): Promise<Route | null> => {
    try {
      const directionsService = new google.maps.DirectionsService();

      const result = await directionsService.route({
        origin: {
          lat: extractCoordinate(routeSegment.start).y,
          lng: extractCoordinate(routeSegment.start).x,
        },
        destination: {
          lat: extractCoordinate(routeSegment.end).y,
          lng: extractCoordinate(routeSegment.end).x,
        },
        travelMode: google.maps.TravelMode.TRANSIT,
      });

      const route: Route = {
        type: "transit",
        coordinateList: [],
        totalTime: 0,
        error: null,
        info: null,
      };

      if (result === null) {
        route.error = {
          reason: "탐색된 경로가 없습니다.",
        };
      } else {
        const totalDuration = result.routes[0].legs.reduce(
          (sum, leg) => sum + (leg.duration?.value || 0),
          0
        ); // 총 소요 시간 (초 단위)

        route.totalTime = totalDuration;
        route.coordinateList = result.routes[0].overview_path.map((point) => ({
          y: point.lat(),
          x: point.lng(),
        }));
        route.info = result;
      }
      return route;
    } catch (err) {
      return {
        coordinateList: [],
        totalTime: 0,
        type: "transit",
        error: {
          reason: "탐색된 경로가 없습니다.",
        },
        info: null,
      };
    }
  };

  /**
   * 도보 경로 가져오기
   */
  const getWalkingRoute = async (
    routeSegment: RouteSegment
  ): Promise<Route | null> => {
    const origin = routeSegment.start;
    const destination = routeSegment.end;

    try {
      const { data } = await axiosInstance.post<PedestrianRouteEntity>(
        "/apis/address/pedestrian/all",
        {
          startName: "시작",
          startX: extractCoordinate(origin).x,
          startY: extractCoordinate(origin).y,
          endName: "도착",
          endX: extractCoordinate(destination).x,
          endY: extractCoordinate(destination).y,
        }
      );

      return {
        type: "walking",
        coordinateList: data.features
          .filter((feature) => feature.type === "LineString") // LineString만 사용
          .flatMap((feature) => feature.coordinates), // 각 feature의 coordinates 병합,
        info: data.features,
        error: null,
        totalTime:
          data.features.filter((feat) => feat.properties.pointType === "SP")[0]
            .properties.totalTime || 0,
      };
    } catch (err) {
      return {
        coordinateList: [],
        totalTime: 0,
        type: "walking",
        error: {
          reason: "탐색된 경로가 없습니다.",
        },
        info: null,
      };
    }
  };

  useEffect(() => {
    (async () => {
      const tempRouteList = routeList;

      if (!routeSegmentList[i]) {
        tempRouteList[i] = null;
      } else if (routeSegmentList[i].type === "transit") {
        tempRouteList[i] = await getTransitRoute(routeSegmentList[i]);
      } else if (routeSegmentList[i].type === "walking") {
        tempRouteList[i] = await getWalkingRoute(routeSegmentList[i]);
      }

      setRouteList([...tempRouteList]);
    })();
  }, [routeSegmentList[i]]);
};

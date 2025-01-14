import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Place } from "@/page/CreatePlan/type";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetPedestrianRoute = (
  origin: Place | undefined,
  stopover: Place[],
  destination: Place | undefined
) => {
  const exceptionHandler = useExceptionHandler();
  const { extractKey, extractCoordinate } = useGetUtils();

  const query = useQuery<PedestrianRouteEntity, AxiosError>({
    queryKey: [
      "pedestrian-route",
      `stopover-length-${stopover.length}`,
      extractKey(origin),
      extractKey(destination),
    ],
    queryFn: async () => {
      if (!origin || !destination) {
        throw new Error("출발지 또는 도착지가 없습니다.");
      }

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

      return data;
    },
    enabled: !!origin && !!destination,
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [
      {
        statusCode: 404,
        handler() {
          customToast("경로 서비스를 제공하지 않는 장소입니다.");
        },
      },
      401,
      403,
      418,
      429,
      {
        statusCode: 500,
        handler() {
          customToast("경로 제공이 불가능한 장소입니다.");
        },
      },
      502,
      504,
    ]);
  }, [query.error]);

  return {
    data: query.data,
  };
};

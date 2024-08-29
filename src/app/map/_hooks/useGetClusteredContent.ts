import { generateMapFilterQuerystring } from "../_util/generateMapFilterQuerystring";
import { MapFilter, MapInfo } from "../_types/types";
import axiosInstance from "@/shared/helpers/axios";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";
import { useQuery } from "@tanstack/react-query";

export const useGetClusteredContent = (
  mapInfo: MapInfo,
  mapFilter: MapFilter
) => {
  const query = useQuery({
    queryKey: ["clustered-map", mapInfo, mapFilter],
    queryFn: async () => {
      if (mapInfo.level >= 15) return null;

      // TODO: 레벨 관련 로직 수정 필요함: 백엔드에서 카카오 레벨 기준으로 설정되어있는 문제가 있음
      const clusteredLevel =
        mapInfo.level >= 13 ? 6 : mapInfo.level === 10 ? 11 : 10;

      const { data } = await axiosInstance.get<{
        clusteredContentList: ClusteredContentEntity[];
      }>(
        `/apis/map/culture-content/clustered/all?` +
          `top-x=${mapInfo.bound.top.x}&` +
          `top-y=${mapInfo.bound.top.y}&` +
          `bottom-x=${mapInfo.bound.bottom.x}&` +
          `bottom-y=${mapInfo.bound.bottom.y}&` +
          `level=${clusteredLevel}&` +
          generateMapFilterQuerystring(mapFilter)
      );
      return data;
    },
  });

  return query;
};

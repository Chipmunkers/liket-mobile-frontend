import { generateMapFilterQuerystring } from "../_util/generateMapFilterQuerystring";
import { MapFilter, MapInfo } from "../_types/types";
import axiosInstance from "@/shared/helpers/axios";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";
import { useQuery } from "@tanstack/react-query";

const ClusterLevel = {
  /**
   * 시도
   */
  SIDO: 1,

  /**
   * 시군구
   */
  SIGUNGU: 2,

  /**
   * 읍면동
   */
  DONG: 3,
};

export const useGetClusteredContent = (
  mapInfo: MapInfo,
  mapFilter: MapFilter
) => {
  const query = useQuery({
    queryKey: ["clustered-map", mapInfo, mapFilter],
    queryFn: async () => {
      if (mapInfo.level >= 15) return null;

      const clusteredLevel =
        mapInfo.level >= 13
          ? ClusterLevel.DONG
          : mapInfo.level === 10
          ? ClusterLevel.SIDO
          : ClusterLevel.SIGUNGU;

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

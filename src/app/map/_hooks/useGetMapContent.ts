import axiosInstance from "@/shared/helpers/axios";
import { MapFilter, MapInfo } from "../_types/types";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import { useQuery } from "@tanstack/react-query";
import { generateMapFilterQuerystring } from "../_util/generateMapFilterQuerystring";

export const useGetMapContent = (mapInfo: MapInfo, mapFilter: MapFilter) => {
  const query = useQuery<{
    contentList: MapContentEntity[];
  }>({
    queryKey: ["map-contents", mapInfo, mapFilter],
    queryFn: async () => {
      if (mapInfo.level < 15) return null;

      const { data } = await axiosInstance.get(
        `/apis/map/culture-content/all?` +
          `top-x=${mapInfo.bound.top.x}&` +
          `top-y=${mapInfo.bound.top.y}&` +
          `bottom-x=${mapInfo.bound.bottom.x}&` +
          `bottom-y=${mapInfo.bound.bottom.y}&` +
          generateMapFilterQuerystring(mapFilter)
      );

      return data;
    },
  });

  return query;
};

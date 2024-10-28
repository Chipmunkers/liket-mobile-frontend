import { generateMapFilterQuerystring } from "../_util/generateMapFilterQuerystring";
import { MapFilter, MapInfo } from "../_types/types";
import axiosInstance from "@/shared/helpers/axios";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError } from "axios";
import useModalStore from "@/shared/store/modalStore";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

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
  const exceptionHandler = useExceptionHandler();
  const openModal = useModalStore(({ openModal }) => openModal);
  const router = useRouter();

  const query = useQuery<
    {
      clusteredContentList: ClusteredContentEntity[];
    } | null,
    AxiosError
  >({
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

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [
      {
        statusCode: 401,
        handler: (err) => {
          openModal("LoginModal", {
            onClickNegative() {
              stackRouterBack(router);
            },
            onClickPositive() {
              stackRouterPush(router, {
                path: "/login",
                screen: WEBVIEW_SCREEN.LOGIN,
                isStack: false,
              });
            },
          });
        },
      },
      418,
      429,
      500,
      502,
      504,
    ]);
  }, [query.error]);

  return query;
};

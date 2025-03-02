import axiosInstance from "@/shared/helpers/axios";
import { MapFilter, MapInfo } from "../_types/types";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import { useQuery } from "@tanstack/react-query";
import { generateMapFilterQuerystring } from "../_util/generateMapFilterQuerystring";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";
import useModalStore from "@/shared/store/modalStore";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export const useGetMapContent = (mapInfo: MapInfo, mapFilter: MapFilter) => {
  const router = useRouter();
  const openModal = useModalStore(({ openModal }) => openModal);
  const exceptionHandler = useExceptionHandler();

  const query = useQuery<
    {
      contentList: MapContentEntity[];
    },
    AxiosError
  >({
    queryKey: [
      "map-contents",
      mapInfo.zoomLevel,
      mapInfo.bound.top.x,
      mapInfo.bound.top.y,
      mapInfo.bound.bottom.x,
      mapInfo.bound.bottom.y,
      mapFilter.age?.idx,
      mapFilter.genre?.idx,
      mapFilter.styles?.length,
    ],
    queryFn: async () => {
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
    placeholderData: (prev) => prev,
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

import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { ReactNode, useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import axiosInstance from "../../utils/axios";
import { ClusteredContent } from "./interface/ClusteredContent";
import { getMapInfo } from "./util/getMapInfo";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&autoload=false`;

const KakaoMapV2 = ({ children }: { children?: ReactNode }) => {
  const [mapInfo, setMapInfo] = useState<{
    bound: {
      top: { x: number; y: number };
      bottom: { x: number; y: number };
    };
    level: number;
  }>({
    bound: {
      top: { x: 127.04270718193654, y: 37.52115908000757 },
      bottom: {
        x: 127.05628928044179,
        y: 37.507974075977934,
      },
    },
    level: 4,
  });

  const [clusteredContentList, setClusteredContentList] = useState<
    ClusteredContent[]
  >([]);

  const { data: clusteredApiResult } = useQuery({
    queryKey: ["clustered-map", mapInfo],
    queryFn: async () => {
      if (mapInfo.level <= 5) return null;

      const { data } = await axiosInstance.get<{
        clusteredContentList: ClusteredContent[];
      }>(
        `/apis/map/culture-content/clustered/all?` +
          `top-x=${mapInfo.bound.top.x}&` +
          `top-y=${mapInfo.bound.top.y}&` +
          `bottom-x=${mapInfo.bound.bottom.x}&` +
          `bottom-y=${mapInfo.bound.bottom.y}&` +
          `level=${mapInfo.level}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (!clusteredApiResult) return;

    const alreadyExistClusteredCodes = clusteredContentList.map(
      (clusteredData) => clusteredData.code
    );

    setClusteredContentList([
      // * 이미 존재하는 클러스터링 데이터 삭제하기
      ...clusteredApiResult.clusteredContentList.filter(
        (clusteredContent) =>
          !alreadyExistClusteredCodes.includes(clusteredContent.code)
      ),
      ...clusteredContentList.filter(
        (clusteredContent) =>
          clusteredContent.lng <= mapInfo.bound.bottom.x &&
          clusteredContent.lng >= mapInfo.bound.top.x &&
          clusteredContent.lat <= mapInfo.bound.top.y &&
          clusteredContent.lat >= mapInfo.bound.bottom.y
      ),
    ]);
  }, [clusteredApiResult]);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={KAKAO_SDK_URL}
      />
      <Map
        center={{
          lng: 127.0495556,
          lat: 37.514575,
        }}
        isPanto={false}
        className="grow relative w-[100%]"
        level={4}
        onDragEnd={(map) => setMapInfo(getMapInfo(map))}
        onZoomChanged={(map) => setMapInfo(getMapInfo(map))}
      ></Map>
    </>
  );
};

export default KakaoMapV2;

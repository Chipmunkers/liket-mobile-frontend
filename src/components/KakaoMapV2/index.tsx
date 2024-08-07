import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { ReactNode, useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import axiosInstance from "../../utils/axios";

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

  const [clusteredContentWithOverlayList, setClusteredContentWithOverlayList] =
    useState<
      {
        code: string;
        overlay: any;
      }[]
    >([]);

  const { data: clusteredApiResult } = useQuery({
    queryKey: ["clustered-map", mapInfo],
    queryFn: async () => {
      if (mapInfo.level <= 5) return null;

      const { data } = await axiosInstance.get<{
        clusteredContentList: {
          code: string;
          lng: number;
          lat: number;
          count: number;
        }[];
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

    // TODO: 이거 하단 부분 수정해야함
    const alreadyExistClusteredCodes = clusteredContentWithOverlayList.map(
      (clusteredData) => clusteredData.code
    );

    // setClusteredContentWithOverlayList([
    //   // * 이미 존재하는 컬러스터 데이터는 추가하지 않기
    //   clusteredApiResult.clusteredContentList.map(
    //     (data) => !alreadyExistClusteredCodes.includes(data.code)
    //   ),
    // ]);
  }, [clusteredApiResult]);

  // * 클러스터링 데이터를 받아온 후 클러스터링 데이터 정제
  // *  1. 범위에서 벗어난 마커 데이터 삭제
  // *  2. 범위에서 벗어난 클러스터링 데이터 삭제
  // useEffect(() => {
  //   if (!clusteredMap) return;

  //   // * 마커 삭제하기
  //   if (markerList.length) {
  //     markerList.forEach((elem) => elem.marker.setMap(null));
  //     setMarkerList([]);
  //     setContentList([]);
  //   }

  //   const queryClusteredList: any[] = clusteredMap.data.clusteredContentList;

  //   // * 클러스터링 데이터 갱신하기
  //   const alreadyExistClusteredCodes = clusteredContentList.map(
  //     (data) => data.code
  //   );
  //   setClusteredContentList([
  //     // * 범위에 벗어난 클러스러링 데이터 삭제하기
  //     ...clusteredContentList.filter(
  //       (data) =>
  //         data.lng <= bound.oa &&
  //         data.lng >= bound.ha &&
  //         data.lat <= bound.ha &&
  //         data.lat >= bound.qa
  //     ),
  //     ...queryClusteredList.filter(
  //       (data) => !alreadyExistClusteredCodes.includes(data.code)
  //     ),
  //   ]);
  // }, [clusteredMap]);

  // const { data: contentData } = useQuery({
  //   queryKey: ["map-contents", bound, level],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get(
  //       `/apis/map/culture-content/all?` +
  //         `top-x=${bound?.ha}&` +
  //         `top-y=${bound?.pa}&` +
  //         `bottom-x=${bound?.oa}&` +
  //         `bottom-y=${bound?.qa}&`
  //     );
  //     return { data };
  //   },
  //   enabled: () => {
  //     if (level > 5) return false;

  //     return !!bound && !!level;
  //   },
  // });

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
        onDragEnd={(map) => {
          setMapInfo({
            bound: {
              top: {
                x: map.getBounds().getSouthWest().getLng(),
                y: map.getBounds().getNorthEast().getLat(),
              },
              bottom: {
                x: map.getBounds().getNorthEast().getLng(),
                y: map.getBounds().getSouthWest().getLat(),
              },
            },
            level: map.getLevel(),
          });
        }}
        onZoomChanged={(map) => {
          setMapInfo({
            bound: {
              top: {
                x: map.getBounds().getSouthWest().getLng(),
                y: map.getBounds().getNorthEast().getLat(),
              },
              bottom: {
                x: map.getBounds().getNorthEast().getLng(),
                y: map.getBounds().getSouthWest().getLat(),
              },
            },
            level: map.getLevel(),
          });
        }}
      ></Map>
    </>
  );
};

export default KakaoMapV2;

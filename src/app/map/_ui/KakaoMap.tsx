import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import axiosInstance from "@/utils/axios";
import { getMapInfo } from "../util/getMapInfo";
import { Age, Genre, Style } from "@/types/content";
import { generateMapFilterQuerystring } from "../util/generateMapFilterQuerystring";
import { ClusteredContentEntity, MapContentEntity } from "@/types/api/map";
import { AxiosError } from "axios";
import useModalStore from "../../../stores/modalStore";
import { useRouter } from "next/navigation";
import { classNames } from "../../../utils/helpers";
import {
  ScreenTYPE,
  stackRouterBack,
  stackRouterPush,
} from "../../../utils/stackRouter";

const KakaoMap = ({
  children,
  contentList,
  setContentList,
  clickedContent,
  setClickedContent,
  mapFilter,
  latLng,
  setLatLng,
}: {
  children?: ReactNode;
  contentList: MapContentEntity[];
  setContentList: Dispatch<SetStateAction<MapContentEntity[]>>;
  clickedContent: MapContentEntity | undefined;
  setClickedContent: Dispatch<SetStateAction<MapContentEntity | undefined>>;
  mapFilter: {
    genre: Genre | undefined;
    age: Age | undefined;
    styles: Style[];
  };
  latLng: {
    lat: number;
    lng: number;
  };
  setLatLng: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    retries: 2,
  });

  const [level, setLevel] = useState(8);
  const [mapInfo, setMapInfo] = useState<{
    bound: {
      top: { x: number; y: number };
      bottom: { x: number; y: number };
    };
    level: number;
  }>({
    bound: {
      top: { x: 0, y: 0 },
      bottom: { x: 0, y: 0 },
    },
    level,
  });

  // * 현재 맵에 표시되고 있는 클러스터링 컨텐츠 목록
  const [clusteredContentList, setClusteredContentList] = useState<
    ClusteredContentEntity[]
  >([]);

  const { data: clusteredApiResult, error: clusteredError } = useQuery({
    queryKey: ["clustered-map", mapInfo, mapFilter],
    queryFn: async () => {
      if (mapInfo.level <= 5) return null;

      const { data } = await axiosInstance.get<{
        clusteredContentList: ClusteredContentEntity[];
      }>(
        `/apis/map/culture-content/clustered/all?` +
          `top-x=${mapInfo.bound.top.x}&` +
          `top-y=${mapInfo.bound.top.y}&` +
          `bottom-x=${mapInfo.bound.bottom.x}&` +
          `bottom-y=${mapInfo.bound.bottom.y}&` +
          `level=${mapInfo.level}&` +
          generateMapFilterQuerystring(mapFilter)
      );
      return data;
    },
  });

  const { data: contentApiResult, error: contentError } = useQuery<{
    contentList: MapContentEntity[];
  }>({
    queryKey: ["map-contents", mapInfo, mapFilter],
    queryFn: async () => {
      if (mapInfo.level > 5) return null;

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

  // * Zoon Level이 변경되면 이전 데이터 초기화
  useEffect(() => {
    setClusteredContentList([]);
    setContentList([]);
    setClickedContent(undefined);
    setMapInfo({ ...mapInfo, level });
  }, [level, mapFilter]);

  const openModal = useModalStore(({ openModal }) => openModal);

  const router = useRouter();

  // * 데이터를 불러오다가 에러가 난 경우
  useEffect(() => {
    if (!contentError && !clusteredError) return;

    const error = clusteredError || contentError;

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        openModal("LoginModal", {
          onClickPositive: () => {
            stackRouterPush(router, {
              path: "/login",
              screen: ScreenTYPE.LOGIN,
              isStack: false,
            });
          },
          onClickNegative: () => {
            stackRouterPush(router, {
              path: "/",
              screen: ScreenTYPE.MAIN,
              isStack: false,
            });
          },
        });
      }
    }
  }, [clusteredError, contentError]);

  useEffect(() => {
    if (!contentApiResult) return;

    const alreadyExistContentIdxList = contentList.map(
      (content) => content.idx
    );

    setContentList([
      // * 이미 존재하는 컨텐츠 데이터 삭제하기
      ...contentApiResult.contentList.filter(
        (content) => !alreadyExistContentIdxList.includes(content.idx)
      ),
      // * 현재 보고있는 bound를 벗어난 컨텐츠 삭제하기
      ...contentList.filter(
        (content) =>
          content.location.positionX <= mapInfo.bound.bottom.x &&
          content.location.positionX >= mapInfo.bound.top.x &&
          content.location.positionY <= mapInfo.bound.top.y &&
          content.location.positionY >= mapInfo.bound.bottom.y
      ),
    ]);
  }, [contentApiResult]);

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
      // * 현재 보고 있는 bound를 벗어난 경우 삭제하기
      ...clusteredContentList.filter(
        (clusteredContent) =>
          clusteredContent.lng <= mapInfo.bound.bottom.x &&
          clusteredContent.lng >= mapInfo.bound.top.x &&
          clusteredContent.lat <= mapInfo.bound.top.y &&
          clusteredContent.lat >= mapInfo.bound.bottom.y
      ),
    ]);
  }, [clusteredApiResult]);

  const [clusteredData, setClusteredData] =
    useState<(ClusteredContentEntity & { scale: number })[]>();

  useEffect(() => {
    if (!clusteredContentList) return;
    const countList = clusteredContentList.map((data) => data.count);

    // 평균
    const mean =
      countList.reduce((sum, value) => sum + value, 0) / countList.length;

    // 분산
    const variance =
      countList.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      countList.length;

    const standardDeviation = Math.sqrt(variance);

    // 각 zValue 계산
    const zValueList = countList.map(
      (count) => ((count - mean) / standardDeviation) * 3
    );

    setClusteredData(
      clusteredContentList.map((data, i) => ({
        ...data,
        scale: zValueList[i],
      }))
    );
  }, [clusteredContentList]);

  return (
    <>
      <Map
        center={{
          lng: latLng.lng,
          lat: latLng.lat,
        }}
        isPanto={false}
        className="grow relative w-[100%]"
        minLevel={10}
        level={mapInfo.level}
        onDragEnd={(map) => {
          setMapInfo(getMapInfo(map));
        }}
        onZoomChanged={(map) => {
          setLevel(map.getLevel());
          setMapInfo(getMapInfo(map));
          setClickedContent(undefined);
        }}
        onClick={() => {
          setClickedContent(undefined);
        }}
        onTileLoaded={(map) => {
          setMapInfo(getMapInfo(map));
        }}
      >
        {children}
        {clusteredData &&
          clusteredData.map(({ lat, lng, count, scale }) => {
            const calculatedScale = (100 + scale * 3).toFixed(0).toString();
            return (
              <CustomOverlayMap
                position={{
                  lat: lat,
                  lng: lng,
                }}
                key={`${lat}-${lng}`}
              >
                <div
                  onClick={() => {
                    setLatLng({ lng, lat });
                    setLevel(level - 1);
                  }}
                  className={classNames(
                    "rounded-full border-solid hover:scale-110 origin-center duration-200 border-skyblue-02 border w-[48px] h-[48px] -translate-y-2/4 -translate-x-2/4 flex justify-center items-center bg-skyblue-02 bg-opacity-80 text-white font-bold",
                    `scale-[${calculatedScale}%]`
                  )}
                  style={{
                    scale: `${calculatedScale}%`,
                  }}
                >
                  <span>{count}</span>
                </div>
              </CustomOverlayMap>
            );
          })}
        {contentList.map((content) => {
          const { idx, genre, title, location } = content;

          return (
            <CustomOverlayMap
              position={{
                lng: location.positionX,
                lat: location.positionY,
              }}
              key={idx}
            >
              <div
                className="flex items-end justify-center h-[50px] select-none cursor-pointer"
                onClick={() => {
                  if (clickedContent?.idx === idx)
                    return setClickedContent(undefined);

                  setClickedContent(content);
                }}
              >
                {clickedContent?.idx === content.idx ? (
                  <img
                    className="w-[50px]"
                    src={`https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${genre.idx}_icon.svg`}
                  />
                ) : (
                  <img
                    className="w-[30px]"
                    src={`https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default-marker-${genre.idx}.svg`}
                  />
                )}
              </div>
              <div
                className="w-[100px] mt-[4px] text-base text-center text-wrap whitespace-nowrap leading-[14px] text-white pr-[8px] pl-[8px] pt-[4px] pb-[2px] rounded-[8px] break-keep"
                style={{
                  textShadow:
                    "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
              >
                {title}
              </div>
            </CustomOverlayMap>
          );
        })}
      </Map>
    </>
  );
};

export default KakaoMap;

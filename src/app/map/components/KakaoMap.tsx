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

const KakaoMap = ({
  children,
  contentList,
  setContentList,
  clickedContent,
  setClickedContent,
  mapFilter,
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
}) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    retries: 2,
  });

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
  const [level, setLevel] = useState(4);

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
  }, [level, mapFilter]);

  const openModal = useModalStore(({ openModal }) => openModal);

  const router = useRouter();

  // * 데이터를 불러오다가 에러가 난 경우
  useEffect(() => {
    if (!contentError && !clusteredError) return;

    const error = clusteredError || contentError;

    if (error instanceof AxiosError) {
      if (error.response?.status === 401)
        openModal("LoginModal", {
          onClickPositive: () => {
            router.replace("/login");
          },
          onClickNegative: () => {
            router.back();
          },
        });
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

  return (
    <>
      <Map
        center={{
          lng: 127.0495556,
          lat: 37.514575,
        }}
        isPanto={false}
        className="grow relative w-[100%]"
        minLevel={10}
        level={4}
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
      >
        {children}
        {clusteredContentList.map(({ lat, lng, count }) => {
          return (
            <CustomOverlayMap
              position={{
                lat: lat,
                lng: lng,
              }}
              key={`${lat}-${lng}`}
            >
              <div className="rounded-full border-solid border-skyblue-02 border w-[48px] h-[48px] -translate-y-2/4 -translate-x-2/4 flex justify-center items-center bg-skyblue-02 bg-opacity-80 text-white font-bold">
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
                className="w-[100px] mt-[4px] text-base text-center text-wrap test-[12px] whitespace-nowrap leading-[14px] text-white pr-[8px] pl-[8px] pt-[4px] pb-[4px] rounded-[8px]"
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

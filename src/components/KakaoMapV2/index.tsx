import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import axiosInstance from "../../utils/axios";
import { ClusteredContent } from "./interface/ClusteredContent";
import { getMapInfo } from "./util/getMapInfo";
import { Content } from "./interface/Content";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&autoload=false`;

const KakaoMapV2 = ({
  children,
  contentList,
  setContentList,
}: {
  children?: ReactNode;
  contentList: Content[];
  setContentList: Dispatch<SetStateAction<Content[]>>;
}) => {
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
  const [clickedContent, setClickedContent] = useState<Content>();

  // * 현재 맵에 표시되고 있는 클러스터링 컨텐츠 목록
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

  const { data: contentApiResult } = useQuery<{ contentList: Content[] }>({
    queryKey: ["map-contents", mapInfo],
    queryFn: async () => {
      if (mapInfo.level > 5) return;

      const { data } = await axiosInstance.get(
        `/apis/map/culture-content/all?` +
          `top-x=${mapInfo.bound.top.x}&` +
          `top-y=${mapInfo.bound.top.y}&` +
          `bottom-x=${mapInfo.bound.bottom.x}&` +
          `bottom-y=${mapInfo.bound.bottom.y}&`
      );

      return data;
    },
  });

  // * Zoon Level이 변경되면 이전 데이터 초기화
  useEffect(() => {
    setClusteredContentList([]);
    setContentList([]);
  }, [level]);

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
        onZoomChanged={(map) => {
          setLevel(map.getLevel());
          setMapInfo(getMapInfo(map));
        }}
      >
        {children}
        {clusteredContentList.map((clusteredContent) => (
          <CustomOverlayMap
            position={{
              lat: clusteredContent.lat,
              lng: clusteredContent.lng,
            }}
          >
            <div>{clusteredContent.count}</div>
          </CustomOverlayMap>
        ))}
        {contentList.map((content) => (
          <CustomOverlayMap
            position={{
              lng: content.location.positionX,
              lat: content.location.positionY,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                height: "50px",
                userSelect: "none",
              }}
              onClick={() => {
                if (clickedContent?.idx === content.idx)
                  return setClickedContent(undefined);

                setClickedContent(content);
              }}
            >
              {clickedContent?.idx === content.idx ? (
                <img
                  width={"50px"}
                  src={`https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${content.genre.idx}_icon.svg`}
                />
              ) : (
                <img
                  width={"30px"}
                  src={`https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default-marker-${content.genre.idx}.svg`}
                />
              )}
            </div>
            <div
              style={{
                width: "100px",
                textAlign: "center",
                wordWrap: "break-word",
                whiteSpace: "normal",
                marginTop: "4px",
                fontSize: "14px",
                lineHeight: "14.4px",
                color: "white",
                textShadow:
                  "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222",
                padding: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "12px",
              }}
            >
              {content.title}
            </div>
            {/* <div
              onClick={() => {
                if (clickedContent?.idx === content.idx)
                  return setClickedContent(undefined);

                setClickedContent(content);
              }}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                right: "50%",
                transform: "translate(50%, -50%)",
              }}
            >
              
            </div> */}
          </CustomOverlayMap>
        ))}
      </Map>
    </>
  );
};

export default KakaoMapV2;

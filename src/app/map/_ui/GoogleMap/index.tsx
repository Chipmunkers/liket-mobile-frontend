import { useEffect, useRef, useState } from "react";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";
import { mapStyle } from "./style/mapStyle";
import { Props } from "./types";
import { MapInfo } from "../../_types/types";
import { useGetClusteredContent } from "@/app/map/_hooks/useGetClusteredContent";
import { useGetMapContent } from "@/app/map/_hooks/useGetMapContent";
import {
  LoadScript,
  GoogleMap,
  OverlayView,
  OverlayViewF,
  MarkerF,
  MarkerClustererF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const CustomGoogleMap = ({
  children,
  contentList,
  setContentList,
  clickedContent,
  setClickedContent,
  mapFilter,
  latLng,
  setLatLng,
  setClickedClusteredContents,
}: Props) => {
  const [loadState, setLoadState] = useState(false);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [level, setLevel] = useState(8);
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    bound: {
      top: { x: 0, y: 0 },
      bottom: { x: 0, y: 0 },
    },
    level,
  });

  const [clusteredContentList, setClusteredContentList] = useState<
    ClusteredContentEntity[]
  >([]);

  const { data: clusteredApiResult } = useGetClusteredContent(
    mapInfo,
    mapFilter
  );

  const { data: contentApiResult } = useGetMapContent(mapInfo, mapFilter);

  useEffect(() => {
    if (!googleMap) return;

    googleMap.setCenter({
      lat: latLng.lat,
      lng: latLng.lng,
    });
  }, [latLng, googleMap]);

  useEffect(() => {
    if (!contentApiResult) return;

    const alreadyExistContentIdxList = contentList.map(
      (content) => content.idx
    );

    setContentList([
      ...contentApiResult.contentList.filter(
        (content) => !alreadyExistContentIdxList.includes(content.idx)
      ),
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

  useEffect(() => {
    setClusteredContentList([]);
    setContentList([]);
    setClickedContent(undefined);
    setMapInfo({ ...mapInfo, level });
  }, [level, mapFilter]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  return (
    isLoaded && (
      <GoogleMap
        key={`${loadState}`}
        mapContainerClassName="flex-1"
        zoom={8}
        options={{
          disableDefaultUI: true,
          styles: mapStyle,
          minZoom: 10,
        }}
        onClick={() => {
          setClickedClusteredContents([]);
          setClickedContent(undefined);
        }}
        onDragStart={() => {
          setClickedClusteredContents([]);
        }}
        onLoad={(map) => {
          setGoogleMap(map);
        }}
        onIdle={() => {
          if (!googleMap) return;

          const bounds = googleMap.getBounds();
          const zoomLevel = googleMap.getZoom();

          const ne = bounds?.getNorthEast();
          const sw = bounds?.getSouthWest();

          if (!ne || !sw || !zoomLevel) return;

          if (zoomLevel !== level) {
            setLevel(zoomLevel);
          }

          setMapInfo({
            bound: {
              top: { x: sw.lng(), y: ne.lat() },
              bottom: { x: ne.lng(), y: sw.lat() },
            },
            level: zoomLevel,
          });
        }}
      >
        {clusteredData &&
          clusteredData.map((data, i) => (
            <OverlayViewF
              key={`clustered-contents-${i}`}
              position={{ lat: data.lat, lng: data.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="rounded-full w-[48px] h-[48px] border-[1px] bg-skyblue-01 flex justify-center items-center text-body4 text-white border-skyblue-02 bg-opacity-[80%] absolute translate-x-[-50%] translate-y-[-50%]"
                onClick={() => {
                  if (!googleMap) return;

                  const currentZoom = googleMap.getZoom();

                  if (!currentZoom) return;

                  setLevel(currentZoom + 1);
                  googleMap.setZoom(currentZoom + 1);
                  googleMap.setCenter({
                    lat: data.lat,
                    lng: data.lng,
                  });
                }}
              >
                {data.count}
              </div>
            </OverlayViewF>
          ))}
        {
          <MarkerClustererF
            key={level}
            gridSize={10}
            zoomOnClick={false}
            onClick={(cluster) => {
              setClickedContent(undefined);
              setClickedClusteredContents(
                cluster.getMarkers().map((marker) => (marker as any).customInfo)
              );
            }}
            options={{
              styles: [
                {
                  url: "https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/clustered_marker.svg",
                  width: 40,
                  height: 40,
                  textColor: "white",
                  anchorText: [8, 10],
                  textSize: 12,
                },
              ],
            }}
          >
            {(clusterer) => (
              <>
                {contentList.map((content, i) => (
                  <MarkerF
                    onLoad={(marker) => {
                      (marker as any).customInfo = content;
                    }}
                    clusterer={clusterer}
                    key={content.idx}
                    onClick={() => {
                      setClickedClusteredContents([]);
                      setClickedContent(content);
                    }}
                    position={{
                      lat: content.location.positionY,
                      lng: content.location.positionX,
                    }}
                    title={content.title}
                    icon={{
                      url:
                        clickedContent?.idx === content.idx
                          ? `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${content.genre.idx}_icon.svg`
                          : `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default_marker_${content.genre.idx}_icon.svg`,
                    }}
                  ></MarkerF>
                ))}
              </>
            )}
          </MarkerClustererF>
        }
        {children}
      </GoogleMap>
    )
  );
};

export default CustomGoogleMap;

import { useEffect, useRef, useState } from "react";
import { ClusteredContentEntity } from "@/shared/types/api/map/ClusteredContentEntity";
import { mapStyle } from "./style/mapStyle";
import { Props } from "./types";
import { MapInfo } from "../../_types/types";
import { useGetClusteredContent } from "@/app/map/_hooks/useGetClusteredContent";
import { useGetMapContent } from "@/app/map/_hooks/useGetMapContent";
import { LoadScript, GoogleMap, OverlayView } from "@react-google-maps/api";

const CustomGoogleMap = ({
  children,
  contentList,
  setContentList,
  clickedContent,
  setClickedContent,
  mapFilter,
  latLng,
  setLatLng,
}: Props) => {
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

    // 맵 경계 설정
    const bounds = googleMap.getBounds();
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    const zoomLevel = googleMap.getZoom();

    if (!ne || !sw || !zoomLevel) return;

    setMapInfo({
      bound: {
        top: { x: ne.lng(), y: ne.lat() },
        bottom: { x: sw.lng(), y: sw.lat() },
      },
      level: zoomLevel,
    });
  }, [googleMap, level]);

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

  // // * 지도 초기화
  // useEffect(() => {
  //   if (!ref.current) return;

  //   const initialMap = new window.google.maps.Map(ref.current, {
  //     center: {
  //       lat: latLng.lat,
  //       lng: latLng.lng,
  //     },
  //     zoom: mapInfo.level,
  //     styles: mapStyle,
  //     minZoom: 10,
  //     disableDefaultUI: true,
  //   });

  //   // 맵 클릭 시
  //   initialMap.addListener("click", () => {
  //     setClickedContent(undefined);
  //   });

  //   // Zoom Level 변경 시
  //   initialMap.addListener("zoom_changed", () => {
  //     const currentZoom = initialMap.getZoom();

  //     if (!currentZoom) return;

  //     setLevel(level);
  //   });

  //   // 드래그 종료 시
  //   initialMap.addListener("dragend", () => {
  //     const bounds = initialMap.getBounds();
  //     const ne = bounds?.getNorthEast();
  //     const sw = bounds?.getSouthWest();

  //     const zoomLevel = initialMap.getZoom();

  //     if (!ne || !sw || !zoomLevel) return;

  //     setMapInfo({
  //       bound: {
  //         top: { x: sw.lng(), y: ne.lat() },
  //         bottom: { x: ne.lng(), y: sw.lat() },
  //       },
  //       level: zoomLevel,
  //     });
  //   });

  //   setGoogleMap(initialMap);
  // }, [ref]);

  useEffect(() => {
    setClusteredContentList([]);
    setContentList([]);
    setClickedContent(undefined);
    setMapInfo({ ...mapInfo, level });
  }, [level, mapFilter]);

  // //클러스터 데이터 뿌려주기
  // useEffect(() => {
  //   if (!googleMap || !clusteredData) return;

  //   clusteredData.forEach(({ lat, lng, count, scale }) => {
  //     const marker = new window.google.maps.Marker({
  //       position: { lat, lng },
  //       map: googleMap,
  //       label: {
  //         text: `${count}`,
  //         color: "white",
  //         fontWeight: "bold",
  //         fontSize: "14px",
  //       },
  //       icon: {
  //         path: window.google.maps.SymbolPath.CIRCLE,
  //         fillColor: "skyblue",
  //         fillOpacity: 0.8,
  //         strokeColor: "skyblue",
  //         strokeWeight: 2,
  //         scale: 10 + scale * 3,
  //       },
  //     });

  //     marker.addListener("click", () => {
  //       //setLatLng({ lat, lng });
  //       // TODO: 수정 필요
  //       //setLevel((prev) => prev - 1);
  //     });
  //   });
  // }, [googleMap, clusteredData]);

  // useEffect(() => {
  //   console.log(latLng);
  // }, [latLng]);

  // //컨텐츠 데이터 뿌려주기
  // useEffect(() => {
  //   if (!googleMap || !contentList) return;

  //   contentList.forEach((content) => {
  //     const { idx, genre, title, location } = content;

  //     const marker = new window.google.maps.Marker({
  //       position: { lat: location.positionY, lng: location.positionX },
  //       map: googleMap,
  //       icon:
  //         clickedContent?.idx === idx
  //           ? `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${genre.idx}_icon.svg`
  //           : `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default-marker-${genre.idx}.svg`,
  //     });

  //     const infoWindow = new window.google.maps.InfoWindow({
  //       content: `
  //         <div style="
  //           background-color: rgba(0, 0, 0, 0.6);
  //           color: white;
  //           padding: 4px 8px;
  //           border-radius: 8px;
  //           text-shadow: -1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222;
  //           text-align: center;
  //           white-space: nowrap;
  //         ">
  //           ${title}
  //         </div>
  //       `,
  //     });

  //     marker.addListener("click", () => {
  //       setClickedContent(clickedContent?.idx === idx ? undefined : content);
  //       if (clickedContent?.idx !== idx) {
  //         infoWindow.open(googleMap, marker);
  //       }
  //     });

  //     if (clickedContent?.idx !== idx) {
  //       infoWindow.close();
  //     }
  //   });
  // }, [googleMap, contentList, clickedContent]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
    >
      <GoogleMap
        mapContainerClassName="flex-1"
        zoom={8}
        options={{
          disableDefaultUI: true,
          styles: mapStyle,
          minZoom: 10,
        }}
        onClick={() => {
          setClickedContent(undefined);
        }}
        onDragEnd={() => {
          if (!googleMap) return;

          const bounds = googleMap.getBounds();
          const zoomLevel = googleMap.getZoom();

          const ne = bounds?.getNorthEast();
          const sw = bounds?.getSouthWest();

          if (!ne || !sw || !zoomLevel) return;

          setMapInfo({
            bound: {
              top: { x: sw.lng(), y: ne.lat() },
              bottom: { x: ne.lng(), y: sw.lat() },
            },
            level: zoomLevel,
          });
        }}
        onZoomChanged={() => {
          if (!googleMap) return;

          const bounds = googleMap.getBounds();
          const zoomLevel = googleMap.getZoom();

          const ne = bounds?.getNorthEast();
          const sw = bounds?.getSouthWest();

          if (!ne || !sw || !zoomLevel) return;

          setLevel(zoomLevel);
          setMapInfo({
            bound: {
              top: { x: sw.lng(), y: ne.lat() },
              bottom: { x: ne.lng(), y: sw.lat() },
            },
            level: zoomLevel,
          });
        }}
        onLoad={(map) => {
          setGoogleMap(map);

          map.setCenter({
            lat: latLng.lat,
            lng: latLng.lng,
          });

          const bounds = map.getBounds();
          const zoomLevel = map.getZoom();

          const ne = bounds?.getNorthEast();
          const sw = bounds?.getSouthWest();

          if (!ne || !sw || !zoomLevel) return;

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
            <OverlayView
              key={`clustered-contents-${i}`}
              position={{ lat: data.lat, lng: data.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="rounded-full w-[48px] h-[48px] border-[1px] bg-skyblue-01 flex justify-center items-center text-body4 text-white border-skyblue-02 bg-opacity-[80%] absolute translate-x-[-50%] translate-y-[-50%]">
                {data.count}
              </div>
            </OverlayView>
          ))}
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomGoogleMap;

"use client";

import { ReactNode, useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";

interface KaKaoMapProps {
  children?: ReactNode;
}

declare const window: {
  kakao: any;
} & Window;

const { lng, lat } = {
  lng: 127.0495556,
  lat: 37.514575,
};

const KaKaoMap = ({ children }: KaKaoMapProps) => {
  const [bound, setBound] = useState<{
    ha: number;
    oa: number;
    pa: number;
    qa: number;
  }>();
  const [level, setLevel] = useState(4);
  const [map, setMap] = useState();

  const [clusteredContentList, setClusteredContentList] = useState<any[]>([]);
  const [contentList, setContentList] = useState<any[]>([]);
  const [markerList, setMarkerList] = useState<any[]>([]);
  const [clusteredOverlayList, setClusteredOverlayList] = useState<any[]>([]);

  const { data: clusteredMap } = useQuery({
    queryKey: ["clustered-map", bound, level],
    queryFn: async () => {
      if (level <= 5) return null;

      const { data } = await axiosInstance.get(
        `/apis/map/culture-content/clustered/all?` +
          `top-x=${bound?.ha}&` +
          `top-y=${bound?.pa}&` +
          `bottom-x=${bound?.oa}&` +
          `bottom-y=${bound?.qa}&` +
          `level=${level}`
      );
      return { data };
    },
    enabled: () => {
      return !!bound && !!level;
    },
  });

  const { data: contentData } = useQuery({
    queryKey: ["map-contents", bound, level],
    queryFn: async () => {
      if (level > 5) return null;

      const { data } = await axiosInstance.get(
        `/apis/map/culture-content/all?` +
          `top-x=${bound?.ha}&` +
          `top-y=${bound?.pa}&` +
          `bottom-x=${bound?.oa}&` +
          `bottom-y=${bound?.qa}&`
      );
      return { data };
    },
    enabled: () => {
      return !!bound && !!level;
    },
  });

  // * Level이 변경될 경우 클러스러팅 오버레이 삭제하기
  useEffect(() => {
    // * 클러스터링 오버레이 삭제
    clusteredOverlayList.forEach((elem) => elem.overlay.setMap(null));
    setClusteredContentList([]);
    setClusteredOverlayList([]);
  }, [level]);

  // * 클러스터링 데이터를 받아온 후 클러스터링 데이터 정제
  // *  1. 범위에서 벗어난 마커 데이터 삭제
  // *  2. 범위에서 벗어난 클러스터링 데이터 삭제
  useEffect(() => {
    if (!clusteredMap || !bound) return;

    // * 마커 삭제하기
    if (markerList.length) {
      markerList.forEach((elem) => elem.marker.setMap(null));
      setMarkerList([]);
      setContentList([]);
    }

    const queryClusteredList: any[] = clusteredMap.data.clusteredContentList;

    // * 클러스터링 데이터 갱신하기
    const alreadyExistClusteredCodes = clusteredContentList.map(
      (data) => data.code
    );
    setClusteredContentList([
      // * 범위에 벗어난 클러스러링 데이터 삭제하기
      ...clusteredContentList.filter(
        (data) =>
          data.lng <= bound.oa &&
          data.lng >= bound.ha &&
          data.lat <= bound.ha &&
          data.lat >= bound.qa
      ),
      ...queryClusteredList.filter(
        (data) => !alreadyExistClusteredCodes.includes(data.code)
      ),
    ]);
  }, [clusteredMap]);

  // * 클러스터링 데이터가 정제된 후
  useEffect(() => {
    if (!clusteredContentList || !bound) return;

    const alreadyExistCodeList = clusteredOverlayList.map((elem) => elem.code);

    let addedOverlays: any[] = [];
    for (const clusteredContent of clusteredContentList) {
      // * 이미 오버레이로 존재하는 경우 추가하지 않기
      if (alreadyExistCodeList.includes(clusteredContent.code)) continue;

      const { lng, lat, count } = clusteredContent;

      // * 오버레이 생성
      const content = `
            <div style="
                border: 2px solid #00C2FF; 
                background-color: rgb(0,194,255, 0.5);
                width: 60px; height: 60px; 
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
            " />
                <span>${count}</span>
            <div>`;
      const position = new window.kakao.maps.LatLng(lat, lng);
      const overlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });
      overlay.setMap(map);

      addedOverlays.push({
        code: clusteredContent.code,
        overlay,
      });
    }
    setClusteredOverlayList([...addedOverlays, ...clusteredOverlayList]);
  }, [clusteredContentList]);

  // * 컨텐츠 데이터 받아온 후 컨텐츠 데이터 정제
  // *  1. 범위에서 벗어난 마커 데이터 삭제
  // *  2. 범위에서 벗어난 컨텐츠 데이터 삭제
  useEffect(() => {
    if (!contentData || !bound) return;

    const queryContentList: any[] = contentData.data.contentList;

    // * 범위 벗어난 마커 삭제하기
    markerList
      .filter(
        (elem) =>
          !(
            elem.marker.getPosition().Ma >= bound.qa &&
            elem.marker.getPosition().Ma <= bound.pa &&
            elem.marker.getPosition().La >= bound.ha &&
            elem.marker.getPosition().La <= bound.oa
          )
      )
      .forEach((elem) => {
        elem.marker.setMap(null);
        elem.overlay.setMap(null);
      });

    // * 범위에 들어온 마커로만 다시 마커 설정하기
    setMarkerList(
      markerList.filter(
        (elem) =>
          elem.marker.getPosition().Ma >= bound.qa &&
          elem.marker.getPosition().Ma <= bound.pa &&
          elem.marker.getPosition().La >= bound.ha &&
          elem.marker.getPosition().La <= bound.oa
      )
    );

    // * 보유하고 있는 컨텐츠 목록 갱신하기
    const idxList = contentList.map((content) => content.idx);
    setContentList([
      // * 범위에 벗어난 컨텐츠 삭제하기
      ...contentList.filter(
        (content) =>
          content.location.positionX <= bound.oa &&
          content.location.positionX >= bound.ha &&
          content.location.positionY <= bound.ha &&
          content.location.positionY >= bound.qa
      ),
      ...queryContentList.filter((content) => !idxList.includes(content.idx)),
    ]);
  }, [contentData]);

  // * 컨텐츠 데이터 정제한 후
  // *  1. 마커 데이터 뿌려주기
  useEffect(() => {
    const markerIdxs = markerList.map((marker) => marker.idx);

    let addedMarkers: any[] = [];
    for (const content of contentList) {
      // * 이미 마커로 존재하는 경우 마커로 추가하지 않기
      if (markerIdxs.includes(content.idx)) continue;

      const markerLayout = `
            <div style="
                position: absolute;
                width: 80px; 
                text-align: center; 
                word-wrap: break-word; 
                white-space: normal; 
                top: 8px;
                font-size: 12px; 
                line-height: 14.4px; 
                font-weight: 700; 
                color: black; 
                transform: translateX(-50%);
                text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
            ">${content.title}</div>`;

      const position = new window.kakao.maps.LatLng(
        content.location.positionY,
        content.location.positionX
      );

      const imgUrl =
        "https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/marker_default_1_icon.svg";
      const clickMarkerImageUrl = `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${content.genre.idx}_icon.svg`;

      const imageSize = new window.kakao.maps.Size(40, 40);
      const markerImage = new window.kakao.maps.MarkerImage(imgUrl, imageSize);
      const marker = new window.kakao.maps.Marker({
        map,
        position,
        image: markerImage,
      });

      const overlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerLayout,
      });
      marker.setMap(map);
      overlay.setMap(map);

      // 클릭 시 마커 모양 변경
      window.kakao.maps.event.addListener(marker, "click", (e: any) => {
        const markerImage = new window.kakao.maps.MarkerImage(
          clickMarkerImageUrl,
          new window.kakao.maps.Size(60, 60)
        );
        marker.setImage(markerImage);
      });

      addedMarkers.push({
        idx: content.idx,
        marker,
        overlay,
      });
    }
    setMarkerList([...markerList, ...addedMarkers]);
  }, [contentList]);

  // * 제일 처음 맵 초기화
  useEffect(() => {
    const $mapScript = document.createElement("script");
    $mapScript.async = false;
    $mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&autoload=false`;
    document.head.appendChild($mapScript);

    const onLoadMap = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level,
        };

        const map = new window.kakao.maps.Map(container, options);

        setMap(map);
        setBound(map.getBounds());
        // TODO: 지도 이동과 관련한 상세 로직 구현
        window.kakao.maps.event.addListener(
          map,
          "dragend",
          async (data: any) => {
            const bound = map.getBounds();

            setBound(bound);
          }
        );

        window.kakao.maps.event.addListener(
          map,
          "zoom_changed",
          (data: any) => {
            setLevel(map.getLevel());
          }
        );
      });
    };

    $mapScript.addEventListener("load", onLoadMap);
  }, []);

  return (
    <>
    </>
    // <div id="map" className="grow relative w-[100%]">
    //   {children}
    // </div>
  );
};

export default KaKaoMap;

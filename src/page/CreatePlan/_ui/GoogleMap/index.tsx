"use client";

import { SIDO_LIST } from "@/shared/consts/region/sido";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import sampleData from "./sample-data.json";

export const PlanGoogleMap = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  const content1 = {
    idx: 1532,
    title: "오백에 삼십 [JTN 아트홀]",
    thumbnail: "/culture-content/d26c9134-cfe0-4589-8b01-130b847a3c1c",
    genre: { idx: 3, name: "연극" },
    style: [
      { idx: 1, name: "혼자" },
      { idx: 22, name: "예술적인" },
    ],
    age: { idx: 1, name: "전체" },
    location: {
      region1Depth: "서울",
      region2Depth: "종로구",
      detailAddress: "대학로 JTN아트홀",
      address: "서울 종로구 이화동 139",
      positionX: 127.00393230387,
      positionY: 37.5766441213197,
      hCode: "1111064000",
      bCode: "1111016500",
    },
    startDate: "2024-02-23T15:00:00.000Z",
    endDate: "2025-02-28T14:59:59.000Z",
    viewCount: 0,
    openTime:
      "월요일(14:30), 화요일 ~ 목요일(14:30,17:00), 금요일(14:30,17:00,19:30), 토요일(12:00,14:30,17:00,19:10), 일요일(12:00,14:30,17:00), HOL(12:00,14:30,17:00)",
    description: null,
    websiteLink: "https://booking.naver.com/booking/12/bizes/180778",
    imgList: [
      "/culture-content/d26c9134-cfe0-4589-8b01-130b847a3c1c",
      "/culture-content/028c98a0-d0ed-4c22-aef9-b14e85b14f07",
      "/culture-content/f8514c88-787c-47a8-b8af-23d11f24996f",
    ],
    isFee: true,
    isReservation: true,
    isPet: false,
    isParking: false,
    likeCount: 0,
    likeState: false,
    reviewCount: 0,
    createdAt: "2025-01-10T15:00:29.756Z",
    acceptedAt: "2025-01-10T15:00:29.754Z",
    avgStarRating: 0,
  };

  const content2 = {
    idx: 1175,
    title: "맥주 한잔 하실래요? 시즌5",
    thumbnail: "/culture-content/9ae09e5f-3355-40f6-89d5-3e71f2e2336c",
    genre: { idx: 3, name: "연극" },
    style: [
      { idx: 1, name: "혼자" },
      { idx: 22, name: "예술적인" },
    ],
    age: { idx: 1, name: "전체" },
    location: {
      region1Depth: "서울",
      region2Depth: "중구",
      detailAddress: "",
      address: "서울 중구 광희동1가 39",
      positionX: 127.003978493774,
      positionY: 37.5660432803982,
      hCode: "1114059000",
      bCode: "1114014500",
    },
    startDate: "2024-08-29T15:00:00.000Z",
    endDate: "2025-01-18T14:59:59.000Z",
    viewCount: 0,
    openTime:
      "목요일 ~ 금요일(20:00), 토요일 ~ 일요일(18:00,19:00), HOL(18:00,19:00)",
    description: null,
    websiteLink: "https://booking.naver.com/booking/5/bizes/1118945",
    imgList: [
      "/culture-content/9ae09e5f-3355-40f6-89d5-3e71f2e2336c",
      "/culture-content/8bd81995-5599-4fd1-8d8a-a9f11f74799a",
    ],
    isFee: true,
    isReservation: true,
    isPet: false,
    isParking: false,
    likeCount: 0,
    likeState: false,
    reviewCount: 0,
    createdAt: "2024-12-30T08:13:15.077Z",
    acceptedAt: "2024-12-30T08:13:15.075Z",
    avgStarRating: 0,
  };

  useEffect(() => {
    if (!googleMap) return;

    googleMap.setCenter({
      lat: Number(SIDO_LIST[0].lat),
      lng: Number(SIDO_LIST[0].lng),
    });
  }, [googleMap]);

  useEffect(() => {
    const extractedPath: google.maps.LatLngLiteral[] = [];

    sampleData.features.forEach((feature: any) => {
      if (feature.geometry.type === "LineString") {
        feature.geometry.coordinates.forEach(([lng, lat]: [number, number]) => {
          extractedPath.push({ lat, lng }); // [위도, 경도]로 변환
        });
      }
    });

    setPath(extractedPath);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        zoom={8}
        mapContainerClassName="w-full h-full"
        options={{
          disableDefaultUI: true,
          minZoom: 10,
          keyboardShortcuts: false,
          gestureHandling: "greedy",
        }}
        onLoad={(map) => {
          setGoogleMap(map);
        }}
      >
        {path.length > 0 && (
          <>
            <Polyline
              path={path}
              options={{
                strokeColor: "#00C2FF",
                strokeWeight: 6,
              }}
            />
            {/* 점선 */}
            <Polyline
              path={path}
              options={{
                strokeColor: "white", // 원하는 점선 색상
                strokeWeight: 4,
                strokeOpacity: 0, // 기본 선 숨김
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1", // 점선 패턴
                      strokeOpacity: 1,
                      scale: 2, // 점 크기
                    },
                    offset: "0",
                    repeat: "10px", // 점선 간격
                  },
                ],
              }}
            />
          </>
        )}
        <>
          <MarkerF
            position={{
              lat: content1.location.positionY,
              lng: content1.location.positionX,
            }}
            title={content1.title}
            icon={{
              url: "/map-marker/empty-marker.svg",
            }}
            label={{
              color: "white",
              text: "도착",
              className: "mb-[6px] text-caption",
            }}
          />
          <OverlayViewF
            position={{
              lat: content1.location.positionY,
              lng: content1.location.positionX,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <span
              className="absolute 
                        w-[100px] max-w-[100px] 
                        text-center break-words text-body4 text-white
                        flex justify-center items-center
                        bg-black bg-opacity-[60%] 
                        py-[1px] px-[8px]
                        translate-x-[-50%] translate-y-[-50%] mt-[20px]
                        rounded-[8px]"
              style={{
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
              }}
            >
              {content1.title}
            </span>
          </OverlayViewF>
        </>
        <>
          <MarkerF
            position={{
              lat: content2.location.positionY,
              lng: content2.location.positionX,
            }}
            title={content2.title}
            icon={{
              url: "/map-marker/empty-marker.svg",
            }}
            label={{
              color: "white",
              text: "출발",
              className: "mb-[6px] text-caption",
            }}
          />
          <OverlayViewF
            position={{
              lat: content2.location.positionY,
              lng: content2.location.positionX,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <span
              className="absolute 
                        w-[100px] max-w-[100px] 
                        text-center break-words text-body4 text-white
                        flex justify-center items-center
                        bg-black bg-opacity-[60%] 
                        py-[1px] px-[8px]
                        translate-x-[-50%] translate-y-[-50%] mt-[20px]
                        rounded-[8px]"
              style={{
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
              }}
            >
              {content2.title}
            </span>
          </OverlayViewF>
        </>
      </GoogleMap>
    )
  );
};

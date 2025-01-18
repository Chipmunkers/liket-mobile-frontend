"use client";

import { SIDO_LIST } from "@/shared/consts/region/sido";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Props } from "./type";
import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Route, RouteSegment } from "@/page/CreatePlan/type";
import { usePolyline } from "@/page/CreatePlan/_ui/GoogleMap/hooks/usePolyline";
import { useMapCenter } from "@/page/CreatePlan/_ui/GoogleMap/hooks/useMapCenter";

export const PlanGoogleMap = ({
  placeList,
  setRouteList,
  routeList,
  routeSegmentList,
  googleMap,
  setGoogleMap,
}: Props) => {
  const { extractTitleOrPlace, extractCoordinate, getInputTitle } =
    useGetUtils();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  // 장소 선택할 때 지도 중앙 정렬 시켜주는 훅
  useMapCenter({ googleMap, placeList });

  // 경로 그리는 훅
  usePolyline({
    googleMap,
    routeList,
  });

  // 초기 지도 서울로 세팅하는 훅
  useEffect(() => {
    if (!googleMap) return;

    googleMap.setCenter({
      lat: Number(SIDO_LIST[0].lat),
      lng: Number(SIDO_LIST[0].lng),
    });
  }, [googleMap]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={10}
          mapContainerClassName="w-full h-full"
          options={{
            disableDefaultUI: true,
            minZoom: 7,
            keyboardShortcuts: false,
            gestureHandling: "greedy",
          }}
          onLoad={(map) => {
            setGoogleMap(map);
          }}
        >
          {placeList
            .filter((place) => !!place)
            .map((place, i) => (
              <div key={`marker-${i}`}>
                <MarkerF
                  position={{
                    lat: extractCoordinate(place).y,
                    lng: extractCoordinate(place).x,
                  }}
                  title={extractTitleOrPlace(place)}
                  icon={{
                    url: "/map-marker/empty-marker.svg",
                  }}
                  label={{
                    color: "white",
                    text: getInputTitle(i, placeList.length),
                    className: "mb-[6px] text-caption",
                  }}
                />
                <OverlayViewF
                  position={{
                    lat: extractCoordinate(place).y,
                    lng: extractCoordinate(place).x,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="absolute w-[100px] bg-black bg-opacity-[60%] translate-x-[-50%] translate-y-[-50%] rounded-[8px] mt-[20px]">
                    <span
                      className="relative text-body4 text-white py-[1px] px-[8px] line-clamp-2 text-center"
                      style={{
                        textShadow:
                          "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                      }}
                    >
                      {extractTitleOrPlace(place)}
                    </span>
                  </div>
                </OverlayViewF>
              </div>
            ))}
        </GoogleMap>
      )}
    </>
  );
};

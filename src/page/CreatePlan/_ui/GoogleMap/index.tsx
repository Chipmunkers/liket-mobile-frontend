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
                    {extractTitleOrPlace(place)}
                  </span>
                </OverlayViewF>
              </div>
            ))}
        </GoogleMap>
      )}
    </>
  );
};

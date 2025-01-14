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
import { usePolyline } from "@/page/CreatePlan/_ui/GoogleMap/hooks/usePolyline";
import { useMapCenter } from "@/page/CreatePlan/_ui/GoogleMap/hooks/useMapCenter";

export const PlanGoogleMap = ({
  origin,
  destination,
  stopoverList,
  pedestrianRoute,
}: Props) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const { extractTitleOrPlace, extractCoordinate } = useGetUtils();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  // 경로 그리는 훅
  usePolyline({
    googleMap,
    origin,
    stopoverList,
    destination,
    pedestrianRoute,
  });

  // 초기 지도 서울로 세팅하는 훅
  useEffect(() => {
    if (!googleMap) return;

    googleMap.setCenter({
      lat: Number(SIDO_LIST[0].lat),
      lng: Number(SIDO_LIST[0].lng),
    });
  }, [googleMap]);

  // 출발지 도착지 변경될 때 중앙 맞추는 훅
  useMapCenter({
    googleMap,
    origin,
    stopoverList,
    destination,
  });

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
          {origin && (
            <>
              <MarkerF
                position={{
                  lat: extractCoordinate(origin).y,
                  lng: extractCoordinate(origin).x,
                }}
                title={extractTitleOrPlace(origin)}
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
                  lat: extractCoordinate(origin).y,
                  lng: extractCoordinate(origin).x,
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
                  {extractTitleOrPlace(origin)}
                </span>
              </OverlayViewF>
            </>
          )}
          {destination && (
            <>
              <MarkerF
                position={{
                  lat: extractCoordinate(destination).y,
                  lng: extractCoordinate(destination).x,
                }}
                title={extractTitleOrPlace(destination)}
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
                  lat: extractCoordinate(destination).y,
                  lng: extractCoordinate(destination).x,
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
                  {extractTitleOrPlace(destination)}
                </span>
              </OverlayViewF>
            </>
          )}
        </GoogleMap>
      )}
    </>
  );
};

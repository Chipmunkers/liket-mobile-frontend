"use client";

import { useRouter } from "next/navigation";
import { Props } from "./tyeps";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { mapStyle } from "@/app/map/_ui/GoogleMap/style/mapStyle";

const DetailGoogleMap = ({ content }: Props) => {
  const router = useRouter();

  // TODO: shared로 분리 필요
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  if (!content) {
    stackRouterPush(router, {
      path: "/error/wrong-access",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });

    return;
  }

  return (
    <div className="flex flex-1 bg-grey-02">
      {isLoaded && (
        <GoogleMap
          mapContainerClassName="flex-1"
          zoom={14}
          key={`${isLoaded}`}
          options={{
            disableDefaultUI: true,
            minZoom: 10,
            // TODO: shared 로 분리 필요
            styles: mapStyle,
            keyboardShortcuts: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            map.setCenter({
              lat: content.location.positionY,
              lng: content.location.positionX,
            });
          }}
        >
          <MarkerF
            key={content.idx}
            position={{
              lat: content.location.positionY,
              lng: content.location.positionX,
            }}
            title={content.title}
            icon={{
              url: `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${content.genre.idx}_icon.svg`,
            }}
          />
          <OverlayViewF
            position={{
              lat: content.location.positionY,
              lng: content.location.positionX,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="
                translate-x-[-50%] 
                translate-y-[4px] 
                bg-grey-black/60 
                bg-opacity-60
                rounded-[8px] 
                py-[1px] 
                text-white 
                px-[8px] 
                max-w-[100px] 
                text-center 
                text-caption
                stroke-black
                "
              style={{
                textShadow:
                  "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {content.title}
            </div>
          </OverlayViewF>
        </GoogleMap>
      )}
    </div>
  );
};

export default DetailGoogleMap;

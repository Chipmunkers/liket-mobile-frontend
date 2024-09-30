"use client";

import { useRouter } from "next/navigation";
import { Props } from "./tyeps";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
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
        </GoogleMap>
      )}
    </div>
  );
};

export default DetailGoogleMap;

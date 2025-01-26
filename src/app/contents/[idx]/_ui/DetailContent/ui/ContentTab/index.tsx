import RightArrowIcon from "@/icons/right-arrow.svg";
import { Props } from "./types";
import Divider from "@/shared/ui/Divider";
import { colors } from "@/shared/style/color";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { mapStyle } from "@/app/map/_ui/GoogleMap/style/mapStyle";
import { ButtonBase } from "@mui/material";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import MapExpandIcon from "@/shared/icon/content/MapExpandIcon.svg";
import Image from "next/image";
import { ContentFooter } from "@/app/contents/[idx]/_ui/DetailContent/ui/ContentFooter";

const ContentTab = (props: Props) => {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  });

  const { content } = props;

  return (
    <>
      <div className="py-[16px] px-[24px] whitespace-pre-wrap w-[100%] text-center text-body3">
        {content.description}
        <div className="w-full">
          {content.imgList?.map((src, index) => {
            if (index === 0) {
              return <></>;
            }

            return (
              <Image
                key={src}
                src={process.env.NEXT_PUBLIC_IMAGE_SERVER + src}
                alt="게시글 관련 이미지"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            );
          })}
        </div>
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] py-[24px] flex-col relative">
        <div className="text-h2">위치</div>
        <div className="text-grey-04 text-body5 mt-[7px] mb-[4px]">
          {content.location.region1Depth} {content.location.region2Depth}{" "}
          {content.location.address} {content.location?.detailAddress || ""}
        </div>
        <div className="h-[171px] w-[100%] bg-grey-02 flex relative cursor-pointer">
          <div className="absolute right-[9px] top-[8px] z-[1] cursor-pointer">
            <MapExpandIcon />
          </div>
          {isLoaded && (
            <GoogleMap
              mapContainerClassName="flex-1"
              zoom={14}
              key={`${isLoaded}`}
              options={{
                minZoom: 10,
                styles: mapStyle,
                keyboardShortcuts: false,
                gestureHandling: "none",
                fullscreenControl: false,
              }}
              onClick={() => {
                stackRouterPush(router, {
                  path: `/content-map/${content.idx}`,
                  screen: WEBVIEW_SCREEN.CONTENT_MAP_DETAIL,
                });
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
        <div className="flex justify-end mt-[10px]">
          <ButtonBase
            disableRipple
            className=" text-button4 text-skyblue-03"
            onClick={() => {
              customToast("열심히 준비중입니다!");
            }}
          >
            구글맵에서 길찾기
            <RightArrowIcon fill={colors["skyblue"]["03"]} />
          </ButtonBase>
        </div>
      </div>
      <Divider width="100%" height="8px" />
      <ContentFooter />
    </>
  );
};

export default ContentTab;

import RightArrowIcon from "@/icons/right-arrow.svg";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { Props } from "./types";
import Divider from "@/shared/ui/Divider";
import { colors } from "@/shared/style/color";

const ContentTab = (props: Props) => {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    retries: 2,
    libraries: ["services"],
  });

  const {
    content: { description, location, idx, genre },
  } = props;

  return (
    <>
      <div className="py-[16px] px-[24px] whitespace-pre-wrap w-[100%] text-center text-body3">
        {description}
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] py-[24px] flex-col relative">
        <div className="text-h2">위치</div>
        <div className="text-grey-04 text-body5 mt-[7px] mb-[4px]">
          {location.region1Depth} {location.region2Depth} {location.address}{" "}
          {location?.detailAddress || ""}
        </div>
        <div className="h-[171px] w-[100%] bg-grey-02 flex">
          <Map
            className="w-[100%] h-[100%]"
            center={{
              lng: location.positionX,
              lat: location.positionY,
            }}
            isPanto={false}
            level={4}
          >
            <CustomOverlayMap
              position={{
                lng: location.positionX,
                lat: location.positionY,
              }}
              key={idx}
            >
              <div className="flex items-end justify-center h-[50px] select-none cursor-pointer">
                <img
                  className="w-[40px]"
                  src={`https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${genre.idx}_icon.svg`}
                />
              </div>
              <div
                className="w-[120px] mt-[4px] text-base text-center text-wrap whitespace-nowrap leading-[14.4px] text-white p-[8px] rounded-[16px]"
                style={{
                  textShadow:
                    "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222",
                }}
              ></div>
            </CustomOverlayMap>
          </Map>
        </div>
        <button className="center absolute right-[24px] bottom-0 text-button4 text-skyblue-03">
          카카오맵에서 길찾기
          <RightArrowIcon fill={colors["skyblue"]["03"]} />
        </button>
      </div>
    </>
  );
};

export default ContentTab;

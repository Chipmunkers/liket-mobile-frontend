"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "@/icons/filter.svg";
import { ButtonBase } from "@mui/material";
import BottomTab from "@/widgets/common/BottomTab";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import Chip from "@/shared/ui/Chip";
import { classNames } from "@/shared/helpers/classNames";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import useCheckModalOpenForWebview from "./_hooks/onMessageWebview";
import ContentBottomSheet from "./_ui/ContentBottomSheet";
import { MapFilter, MapInfo, SelectLocation } from "./_types/types";
import FilterDrawer from "./_ui/FilterDrawer";
import LocationDrawer from "./_ui/LocationDrawer";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { useGetMapContent } from "./_hooks/useGetMapContent";
import useSupercluster from "use-supercluster";
import { SIDO_LIST } from "@/shared/consts/region/sido";
import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { BottomSheetRef } from "react-spring-bottom-sheet";
import { FixedSizeList } from "react-window";
import CustomGoogleMap from "./_ui/CustomGoogleMap";
import useScreenHeight from "@/shared/hooks/useScreenHeight";
import useLocation from "@/shared/hooks/useGetMyLocation";
import MyLocation from "@/shared/icon/map/myLocation.svg";

const CIRCLE_CLUSTER_LEVEL = {
  circleZoomLevel: 14,
  circleClusteringRadius: 100,
  markerClusteringRadius: 100,
};

export default function MapPage() {
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const { lat, lng, permission, canAskAgain } = useLocation();

  const handleClickMyLocation = () => {
    if (window?.isWebview && permission === "undetermined" && canAskAgain) {
      // 아직 권한 요청을 한 번도 안 했거나, 다시 물어볼 수 있는 상태
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQUEST_PERMISSION_AGAIN" })
      );
    } else if (window?.isWebview && permission === "denied") {
      // 권한 요청이 거절된 상태
      if (canAskAgain) {
        // 권한 요청은 거절됐으나 다시 요청이 가능한 상태
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "REQUEST_PERMISSION_AGAIN" })
        );
      } else {
        // 권한 요청이 아얘 불가능한 상태
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "OPEN_SETTINGS" })
        );
      }
    } else if (permission === "granted") {
      if (lat && lng) {
        googleMapRef.current?.setCenter({ lat, lng });
      }
    }
  };

  const searchParams = useSearchParams();
  const sheetRef = useRef<BottomSheetRef>(null);
  const listRef = useRef<FixedSizeList | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { safeArea } = useGetSafeArea();
  const { innerHeight } = useScreenHeight();

  const isTownSelectionModalOpen = searchParams.get("isTownSelectionModalOpen");
  const isFilterModalOpen = searchParams.get("isFilterModalOpen");

  const [selectedMarkerId, setSelectedMarkerId] = useState<
    number | undefined
  >();

  // * 필터링 선택
  const [selectedGenre, setSelectedGenre] = useState<GenreEntity>();
  const [selectedAge, setSelectedAge] = useState<AgeEntity>();
  const [selectedStyles, setSelectedStyles] = useState<StyleEntity[]>([]);

  // * 최종적으로 필터링 목록
  const [mapFilter, setMapFilter] = useState<MapFilter>({
    genre: undefined,
    age: undefined,
    styles: [],
  });

  // * 지역 선택
  const [selectLocation, setSelectLocation] = useState<SelectLocation>({
    sido: SIDO_LIST[0],
    sigungu: null,
  });

  const isMapFilterApplied = !!(
    mapFilter.genre ||
    mapFilter.age ||
    mapFilter.styles.length
  );

  const [clickedMarkerContents, setClickedMarkerContents] = useState<
    MapContentEntity[]
  >([]);

  // * 현재 보고 있는 위치
  const [latLng, setLatLng] = useState<{ lng: number; lat: number }>({
    lng: Number(selectLocation.sigungu?.lng || selectLocation.sido.lng),
    lat: Number(selectLocation.sigungu?.lat || selectLocation.sido.lat),
  });

  const [mapInfo, setMapInfo] = useState<MapInfo>({
    bound: {
      top: { x: 0, y: 0 },
      bottom: { x: 0, y: 0 },
    },
    zoomLevel: 8,
  });

  const { data: contentApiResult } = useGetMapContent(mapInfo, mapFilter);

  const { clusters, supercluster } = useSupercluster({
    points:
      contentApiResult?.contentList.map((contentItem) => ({
        type: "Feature",
        properties: {
          cluster: false,
          ...contentItem,
        },
        geometry: {
          type: "Point",
          coordinates: [
            contentItem.location.positionX,
            contentItem.location.positionY,
          ],
        },
      })) || [],
    bounds: [
      mapInfo.bound.top.x,
      mapInfo.bound.bottom.y,
      mapInfo.bound.bottom.y,
      mapInfo.bound.top.y,
    ],
    zoom: mapInfo.zoomLevel,
    options: {
      maxZoom: 23,
      radius:
        mapInfo.zoomLevel > CIRCLE_CLUSTER_LEVEL.circleZoomLevel
          ? CIRCLE_CLUSTER_LEVEL.markerClusteringRadius
          : CIRCLE_CLUSTER_LEVEL.circleClusteringRadius,
    },
  });

  const handleClickMarkerCluster = (id: number) => {
    let res = null;

    try {
      res = supercluster
        ?.getLeaves(id, Infinity)
        .map(({ properties }) => properties);
    } catch (error) {
      res = clusters
        .filter((clusterItem) => clusterItem.properties?.idx === id)
        .map(({ properties }) => properties);
    }

    if (res) {
      setClickedMarkerContents([...res] as MapContentEntity[]);
    }

    setSelectedMarkerId(id);
    sheetRef.current?.snapTo(({ maxHeight }) => maxHeight / 2);
    listRef.current?.scrollTo(0);
  };

  useCheckModalOpenForWebview(isTownSelectionModalOpen, isFilterModalOpen);

  const bottomSheetContents =
    (clickedMarkerContents.length !== 0
      ? clickedMarkerContents
      : contentApiResult?.contentList) || [];

  const handleClickGoogleMap = () => {
    listRef.current?.scrollTo(0);
    setClickedMarkerContents([]);
  };

  return (
    <>
      <Header>
        <HeaderLeft
          townName={
            selectLocation.sigungu
              ? selectLocation.sido.name + " " + selectLocation.sigungu.name
              : selectLocation.sido.name
          }
          onClickTownSelection={() => {
            router.replace(`${pathname}?isTownSelectionModalOpen=true`);
          }}
        />
        <HeaderRight option={{ search: true, like: true }} />
      </Header>
      <main
        className="relative"
        style={{
          height: `${innerHeight - 48}px`,
          marginBottom: 48 + safeArea.bottom + "px",
        }}
      >
        <CustomGoogleMap
          googleMapRef={googleMapRef}
          selectedMarkerId={selectedMarkerId}
          markerClusteredContents={clusters}
          userPosition={{
            lat,
            lng,
          }}
          latLng={latLng}
          mapInfo={mapInfo}
          setMapInfo={setMapInfo}
          onClickMarkerCluster={handleClickMarkerCluster}
          onClickGoogleMap={handleClickGoogleMap}
        />
        <div className="absolute z-[2] mt-[16px] ml-[24px] w-100 flex items-center">
          {/* 필터링 아이콘 */}
          <ButtonBase
            className={classNames(
              "rounded-full w-[36px] h-[36px] shadow-[0_0_8px_0_rgba(0,0,0,0.16)] icon-button",
              isMapFilterApplied ? "bg-skyblue-01" : "bg-white"
            )}
            onClick={() => router.replace(`${pathname}?isFilterModalOpen=true`)}
            disableRipple={true}
          >
            <Filter
              className={!isMapFilterApplied ? "fill-grey-black" : "fill-white"}
              fill="white"
            />
          </ButtonBase>

          {/* 필터링 칩 */}
          {!!(mapFilter.genre || mapFilter.age || mapFilter.styles.length) && (
            <div className="flex items-center">
              {!!mapFilter.genre && (
                <div className="ml-[8px]">
                  <Chip isSelected={true}>{mapFilter.genre.name}</Chip>
                </div>
              )}
              {!!mapFilter.age && (
                <div className="ml-[8px]">
                  <Chip isSelected={true}>{mapFilter.age.name}</Chip>
                </div>
              )}
              {mapFilter.styles.map(({ name }) => (
                <div className="ml-[8px]" key={name}>
                  <Chip isSelected={true}>{name}</Chip>
                </div>
              ))}
            </div>
          )}
        </div>
        <ButtonBase
          className={classNames(
            "absolute  mt-[16px] mr-[16px] right-0 w-[36px] h-[36px] shadow-[0_0_8px_0_rgba(0,0,0,0.16)] icon-button rounded-lg",
            isMapFilterApplied ? "bg-skyblue-01" : "bg-white"
          )}
          onClick={handleClickMyLocation}
          disableRipple={true}
        >
          <MyLocation fill="white" />
        </ButtonBase>

        {bottomSheetContents.length > 1 && (
          <ContentBottomSheet
            sheetRef={sheetRef}
            listRef={listRef}
            contentList={bottomSheetContents.map((content) => ({
              ...content,
              thumbnail: content.imgList[0],
            }))}
          />
        )}

        {bottomSheetContents.length === 1 && (
          <div className="bottom-[calc(8px+48px)] absolute z-10 w-[calc(100%-16px)] left-[8px]">
            <div className="p-[16px] bg-white rounded-[24px]">
              <ContentCardMedium
                content={{
                  ...bottomSheetContents[0],
                  thumbnail: bottomSheetContents[0].imgList[0],
                }}
              />
            </div>
          </div>
        )}
      </main>

      <FilterDrawer
        isOpen={!!isFilterModalOpen}
        selectedGenre={selectedGenre}
        selectedStyles={selectedStyles}
        selectedAge={selectedAge}
        setStyle={setSelectedStyles}
        setAge={setSelectedAge}
        setGenre={setSelectedGenre}
        setMapFilter={setMapFilter}
        mapFilter={mapFilter}
      />

      {/* 지역 모달 */}
      <LocationDrawer
        isOpen={!!isTownSelectionModalOpen}
        selectLocation={selectLocation}
        setSelectLocation={setSelectLocation}
        setLatLng={setLatLng}
      />

      <BottomTab />
    </>
  );
}

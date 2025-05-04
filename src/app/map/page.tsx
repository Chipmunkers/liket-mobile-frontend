"use client";

import { useReducer, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "@/icons/filter.svg";
import { ButtonBase } from "@mui/material";
import BottomTab from "@/widgets/common/BottomTab";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import Chip from "@/shared/ui/Chip";
import { classNames } from "@/shared/helpers/classNames";
import { MapContentEntity } from "@/shared/types/api/map/MapContentEntity";
import useCheckModalOpenForWebview from "./_hooks/onMessageWebview";
import ContentBottomSheet from "./_ui/ContentBottomSheet";
import { MapInfo, SelectLocation } from "./_types/types";
import FilterDrawer from "./_ui/FilterDrawer";
import LocationDrawer from "./_ui/LocationDrawer";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { useGetMapContent } from "./_hooks/useGetMapContent";
import useSupercluster from "use-supercluster";
import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { BottomSheetRef } from "react-spring-bottom-sheet";
import { FixedSizeList } from "react-window";
import CustomGoogleMap from "./_ui/CustomGoogleMap";
import useScreenHeight from "@/shared/hooks/useScreenHeight";
import useLocation from "@/shared/hooks/useGetMyLocation";
import MyLocation from "@/shared/icon/map/myLocation.svg";
import customToast from "@/shared/helpers/customToast";
import useModalStore from "@/shared/store/modalStore";
import ClientOnlyWrapper from "@/shared/ui/ClientOnlyWrapper";
import { Coordinate } from "@/shared/types/ui/map/type";

import {
  filterReducer,
  initializeMapFilterState,
} from "./_util/mapFilterReducer";
import {
  initializeSelectedLocationState,
  selectedLocationReducer,
} from "./_util/locationFilterReducer";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";

const CIRCLE_CLUSTER_LEVEL = {
  markerTypeThreshold: 14,
  circleClusteringRadius: 100,
  markerClusteringRadius: 100,
};

export default function MapPage() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [mapFilter, dispatchMapFilter] = useReducer(filterReducer, null, () =>
    initializeMapFilterState(params.toString())
  );

  const [selectedLocation, dispatchSelectedLocation] = useReducer(
    selectedLocationReducer,
    null,
    () => initializeSelectedLocationState(params.toString())
  );

  const openModal = useModalStore(({ openModal }) => openModal);

  const googleMapRef = useRef<google.maps.Map | null>(null);
  const {
    lat: userPosLat,
    lng: userPosLng,
    WEBVIEW_PERMISSION,
    WEB_PERMISSION,
    canAskAgain,
  } = useLocation();

  const handleClickMyLocation = () => {
    // INFO: 준비중인 기능
    if (window?.isWebview) {
      if (WEBVIEW_PERMISSION === "undetermined" && canAskAgain) {
        // 아직 권한 요청을 한 번도 안 했거나, 다시 물어볼 수 있는 상태
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: WEBVIEW_EVENT_TYPE.REQUEST_PERMISSION_AGAIN })
        );
      } else if (WEBVIEW_PERMISSION === "denied") {
        // 권한 요청이 거절된 상태
        if (canAskAgain) {
          // 권한 요청은 거절됐으나 다시 요청이 가능한 상태
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: WEBVIEW_EVENT_TYPE.REQUEST_PERMISSION_AGAIN,
            })
          );
        } else {
          // 권한 요청이 아얘 불가능한 상태
          openModal("PermissionModal", {
            onClickPositive() {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: WEBVIEW_EVENT_TYPE.OPEN_SETTINGS })
              );
            },
          });
        }
      }
    }

    if ([WEB_PERMISSION, WEBVIEW_PERMISSION].includes("granted")) {
      if (userPosLat && userPosLng) {
        googleMapRef.current?.setZoom(14);
        googleMapRef.current?.setCenter({ lat: userPosLat, lng: userPosLng });
      }
    } else if (WEB_PERMISSION === "denied") {
      customToast("브라우저에서 먼저 내 위치 접근 권한을 허용해주세요.");
    }
  };

  const sheetRef = useRef<BottomSheetRef>(null);
  const listRef = useRef<FixedSizeList | null>(null);
  const router = useRouter();
  const { safeArea } = useGetSafeArea();
  const { innerHeight } = useScreenHeight();

  const isTownSelectionModalOpen = params.get("isTownSelectionModalOpen");
  const isFilterModalOpen = params.get("isFilterModalOpen");

  const [selectedMarkerId, setSelectedMarkerId] = useState<
    number | undefined
  >();

  const [clickedMarkerContents, setClickedMarkerContents] = useState<
    MapContentEntity[]
  >([]);

  const zoomLevel = params.get("zoomLevel");

  // * 현재 보고 있는 위치
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    bound: {
      top: { x: 0, y: 0 },
      bottom: { x: 0, y: 0 },
    },
    zoomLevel: zoomLevel ? +zoomLevel : 14,
  });

  const isCircleMarkerShown =
    CIRCLE_CLUSTER_LEVEL.markerTypeThreshold > mapInfo.zoomLevel;

  const { data: contentApiResult } = useGetMapContent(
    mapInfo,
    mapFilter.applied
  );

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
      radius: isCircleMarkerShown
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

  const handleClickMap = () => {
    listRef.current?.scrollTo(0);
    setClickedMarkerContents([]);
    setSelectedMarkerId(undefined);
    sheetRef.current?.snapTo(() => 20);
  };

  const handleChangeLocation = (
    newRegion: SelectLocation,
    newLatLng: Coordinate
  ) => {
    dispatchSelectedLocation({ type: "APPLY_DRAFT" });
    googleMapRef.current?.setCenter(newLatLng);

    if (newRegion.sigungu) {
      googleMapRef.current?.setZoom(14);
    } else {
      googleMapRef.current?.setZoom(10);
    }

    params.delete("isTownSelectionModalOpen");
    router.replace(`?${params.toString()}`);
  };

  const isOnlyOneSingleIconMarkerVisibleInMap =
    contentApiResult?.contentList.length === 1;

  const isSingleIconMarkerSelected =
    selectedMarkerId && bottomSheetContents.length === 1;

  const onChangeMapInfo = (
    bound: MapInfo["bound"],
    center: Coordinate,
    zoomLevel: number
  ) => {
    setMapInfo({
      bound,
      zoomLevel,
    });

    /**
     * HACKY
     *
     * [REPRODUCTION]
     * 다음 절차를 따르면 버그를 해결하기 위해 넣는다.
     * 1. 모달을 보여준 상태에서 새로고침을 누른다.
     * 2. 모달을 닫는다.
     * 3. 지도를 움직인다. = onChangeMapInfo 함수를 호출한다
     * 4. 아까 닫았던 모달이 다시 나타난다. 그리고 스타일 필터링이 풀려버린다.
     *
     * [CAUSE]
     * 모달을 닫을 때 params.delete("isFilterModalOpen")을 호출한다.
     * (추측) nextjs는 shallow routing을 진행한다.
     * useSearchParams의 반환값에는 여전히 isFilterModalOpen=true가 존재한다.
     *
     * [SOLUTION]
     * useSearchParams가 변하지 않으므로 native API인 window.location.search에 접근하도록한다.
     */
    const params = new URLSearchParams(window.location.search);
    params.delete("isTownSelectionModalOpen");
    params.delete("isFilterModalOpen");
    params.delete("sido_cd");
    params.delete("sigungu_cd");
    params.set("lat", center.lat.toString());
    params.set("lng", center.lng.toString());
    params.set("zoomLevel", zoomLevel.toString());
    router.replace(`?${params.toString()}`);
  };

  const isMapFilterApplied = !!(
    mapFilter.applied.genre ||
    mapFilter.applied.age ||
    mapFilter.applied.styles.length
  );

  const initialLatLng = {
    lat:
      Number(params.get("lat")) ||
      Number(
        selectedLocation.applied.sigungu?.lat ??
          selectedLocation.applied.sido.lat
      ),
    lng:
      Number(params.get("lng")) ||
      Number(
        selectedLocation.applied.sigungu?.lng ??
          selectedLocation.applied.sido.lng
      ),
  };

  return (
    <>
      <Header>
        <HeaderLeft
          townName={
            selectedLocation.applied.sigungu
              ? selectedLocation.applied.sido.name +
                " " +
                selectedLocation.applied.sigungu.name
              : selectedLocation.applied.sido.name
          }
          onClickTownSelection={() => {
            params.set("isTownSelectionModalOpen", "true");
            router.replace(`?${params.toString()}`);
          }}
        />
        <HeaderRight option={{ search: true, like: true }} />
      </Header>
      <main
        className="relative"
        style={{
          height: `${innerHeight - safeArea.bottom - 96}px`,
          marginBottom: safeArea.bottom + 48,
        }}
      >
        <CustomGoogleMap
          isOnlyOneSingleIconMarkerVisibleInMap={
            isOnlyOneSingleIconMarkerVisibleInMap
          }
          googleMapRef={googleMapRef}
          selectedMarkerId={selectedMarkerId}
          markerClusteredContents={clusters}
          userPosition={{
            lat: userPosLat,
            lng: userPosLng,
          }}
          latLng={initialLatLng}
          mapInfo={mapInfo}
          setMapInfo={setMapInfo}
          onChangeMapInfo={onChangeMapInfo}
          onClickMarkerCluster={handleClickMarkerCluster}
          onDragStart={handleClickMap}
          onClickMap={handleClickMap}
          onChangeMap={handleClickMap}
        />
        <div className="absolute z-[2] mt-[16px] ml-[24px] w-100 flex items-center">
          {/* 필터링 아이콘 */}
          <ButtonBase
            className={classNames(
              "rounded-full w-[36px] h-[36px] shadow-[0_0_8px_0_rgba(0,0,0,0.16)] icon-button",
              isMapFilterApplied ? "bg-skyblue-01" : "bg-white"
            )}
            onClick={() => {
              params.set("isFilterModalOpen", "true");
              router.replace(`?${params.toString()}`);
            }}
            disableRipple
          >
            <Filter
              className={!isMapFilterApplied ? "fill-grey-black" : "fill-white"}
              fill="white"
            />
          </ButtonBase>

          {/* 필터링 칩 */}
          {!!(
            mapFilter.applied.genre ||
            mapFilter.applied.age ||
            mapFilter.applied.styles.length
          ) && (
            <div className="flex items-center">
              {!!mapFilter.applied.genre && (
                <div className="ml-[8px]">
                  <Chip
                    isSelected
                    onClick={() => {
                      if (mapFilter.applied.genre) {
                        dispatchMapFilter({
                          type: "UPDATE_APPLIED_GENRE",
                          payload: {
                            genre: mapFilter.applied.genre,
                            isSelected: true,
                          },
                        });
                        params.delete("genre");
                        router.replace(`?${params.toString()}`);
                      }
                    }}
                  >
                    {mapFilter.applied.genre.name}
                  </Chip>
                </div>
              )}
              {!!mapFilter.applied.age && (
                <div className="ml-[8px]">
                  <Chip
                    isSelected
                    onClick={() => {
                      if (mapFilter.applied.age) {
                        dispatchMapFilter({
                          type: "UPDATE_APPLIED_AGE",
                          payload: {
                            age: mapFilter.applied.age,
                            isSelected: true,
                          },
                        });
                        params.delete("age");
                        router.replace(`?${params.toString()}`);
                      }
                    }}
                  >
                    {mapFilter.applied.age.name}
                  </Chip>
                </div>
              )}
              {mapFilter.applied.styles.map((style) => (
                <div className="ml-[8px]" key={style.name}>
                  <Chip
                    isSelected
                    onClick={() => {
                      dispatchMapFilter({
                        type: "UPDATE_APPLIED_STYLES",
                        payload: {
                          style,
                          isSelected: true,
                        },
                      });
                      const appliedStylesString = params.get("styles");
                      let appliedStyles: string[] = [];

                      if (appliedStylesString) {
                        appliedStyles = appliedStylesString.includes(",")
                          ? appliedStylesString.split(",")
                          : [appliedStylesString];
                      }

                      const newAppliedStyles = appliedStyles.filter(
                        (idx) => +idx !== style.idx
                      );

                      console.log("기존", appliedStylesString);
                      console.log("새로운", newAppliedStyles);

                      if (newAppliedStyles?.length) {
                        params.set("styles", newAppliedStyles.join(","));
                        router.replace(`?${params.toString()}`);
                      } else {
                        params.delete("styles");
                        router.replace(`?${params.toString()}`);
                      }
                    }}
                  >
                    {style.name}
                  </Chip>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 내위치 보기 버튼 */}
        <ClientOnlyWrapper>
          <ButtonBase
            className={classNames(
              "absolute mr-[16px] left-[24px] size-[36px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] icon-button rounded-full bottom-[34px]"
            )}
            onClick={handleClickMyLocation}
            disableRipple={true}
          >
            <MyLocation fill="white" />
          </ButtonBase>
        </ClientOnlyWrapper>

        {/*
         * INFO 바텀시트의 동작 정의
         * 1. ClusteredIconMarker가 최초로 보여질 때 높이 20까지 바텀시트가 등장한다.
         * 2. SingleIconMarker가 선택되면 바텀시트는 보이지 않는다.
         * 3. ClusteredIconMarker가 선택되지 않으면 20까지 바텀시트가 등장한다.
         * 4. ClusteredIconMarker가 선택되면 화면 절반까지 바텀시트가 등장한다.
         */}
        {!isCircleMarkerShown && bottomSheetContents.length > 1 && (
          <ContentBottomSheet
            isClusteredIconMarkerClicked={clickedMarkerContents.length > 1}
            sheetRef={sheetRef}
            listRef={listRef}
            contentList={bottomSheetContents.map((content) => ({
              ...content,
              thumbnail: content.imgList[0],
            }))}
          />
        )}

        {!isCircleMarkerShown &&
          (isOnlyOneSingleIconMarkerVisibleInMap ||
            isSingleIconMarkerSelected) && (
            <div className="absolute z-10 w-[calc(100%-16px)] left-[8px] bottom-[8px]">
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
        mapFilter={mapFilter}
        dispatchMapFilter={dispatchMapFilter}
      />

      <LocationDrawer
        isOpen={!!isTownSelectionModalOpen}
        selectedLocation={selectedLocation}
        dispatchSelectedLocation={dispatchSelectedLocation}
        onChangeRegion={handleChangeLocation}
      />

      <BottomTab />
    </>
  );
}

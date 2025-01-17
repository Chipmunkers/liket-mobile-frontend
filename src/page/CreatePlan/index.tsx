"use client";

import { PlanGoogleMap } from "@/page/CreatePlan/_ui/GoogleMap";
import { PlaceSearch } from "@/page/CreatePlan/_ui/PlaceSearch";
import { useButtonClickEvent } from "@/page/CreatePlan/hooks/useButtonClickEvent";
import { useGetLoginCheck } from "@/page/CreatePlan/hooks/useGetLoginCheck";
import { Place, Route, RouteSegment } from "@/page/CreatePlan/type";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { useState } from "react";
import { useRouteSegment } from "@/page/CreatePlan/hooks/useRouteSegment";
import { StopoverInput } from "@/page/CreatePlan/_ui/StopoverInput";

export const CreatePlanPage = () => {
  useGetLoginCheck();

  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeList, setPlaceList] = useState<(Place | null)[]>([null]);
  const [routeList, setRouteList] = useState<(Route | null)[]>([]);
  const [routeSegmentList, setRouteSegmentList] = useState<
    (RouteSegment | null)[]
  >([]);

  useRouteSegment({
    placeList,
    routeSegmentList,
    setRouteSegmentList,
  });

  const { clickHeaderBackBtnEvent, clickAddStopoverBtnEvent } =
    useButtonClickEvent({
      placeList,
      setPlaceList,
      setSelectedIndex,
    });

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: { onClick: clickHeaderBackBtnEvent } }} />
        <HeaderMiddle text="루트 짜기" />
      </Header>
      <main>
        <div className="map-area w-full h-[300px] bg-grey-03">
          <PlanGoogleMap
            googleMap={googleMap}
            setGoogleMap={setGoogleMap}
            routeSegmentList={routeSegmentList}
            setRouteList={setRouteList}
            routeList={routeList}
            placeList={placeList}
          />
        </div>
        <div className="mb-[34px]">
          {placeList.map((elem, i) => (
            <StopoverInput
              key={`stopover-input-${i}`}
              i={i}
              routeList={routeList}
              setRouteList={setRouteList}
              placeList={placeList}
              setPlaceList={setPlaceList}
              setSelectedIndex={setSelectedIndex}
              routeSegmentList={routeSegmentList}
            />
          ))}

          <div className="px-[24px] h-[40px]">
            <Button
              className="w-full h-full"
              variant="ghost"
              onClick={clickAddStopoverBtnEvent}
            >
              <span className="text-body3">경유지 추가</span>
            </Button>
          </div>
        </div>
      </main>
      <PlaceSearch
        placeList={placeList}
        setPlaceList={setPlaceList}
        i={selectedIndex}
      />
    </>
  );
};

// TODO: 대중교통의 경우 대중교통 관련한 정보 표시
// TODO: 도보도 선택할 수 있도록 개선

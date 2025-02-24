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

  /**
   * 사용자가 선택한 장소 목록입니다.
   * 출발지는 반드시 존재해야하기 때문에, null이 기본적으로 담겨있습니다.
   * null일 경우, 장소 선택 input은 존재하지만 아직 사용자가 장소를 선택하지 않은 경우입니다.
   */
  const [placeList, setPlaceList] = useState<(Place | null)[]>([null]);

  /**
   * routeSegment의 값이 null이 아닌 값으로 변경되었을 때,
   * routeSegment의 값을 통해 API를 호출하여, 그 값을 같은 순번의 routeList에 담음
   * 따라서 실제 보여줄 경로 목록을 가지는 상태 값임
   *
   * ! 주의: GoogleMap 컴포넌트에서 polyline을 위해 routeList를 사용하고 있음. 따라서 상태로 관리
   */
  const [routeList, setRouteList] = useState<(Route | null)[]>([]);

  /**
   * 장소간 이동 경로에 대한 메타 데이터를 보유하는 state입니다.
   * 출발지와 도착지, 도보 경로인지 대중 교통 경로 인지에 대한 데이터입니다.
   */
  const [routeSegmentList, setRouteSegmentList] = useState<
    (RouteSegment | null)[]
  >([]);

  /**
   * place 목록을 통해 routeSegment 데이터를 가공하는 훅
   */
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
              setRouteSegmentList={setRouteSegmentList}
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
// TODO: 에러 났을 땐 에러 문구 표시하도록 개선

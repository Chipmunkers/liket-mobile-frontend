import { Place, Route, RouteSegment } from "@/page/CreatePlan/type";
import { SetState } from "@/shared/types/react";

export type Props = {
  /**
   * 해당 경유지 입력칸의 순서
   */
  i: number;

  /**
   * 장소 목록
   */
  placeList: (Place | null)[];

  /**
   * 장소 목록 set 함수
   */
  setPlaceList: SetState<(Place | null)[]>;

  /**
   * selected index set함수
   */
  setSelectedIndex: SetState<number>;

  /**
   * route segment list
   */
  routeSegmentList: (RouteSegment | null)[];

  /**
   * route list
   */
  routeList: (Route | null)[];

  setRouteList: SetState<(Route | null)[]>;
};

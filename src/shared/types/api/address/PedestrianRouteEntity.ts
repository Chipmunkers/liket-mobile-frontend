export interface PedestrianCoordinate {
  x: number;
  y: number;
}

export interface PedestrianRouteEntity {
  type: "FeatureCollection";
  features: {
    type: "Point" | "LineString";
    coordinates: PedestrianCoordinate[];
    /**
     * TODO: 배포용으로 사용하지 마십시오. 타입이 정의되어 있지 않아 위험합니다.
     *
     * @deprecated
     */
    properties: any;
  }[];
}

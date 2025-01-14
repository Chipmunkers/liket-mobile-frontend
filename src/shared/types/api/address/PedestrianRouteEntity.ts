export interface PedestrianCoordinate {
  x: number;
  y: number;
}

export interface PedestrianRouteEntity {
  type: "FeatureCollection";
  features: {
    type: "Point" | "LineString";
    coordinates: PedestrianCoordinate[];
  }[];
}

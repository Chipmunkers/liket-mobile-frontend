import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { PedestrianCoordinate } from "@/shared/types/api/address/PedestrianRouteEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export type Place = SummaryContentEntity | KeywordSearchDocumentEntity;

export type RouteSegment = {
  start: Place;
  end: Place;
  type: "walking" | "transit";
  createdAt: Date;
};
export type RouteError = {
  reason: string;
};

export type Route<T = "transit" | "walking", Error = RouteError | null> = {
  type: T;
  coordinateList: PedestrianCoordinate[];
  info: Error extends null
    ? T extends "transit"
      ? google.maps.DirectionsResult
      : null
    : null;
  totalTime: number;
  error: Error;
};

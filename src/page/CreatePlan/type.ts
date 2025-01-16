import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { PedestrianCoordinate } from "@/shared/types/api/address/PedestrianRouteEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export type Place = SummaryContentEntity | KeywordSearchDocumentEntity;

export type RouteSegment = {
  start: Place;
  end: Place;
  type: "walking" | "transit";
};

export type Route = {
  type: "walking" | "transit";
  coordinateList: PedestrianCoordinate[];
  totalTime: number;
  error: null | {
    reason: string;
  };
};

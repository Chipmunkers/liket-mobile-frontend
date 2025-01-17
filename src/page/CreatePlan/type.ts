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

type RouteDefault<Error = RouteError | null> = {
  coordinateList: PedestrianCoordinate[];
  totalTime: number;
  error: Error;
};

type TransitRoute<Error = RouteError | null> = RouteDefault<Error> & {
  type: "transit";
  info: Error extends null ? google.maps.DirectionsResult : null;
};

type PedestrianRoute<Error = RouteError | null> = RouteDefault<Error> & {
  type: "walking";
  info: Error extends null ? any : null;
};

export type Route<Error = RouteError | null> =
  | TransitRoute<Error>
  | PedestrianRoute<Error>;
